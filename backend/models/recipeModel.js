const mongoose = require('mongoose');

const recipeModel = new mongoose.Schema({
    recipeName: { type: String, required: true },
    ingredientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' },
    subIngredientId: { type: mongoose.Schema.Types.ObjectId, ref: 'SubIngredient' },
    steps: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String, required: true }, // Ensure this is marked as required
});

const Recipe = mongoose.model('Recipe', recipeModel);
module.exports = Recipe;
