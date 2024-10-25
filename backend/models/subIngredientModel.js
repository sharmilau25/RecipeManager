const mongoose = require('mongoose');

const subIngredientModel = new mongoose.Schema({
    name: { type: String, required: true },
    ingredientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }, // Reference to the parent ingredient
});

const SubIngredient = mongoose.model('SubIngredient', subIngredientModel);

module.exports = SubIngredient;
