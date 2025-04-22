import React, { useState } from 'react';

const IngredientSearch = ({ onSearch }) => {
    const [ingredient, setIngredient] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(ingredient);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter ingredient"
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default IngredientSearch;
