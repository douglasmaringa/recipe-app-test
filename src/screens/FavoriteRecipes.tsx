import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { removeFavorite } from '../redux/favoritesSlice';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const FavoriteRecipes: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const favoriteRecipes = useSelector((state: RootState) => state.favorites.favoriteRecipes);

  const handleRemove = (id: string) => {
    dispatch(removeFavorite(id));
  };

  const handleBackButtonClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={handleBackButtonClick}
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-lg"
      >
        Back
      </button>
      <h1 className="text-2xl font-bold mb-4">Favorite Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favoriteRecipes.length > 0 ? (
          favoriteRecipes.map(recipe => (
            <div key={recipe.idMeal} className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col relative">
              <Link to={`/recipe/${recipe.idMeal}`} className="flex-grow">
                <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover" />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold truncate">{recipe.strMeal}</h3>
                </div>
              </Link>
              <button
                onClick={() => handleRemove(recipe.idMeal)}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <FaTrash size={20} />
              </button>
            </div>
          ))
        ) : (
          <div>No favorite recipes found.</div>
        )}
      </div>
    </div>
  );
};

export default FavoriteRecipes;
