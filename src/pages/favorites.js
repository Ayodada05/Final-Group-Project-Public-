import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("../components/navbar"));
const Footer = dynamic(() => import("./footer"));

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (idMeal) => {
    const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const fetchRecipeDetails = async (mealId) => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    const data = await res.json();
    setSelectedRecipe(data.meals[0]);
  };

  const clearSelectedRecipe = () => {
    setSelectedRecipe(null);
  };

  return (
    <div>
      <Navbar />
      <h2>Your Favorite Recipes</h2>

      {selectedRecipe ? (
        <div
          className="recipe-details"
          style={{
            padding: "1rem",
            border: "1px solid #ccc",
            marginTop: "2rem",
          }}
        >
          <h3>{selectedRecipe.strMeal}</h3>
          <img
            src={selectedRecipe.strMealThumb}
            alt={selectedRecipe.strMeal}
            width={200}
            style={{ borderRadius: "8px" }}
          />
          <p>
            <strong>Category:</strong> {selectedRecipe.strCategory}
          </p>
          <p>
            <strong>Area:</strong> {selectedRecipe.strArea}
          </p>

          <h4>Ingredients:</h4>
          <ul>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
              const ingredient = selectedRecipe[`strIngredient${num}`];
              const measure = selectedRecipe[`strMeasure${num}`];
              return ingredient && ingredient.trim() !== "" ? (
                <li key={num}>
                  {measure} {ingredient}
                </li>
              ) : null;
            })}
          </ul>

          <h4>Instructions:</h4>
          <p>{selectedRecipe.strInstructions}</p>

          <button onClick={clearSelectedRecipe} style={{ marginTop: "1rem" }}>
            Back to Favorites
          </button>
        </div>
      ) : favorites.length === 0 ? (
        <p>No favorite recipes yet.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {favorites.map((meal) => (
            <div
              key={meal.idMeal}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                margin: "1rem",
                width: "200px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={() => fetchRecipeDetails(meal.idMeal)}
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                width="100%"
                style={{ borderRadius: "8px" }}
              />
              <h3 style={{ fontSize: "1rem", margin: "0.5rem 0" }}>
                {meal.strMeal}
              </h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromFavorites(meal.idMeal);
                }}
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Favorites;
