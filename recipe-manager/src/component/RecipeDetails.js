import React, { useState, useEffect } from 'react';
import { useParams,useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecipeDetails = () => {
    const { recipeId } = useParams();  // Get the recipe ID from the URL
    const { state } = useLocation();   // Get the state/location  from the Link
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    //const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate(); //  redirect after deletion
    // const [updatedRecipe, setUpdatedRecipe] = useState({
    //     recipeName: '',
    //     steps: '',
    //     ingredients: [],
    //     subIngredients: []
    // });
    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/recipes/${recipeId}`);
                console.log("Recipe details:", response.data);
                setRecipe(response.data);
                //setUpdatedRecipe(response.data); 
            } catch (error) {
                console.error('Failed to fetch recipe details', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipeDetails();
    }, [recipeId]);

// Handle edit button
const handleEdit = () => {
    //setIsEditing(true); // Enable editing mode
};


 // Handle delete button
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/recipes/${recipeId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('Recipe deleted:', recipeId);
            alert("Recipe deleted successfully")
            navigate('/dashboard');//redirect to dashboard
        } catch (error) {
            console.error('Failed to delete recipe:', error);
        }
        console.log('Deleting recipe:', recipeId);
    };
    if (loading) return <p>Loading recipe details...</p>;

    return recipe ? (
        <div className='container-fluid'>
            
            <h2>{recipe.recipeName}</h2>
            <p><strong>Created By:</strong> {recipe.createdBy}</p>
            <p>
                <strong>Ingredients:</strong> 
                {recipe.ingredients.length > 0 
                    ? recipe.ingredients.map(ingredient => ingredient.name).join(', ')
                    : 'No ingredients listed'}
            </p>
            <p>
                <strong>Sub-Ingredients:</strong> 
                {recipe.subIngredients.length > 0 
                    ? recipe.subIngredients.map(subIngredient => subIngredient.name).join(', ')
                    : 'No sub-ingredients listed'}
            </p>
            <p><strong>Steps:</strong> {recipe.steps}</p>
            <p><strong>Created At:</strong> {new Date(recipe.createdAt).toLocaleString()}</p>

            {/* Conditionally render Edit and Delete buttons if navigated from Dashboard */}
            {state?.from === 'dashboard' && (
                <div className='mt-3'>
                    <button className='btn border-success me-2' onClick={handleEdit}>Edit Recipe</button>
                    <button className='btn border-danger' onClick={handleDelete}>Delete Recipe</button>
                </div>
            )}
            
        </div>
    ) : (
        <p>Recipe not found.</p>
    );
};

export default RecipeDetails