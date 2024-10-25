import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddRecipeModal from './AddRecipeModal';  
import AddIngredientModal from './AddIngredientModal';  
import AddSubIngredientModal from './AddSubIngredientModal';  

const Dashboard = () => {
 
    const [showRecipeModal, setShowRecipeModal] = useState(false);
    const [showIngredientModal, setShowIngredientModal] = useState(false);
    const [showSubIngredientModal, setShowSubIngredientModal] = useState(false);


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

    return (
        <div className='container'>
            <div className='row'>
                <section className='mt-5'>
                    <button className='btn border-warning' onClick={() => setShowRecipeModal(true)}>Add Recipe</button>
                    <button className='btn border-warning ms-2' onClick={() => setShowIngredientModal(true)}>Add Ingredients</button>
                    <button className='btn border-warning ms-2' onClick={() => setShowSubIngredientModal(true)}>Add Sub-Ingredients</button>
                </section>

                <AddRecipeModal
                    show={showRecipeModal}
                    onClose={() => setShowRecipeModal(false)}
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
                    onSave={handleSaveSubIngredient}
                />
            </div>
        </div>
    );
};

export default Dashboard;
