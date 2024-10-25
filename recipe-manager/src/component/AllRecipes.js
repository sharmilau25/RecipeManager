import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllRecipes = () => {
    const [loading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState('');

    // Fetch all recipes
    useEffect(() => {
        const fetchAllRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/allrecipes'); 
                setRecipes(response.data.recipes);
            } catch (error) {
                console.error('Error fetching recipes:', error);
                setError('Failed to fetch recipes.');
            } finally {
                setLoading(false);
            }
        };

        fetchAllRecipes();
    }, []);

    return (
        <div className="container">
            <h2>All Recipes</h2>
            {loading ? (
                <p>Loading recipes...</p>
            ) : error ? (
                <p>{error}</p>
            ) : recipes.length === 0 ? (
                <p>No recipes available!</p>
            ) : (
                <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <Link to={`/recipes/${recipe._id}`}>
              {recipe.recipeName} by {recipe.createdBy}
            </Link>
          </li>
        ))}
      </ul>
            )}
        </div>
    );
};

export default AllRecipes;

