import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddRecipeModal from './AddRecipeModal';  
import AddIngredientModal from './AddIngredientModal';  
import AddSubIngredientModal from './AddSubIngredientModal';  
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [firstName, setFirstName] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [subIngredients, setSubIngredients] = useState([]);
    const [showRecipeModal, setShowRecipeModal] = useState(false);
    const [showIngredientModal, setShowIngredientModal] = useState(false);
    const [showSubIngredientModal, setShowSubIngredientModal] = useState(false);

    const [recipes, setRecipes] = useState([]); // State to hold fetched recipes
    const [showRecipes, setShowRecipes] = useState(false); // State to toggle display

    //to display firstname
    useEffect(() => {
        const storedFirstName = localStorage.getItem('firstName');
        if (storedFirstName) {
            setFirstName(storedFirstName);
        }
    }, []);
    // get ingredients and sub ingredients on component mount
    useEffect(() => {
        fetchIngredients();
        fetchSubIngredients();
    }, []);

const fetchIngredients = async () => {
    try {
        const res = await axios.get('http://localhost:5000/ingredients');
        setIngredients(res.data);
    } catch (error) {
        console.error('Error fetching ingredients:', error);
    }
};

const fetchSubIngredients = async () => {
    try {
        const res = await axios.get('http://localhost:5000/sub-ingredients');
        setSubIngredients(res.data);
        console.log(res.data)
    } catch (error) {
        console.error('Error fetching sub-ingredients:', error);
    }
};

    const handleSaveRecipe = (recipeData) => {
        console.log('Recipe saved:', recipeData);
        setShowRecipeModal(false);
    };

    const handleSaveIngredient = (ingredientData) => {
        console.log('Ingredient saved:', ingredientData);
        setShowIngredientModal(false);
    };

    const handleSaveSubIngredient = (subIngredientData) => {
        console.log('Sub-Ingredient saved:', subIngredientData);
        setShowSubIngredientModal(false);
    };

// Function to fetch and display recipes
  const handleDisplayRecipes = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token

      const response = await axios.get('http://localhost:5000/recipes', {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("display createdby=>",response.data.recipes)
    
      // Filter recipes to show only those created by the logged-in user
    const userRecipes = response.data.recipes.filter(
        (recipe) => recipe.createdBy === firstName
      );
        setRecipes(userRecipes); // Set recipes in state
        console.log("recp by user=>",userRecipes)
        setShowRecipes(true); // Set flag to display recipes
    
      
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

    return (
        <div className='container'>
            <div className='row'>
                <section className='mt-5'>
                    <p>Welcome <em className='nameStyle'> {firstName}</em> to Recipe Manager, you can create recipes , add your own ingredients and sub-ingredients here.</p>
                    <button className='btn border-warning mb-2' onClick={() => setShowRecipeModal(true)}>Add Recipe</button>
                    <button className='btn border-warning ms-2 mb-2' onClick={() => setShowIngredientModal(true)}>Add Ingredients</button>
                    <button className='btn border-warning ms-2 mb-2' onClick={() => setShowSubIngredientModal(true)}>Add Sub-Ingredients</button>
                    <button className='btn border-warning ms-2 mb-2' onClick={handleDisplayRecipes}>Display my Recipe's</button>
                </section>
                {showRecipes && (
        <div className="recipes-list mt-4">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div key={recipe._id} className="recipe-card">
                <Link to={`/recipes/${recipe._id}`} state={{ from: 'dashboard' }}>{recipe.recipeName}</Link>
                <p><strong>Created By:</strong> {recipe.createdBy}</p>
              </div>
            ))
          ) : (
            <p>No recipes found.</p>
          )}
        </div>
      )}
                <AddRecipeModal
                    show={showRecipeModal}
                    onClose={() => setShowRecipeModal(false)}
                    ingredients={ingredients}
                    subIngredients={subIngredients}
                    fetchIngredients={fetchIngredients}
                    fetchSubIngredients={fetchSubIngredients}
                    onSave={handleSaveRecipe}
                />

                <AddIngredientModal
                    show={showIngredientModal}
                    onClose={() => setShowIngredientModal(false)}
                    onSave={handleSaveIngredient}
                />

                <AddSubIngredientModal
                    show={showSubIngredientModal}
                    onClose={() => setShowSubIngredientModal(false)}
                    ingredients={ingredients}
                    fetchIngredients={fetchIngredients}
                    onSave={handleSaveSubIngredient}
                />
            </div>
        </div>
    );
};

export default Dashboard;
