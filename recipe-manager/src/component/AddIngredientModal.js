import React, { useState } from 'react';
import axios from 'axios';

const AddIngredientModal = ({ show, onClose, onSave }) => {
    const [ingredientName, setIngredientName] = useState('');
    const [error, setError] = useState('');

    const handleSave = async () => {
        if (!ingredientName) return; // Ensure ingredient name is entered
        try {
            // Send POST request to save ingredient
            const response = await axios.post('http://localhost:5000/ingredients', { name: ingredientName });
            onSave(response.data); // send the saved ingredient data to dashboard
            setIngredientName(''); // Clear input field
            alert("Ingerdient saved")
            onClose(); // Close modal
        } catch (error) {
            setError('Failed to save ingredient. Please try again.');
            console.error('Error saving ingredient:', error);
        }
    };

    if (!show) return null;

    return (
        <div className="modal">
            <div className='modal-dialog modal-dialog-centered'>
                <div className="modal-content">
                    <h2>Add New Ingredient</h2>
                    <div className='modalform'>
                        <div className="input-field mt-2 row g-3 align-items-center">
                            <div className="col-auto">
                                <label>Ingredient Name</label>
                            </div>
                            <div className="col-auto">
                                <input
                                    type="text"
                                    value={ingredientName}
                                    onChange={(e) => setIngredientName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        {error && <p className="text-danger">{error}</p>}
                        <div className="modal-actions mt-2">
                            <button className='btn btn-danger ms-2' onClick={onClose}>Cancel</button>
                            <button className='btn btn-success ms-2' onClick={handleSave}>Save Ingredient</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddIngredientModal
