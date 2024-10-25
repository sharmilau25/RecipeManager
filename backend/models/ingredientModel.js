const mongoose = require('mongoose');

const ingredientModel = new mongoose.Schema({
    name: { type: String, required: true },
});

const Ingredient = mongoose.model('Ingredient', ingredientModel);

module.exports = Ingredient;
