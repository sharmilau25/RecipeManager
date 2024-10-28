import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddSubIngredientModal = ({ show, onClose, onSave, ingredients,fetchIngredients }) => {
    
    const [selectedIngredient, setSelectedIngredient] = useState(''); // Selected ingredient ID
    const [subIngredientName, setSubIngredientName] = useState(''); // New sub-ingredient name
//useEffect to update ingredients on modal open
    useEffect(()=>
    {
        if(show)
        {
            fetchIngredients();
        }
    },[show,fetchIngredients])
    // Handle save button click
    const handleSave = async () => {
        if (selectedIngredient && subIngredientName) {
            try {
                // Send data to backend API
                const response = await axios.post('http://localhost:5000/sub-ingredients', {
                    ingredientId: selectedIngredient,
                    name: subIngredientName,
                });
                // Notify parent component and close modal
                onSave(response.data);
                setSelectedIngredient('')
                setSubIngredientName('')
                alert("Sub-ingerdient saved")
                onClose();
            } catch (error) {
                console.error('Error saving sub-ingredient:', error);
                alert('Failed to save sub-ingredient. Please try again.');
            }
        } else {
            alert('Please select an ingredient and enter a sub-ingredient name.');
        }
    };

    if (!show) return null;

    return (
        <div className="modal">
            <div className='modal-dialog modal-dialog-centered'>
                <div className="modal-content">
                    <h2>Add New Sub-Ingredient</h2>
                    <div className='modalform'>

                        {/* Ingredient Dropdown */}
                        <div className="input-field mt-2 row g-3 align-items-center">
                            <div className="col-auto">
                                <label>Ingredient Name</label>
                            </div>
                            <div className="col-auto">
                                <select
                                    value={selectedIngredient}
                                    onChange={(e) => setSelectedIngredient(e.target.value)}
                                    className="form-select"
                                    required
                                >
                                    <option value="">Select Ingredient</option>
                                    {ingredients.map((ingredient) => (
                                        <option key={ingredient._id} value={ingredient._id}>
                                            {ingredient.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Sub-Ingredient Name Input */}
                        <div className="input-field mt-2 row g-3 align-items-center">
                            <div className="col-auto">
                                <label>Sub-Ingredient Name</label>
                            </div>
                            <div className="col-auto">
                                <input
                                    type="text"
                                    value={subIngredientName}
                                    onChange={(e) => setSubIngredientName(e.target.value)}
                                    required
                                    className="form-control"
                                />
                            </div>
                        </div>

                        {/* Modal Actions */}
                        <div className="modal-actions mt-2">
                            <button className='btn btn-danger ms-2' onClick={onClose}>Cancel</button>
                            <button className='btn btn-success ms-2' onClick={handleSave}>Save Sub-Ingredient</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddSubIngredientModal
