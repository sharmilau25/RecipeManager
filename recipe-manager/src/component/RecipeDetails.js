import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RecipeDetails = () => {
  const { recipeId } = useParams();  // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/recipes/${recipeId}`);
        console.log("Recipe details:", response.data);
        setRecipe(response.data);
      } catch (error) {
        console.error('Failed to fetch recipe details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  if (loading) return <p>Loading recipe details...</p>;

  return recipe ? (
    <div>
      <h2>{recipe.recipeName}</h2>
      <p><strong>Created By:</strong> {recipe.createdBy}</p>
      <p><strong>Ingredients:</strong> {Array.isArray(recipe.ingredientId) ? recipe.ingredientId.join(', ') : 'No ingredients listed'}</p>
      <p><strong>Steps:</strong> {recipe.steps}</p>
      <p><strong>Created At:</strong> {new Date(recipe.createdAt).toLocaleString()}</p>
    </div>
  ) : (
    <p>Recipe not found.</p>
  );
};

export default RecipeDetails;
