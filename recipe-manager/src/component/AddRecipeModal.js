import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddRecipeModal = ({ show, onClose, onSave }) => {
    const [recipeName, setRecipeName] = useState('');
    const [steps, setSteps] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [subIngredients, setSubIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [selectedSubIngredients, setSelectedSubIngredients] = useState([]);
    const [selectedIngredient, setSelectedIngredient] = useState('');
    const [selectedSubIngredient, setSelectedSubIngredient] = useState('');

    const userFirstName = localStorage.getItem('firstName');
    useEffect(() => {
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
            } catch (error) {
                console.error('Error fetching sub-ingredients:', error);
            }
        };

        fetchIngredients();
        fetchSubIngredients();
    }, []);

    const handleIngredientAdd = () => {
        if (selectedIngredient && !selectedIngredients.includes(selectedIngredient)) {
            setSelectedIngredients([...selectedIngredients, selectedIngredient]);
            setSelectedIngredient(''); // Clear the dropdown
        }
    };

    const handleSubIngredientAdd = () => {
        if (selectedSubIngredient && !selectedSubIngredients.includes(selectedSubIngredient)) {
            setSelectedSubIngredients([...selectedSubIngredients, selectedSubIngredient]);
            setSelectedSubIngredient(''); // Clear the dropdown
        }
    };

    const handleIngredientRemove = (ingredient) => {
        setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));
    };

    const handleSubIngredientRemove = (subIngredient) => {
        setSelectedSubIngredients(selectedSubIngredients.filter(item => item !== subIngredient));
    };

    const handleSave = async () => {
        const recipeData = {
            recipeName,
            ingredients: selectedIngredients,
            subIngredients: selectedSubIngredients,
            steps,
            createdAt: new Date().toISOString(),
            createdBy: userFirstName, // Include the user's first name
        };

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/recipes', recipeData,{
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              console.log("recipeData=>",recipeData)
            console.log('Recipe saved successfully:', response.data);
            onSave(response.data);  // Trigger the onSave callback with the new recipe data
            onClose(); // Close the modal after saving
        } catch (error) {
            console.error('Error saving recipe:', error);
            // Optionally, show an error message to the user here
        }
    };

    if (!show) return null; // Do not render if modal is not shown

    return (
        <div className="modal">
            <div className='modal-dialog modal-dialog-centered'>
                <div className="modal-content">
                    <h2>Add New Recipe</h2>
                    <div className='modalform'>
                        <div className="input-field mt-2 row g-3 align-items-center">
                            <div className="col-auto">
                                <label>Recipe Name</label>
                            </div>
                            <div className="col-auto">
                                <input
                                    type="text"
                                    value={recipeName}
                                    onChange={(e) => setRecipeName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                       
                        <div className="input-field mt-2 row g-3 align-items-center">
                            <div className="col-auto">
                                <label>Ingredients</label>
                            </div>
                            <div className="col-auto">
                                <select value={selectedIngredient} onChange={(e) => setSelectedIngredient(e.target.value)}>
                                    <option value="">Select Ingredient</option>
                                    {ingredients.map(ingredient => (
                                        <option key={ingredient._id} value={ingredient._id}>
                                            {ingredient.name}
                                        </option>
                                    ))}
                                </select>
                                <button className='btn border-warning ms-2' onClick={handleIngredientAdd}>Add</button>
                            </div>
                        </div>
                        
                        {/* Display selected ingredients */}
                        <div className="selected-items mt-2">
                            {selectedIngredients.map(ingredientId => {
                                // Find the ingredient object from the ingredients array using the ID
                                const ingredient = ingredients.find(ing => ing._id === ingredientId);
                                return ingredient ? ( // Check if ingredient exists
                                    <div className='mt-2' key={ingredientId}>
                                        <span>{ingredient.name}</span> {/* Display the ingredient name */}
                                        <button className='btn border-warning ms-2' onClick={() => handleIngredientRemove(ingredientId)}>Remove</button>
                                    </div>
                                ) : null; // Return null if the ingredient isn't found
                            })}
                        </div>


                        <div className="input-field mt-2 row g-3 align-items-center">
                            <div className="col-auto">
                                <label>Sub-Ingredients</label>
                            </div>
                            <div className="col-auto">
                                <select value={selectedSubIngredient} onChange={(e) => setSelectedSubIngredient(e.target.value)}>
                                    <option value="">Select Sub-Ingredient</option>
                                    {subIngredients.map(subIngredient => (
                                        <option key={subIngredient._id} value={subIngredient._id}>
                                            {subIngredient.name}
                                        </option>
                                    ))}
                                </select>
                                <button className='btn border-warning ms-2' onClick={handleSubIngredientAdd}>Add</button>
                            </div>
                        </div>
                        
                        {/* Display selected sub-ingredients */}
                        <div className="selected-items mt-2">
                            {selectedSubIngredients.map(subIngredientId => {
                                // Find the ingredient object from the ingredients array using the ID
                                const subingredient = subIngredients.find(ing => ing._id === subIngredientId);
                                return subingredient ? ( // Check if ingredient exists
                                    <div className='mt-2' key={subIngredientId}>
                                        <span>{subingredient.name}</span> {/* Display the ingredient name */}
                                        <button className='btn border-warning ms-2' onClick={() => handleSubIngredientRemove(subIngredientId)}>Remove</button>
                                    </div>
                                ) : null; // Return null if the ingredient isn't found
                            })}
                        </div>

                        <div className="input-field mt-2 row g-3 align-items-center">
                            <div className="col-auto">
                                <label>Steps</label>
                            </div>
                            <div className="col-auto">
                                <textarea
                                    value={steps}
                                    onChange={(e) => setSteps(e.target.value)}
                                    placeholder="Enter the steps for the recipe"
                                />
                            </div>
                        </div>
                        
                        <div className="modal-actions">
                            <button className='btn btn-danger ms-2' onClick={onClose}>Cancel</button>
                            <button className='btn btn-success ms-2' onClick={handleSave}>Save Recipe</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddRecipeModal