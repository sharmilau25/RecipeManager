const express = require('express');
const connectDB = require('./config/dbconn')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
const User = require('./models/userModels'); // User model
const Ingredient = require('./models/ingredientModel');//ingredientModel
const SubIngredient = require('./models/subIngredientModel');//sub-ingredientModel
const RecipeModel=require('./models/recipeModel')//add recipeModel
const verifyToken  = require('./middleware/auth')
dotenv.config();
console.log(RecipeModel)
const app = express();
//db connection
connectDB();
//to check if data is added in db
mongoose.set('debug', true);

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// User Registration Route
app.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password,confirmPassword } = req.body;
  console.log(req.body);
    // Basic Validation
    if (!firstName || !lastName || !email || !password ||!confirmPassword) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }
  
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists.' });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new user
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword, // Store hashed password
      });
  
      // Save the user to MongoDB
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  });
  
//Login Route 

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ message: 'Invalid email or password.' });
      }

      // Check if password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid email or password.' });
      }

      // Generate a JWT token for the session
      const token = jwt.sign(
        { id: user._id, email: user.email, firstName: user.firstName }, // Include firstName
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

      // Send token as a response
      res.json({ token,firstName: user.firstName, message: 'Login successful!' });

  } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Fetch recipes from logged-in user
app.get('/recipes', verifyToken, async (req, res) => {
  try {
      const userId = req.firstName; // Ensure req.userId is set in your verifyToken middleware
      console.log("userid=>",req);
      const recipes = await RecipeModel.find({ userId: userId }); // Make sure to use the correct field
      res.status(200).json({ recipes });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch recipes' });
  }
});

// Fetch all recipes
app.get('/allrecipes', async (req, res) => {
  try {
      const recipes = await RecipeModel.find(); // Fetch all recipes
      res.status(200).json({ recipes });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch recipes' });
  }
});

// Fetch a single recipe by ID
app.get('/recipes/:id', async (req, res) => {
  try {
      const recipe = await RecipeModel.findById(req.params.id)
          .populate('ingredients', 'name')  // Populate ingredient names
          .populate('subIngredients', 'name');  // Populate sub-ingredient names

      if (!recipe) {
          return res.status(404).json({ message: 'Recipe not found' });
      }

      res.json(recipe);
  } catch (error) {
      console.error('Error fetching recipe:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

// Fetch all ingredients
app.get('/ingredients', async (req, res) => {
  try {
      const ingredients = await Ingredient.find();
      res.json(ingredients);
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
});

// Fetch all sub-ingredients
app.get('/sub-ingredients', async (req, res) => {
  try {
      const subIngredients = await SubIngredient.find().populate('ingredientId');
      res.json(subIngredients);
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
});


// POST request to add new ingredient
app.post('/ingredients', async (req, res) => {
  console.log('Received request to /ingredients');
  const { name } = req.body;
  try {
      const newIngredient = new Ingredient({ name });
      await newIngredient.save();
      res.status(201).json(newIngredient); // Respond with the saved ingredient
      console.log(res)
  } catch (error) {
      res.status(500).json({ message: 'Error saving ingredient.' });
  }
});

// POST request to add new sub-ingredient
app.post('/sub-ingredients', async (req, res) => {
  const { name, ingredientId } = req.body;
  try {
      const newSubIngredient = new SubIngredient({ name, ingredientId });
      await newSubIngredient.save();
      res.status(201).json(newSubIngredient); // Respond with the saved sub-ingredient
  } catch (error) {
      res.status(500).json({ message: 'Error saving sub-ingredient.' });
  }
});

//post request to add recipes 
app.post('/recipes', async (req, res) => {
  const { recipeName, ingredients, subIngredients, steps, createdAt } = req.body;

  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const firstName = decoded.firstName;
console.log("firstname=>",firstName)
console.log("decoded=>",decoded)

// Convert ingredient IDs to ObjectIds before saving
// const ingredientIds = ingredients; 
// const subIngredientIds = subIngredients; 
    const recipe = new RecipeModel({
      recipeName,
      ingredients,
      subIngredients,
      steps,
      createdAt:createdAt,
      createdBy: firstName,
    });
    console.log("recipe=>",recipe)
    const savedRecipe = await recipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error('Error saving recipe:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete recipe by ID
app.delete('/recipes/:recipeId', verifyToken, async (req, res) => {
  const { recipeId } = req.params;
  console.log("recipeid in backend=>",recipeId);

 // Verify that recipeId is a valid MongoDB ObjectId
 if (!mongoose.Types.ObjectId.isValid(recipeId)) {
  return res.status(400).json({ message: 'Invalid recipe ID' });
}
  try {
    //check for the recipe to be deleted
    const recipeToDelete = await RecipeModel.findById(recipeId);
      console.log("Recipe found=>", recipeToDelete);

      // Find the recipe by ID and delete it
      const deletedRecipe = await RecipeModel.findByIdAndDelete(recipeId);

      // Check if recipe was found and deleted
      if (!deletedRecipe) {
          return res.status(404).json({ message: 'Recipe not found' });
      }

      res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
      console.error('Error deleting recipe:', error);
      res.status(500).json({ message: 'Server error. Unable to delete recipe.' });
  }
});

  // Start the server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });