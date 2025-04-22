import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const IngredientSearch = dynamic(
  () => import("../components/IngredientSearch"),
  { loading: () => <p>Loading search…</p> }
);
const Navbar = dynamic(() => import("../components/navbar"));
const Footer = dynamic(() => import("./footer"));

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const searchRecipes = async (ingredientInput) => {
    const ingredients = ingredientInput.split(",").map((i) => i.trim());
    const recipeSets = await Promise.all(
      ingredients.map(async (ingredient) => {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
        );
        const data = await res.json();
        return data.meals || [];
      })
    );

    const commonIds = recipeSets.reduce((acc, currSet, index) => {
      const ids = currSet.map((meal) => meal.idMeal);
      return index === 0 ? ids : acc.filter((id) => ids.includes(id));
    }, []);

    const uniqueMeals = recipeSets
      .flat()
      .filter(
        (meal, index, self) =>
          commonIds.includes(meal.idMeal) &&
          self.findIndex((m) => m.idMeal === meal.idMeal) === index
      );

    setRecipes(uniqueMeals);
  };

  const toggleFavorite = (meal) => {
    const isFavorited = favorites.some((fav) => fav.idMeal === meal.idMeal);
    const updatedFavorites = isFavorited
      ? favorites.filter((fav) => fav.idMeal !== meal.idMeal)
      : [...favorites, meal];
    setFavorites(updatedFavorites);
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
    <div className="recipes-container">
      <Navbar />
      <h2>Search Recipes by Ingredient</h2>
      <IngredientSearch onSearch={searchRecipes} />

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
            Back to Recipes
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {recipes.map((r) => (
            <div
              key={r.idMeal}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                margin: "1rem",
                cursor: "pointer",
                borderRadius: "8px",
                width: "200px",
              }}
              onClick={() => fetchRecipeDetails(r.idMeal)}
            >
              <img
                src={r.strMealThumb}
                alt={r.strMeal}
                width={150}
                style={{ borderRadius: "6px" }}
              />
              <h3>{r.strMeal}</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(r);
                }}
              >
                {favorites.some((fav) => fav.idMeal === r.idMeal)
                  ? "Remove from Favorites"
                  : "Add to Favorites"}
              </button>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Recipes;
