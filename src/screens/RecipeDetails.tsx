import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { addFavorite, removeFavorite } from '../redux/favoritesSlice';
import toast, { Toaster } from 'react-hot-toast';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface RecipeDetail {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strCategory: string;
  strArea: string;
  strIngredient1?: string;
  strIngredient2?: string;
  // Add other ingredients and measurements as needed
}

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const favoriteRecipes = useSelector((state: RootState) => state.favorites.favoriteRecipes);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    if (id) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(response => response.json())
        .then(data => {
          setRecipe(data.meals[0]);
          setLoading(false);
        })
        .catch(err => {
          setError(`Failed to fetch recipe details.${err}`);
          setLoading(false);
        });
    }
  }, [id]);

  const isFavorite = recipe ? favoriteRecipes.some(r => r.idMeal === recipe.idMeal) : false;

  const handleSaveToFavorites = () => {
    if (recipe) {
      dispatch(addFavorite(recipe));
      toast('Added to favorites!', { icon: '🚀' });
    }
  };

  const handleRemoveFromFavorites = () => {
    if (recipe) {
      dispatch(removeFavorite(recipe.idMeal));
      toast('Removed from favorites!', { icon: '💔' });
    }
  };

  const handleBackButtonClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  if (!recipe) {
    return <div className="text-center p-4">Recipe not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <button
        onClick={handleBackButtonClick}
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-lg"
      >
        Back
      </button>
      <h1 className="text-3xl font-bold mb-6 text-center">{recipe.strMeal}</h1>
      <div className="relative">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-96 object-contain rounded-lg shadow-lg"
        />
        <button
          onClick={isFavorite ? handleRemoveFromFavorites : handleSaveToFavorites}
          className={`absolute top-4 right-4 p-2 rounded-full border-4 border-red-700 ${isFavorite ? 'text-red-600' : 'text-gray-700'}`}
        >
          {isFavorite ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
        </button>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 mt-4">
        <div className="flex-1">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Ingredients:</h2>
            <ul className="list-disc list-inside ml-5">
              {Object.keys(recipe)
                .filter(key => key.startsWith('strIngredient') && recipe[key as keyof RecipeDetail])
                .map((key, index) => (
                  <li key={index} className="text-lg text-gray-700">{recipe[key as keyof RecipeDetail]}</li>
                ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Instructions:</h2>
            <ol className="list-disc list-inside ml-5 text-lg text-gray-700">
              {recipe.strInstructions.split('\n').map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default RecipeDetails;
