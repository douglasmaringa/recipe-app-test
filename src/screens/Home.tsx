import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchRecipes, setPage } from '../redux/recipesSlice';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const recipes = useSelector((state: RootState) => state.recipes.items);
  const currentPage = useSelector((state: RootState) => state.recipes.currentPage);
  const itemsPerPage = useSelector((state: RootState) => state.recipes.itemsPerPage);
  //const totalRecipes = useSelector((state: RootState) => state.recipes.totalRecipes);
  const recipeStatus = useSelector((state: RootState) => state.recipes.status);
  const favoriteRecipes = useSelector((state: RootState) => state.favorites.favoriteRecipes);
  
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  useEffect(() => {
    if (recipeStatus === 'idle') {
      dispatch(fetchRecipes());
    }
  }, [recipeStatus, dispatch]);

  useEffect(() => {
    // Filter recipes based on search query
    const filtered = recipes.filter(recipe =>
      recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // Check if there are any favorite recipes
    const sorted = favoriteRecipes.length > 0
      ? filtered.sort((a, b) => {
         // Determine if each recipe is a favorite
          const aIsFavorite = favoriteRecipes.some(fav => fav.idMeal === a.idMeal);
          const bIsFavorite = favoriteRecipes.some(fav => fav.idMeal === b.idMeal);

        // Compare the favorite status of each recipe
        // If both recipes have the same favorite status, keep their order unchanged
        // If only one recipe is a favorite, prioritize that recipe
          return aIsFavorite === bIsFavorite ? 0 : aIsFavorite ? -1 : 1;
        })
      : filtered; // If no favorite recipes exist, return the filtered array as is

    setFilteredRecipes(sorted);
  }, [searchQuery, recipes]);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  if (recipeStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (recipeStatus === 'failed') {
    return <div>Error loading recipes.</div>;
  }

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);

  return (
    <div>
    <Header/>
    <div className="container mx-auto p-4">
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredRecipes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((recipe) => (
          <Link to={`/recipe/${recipe.idMeal}`} key={recipe.idMeal}>
            <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
              <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover" />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold truncate">{recipe.strMeal}</h3>
                <p className="text-sm text-gray-600 mt-2">{recipe.category}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {searchQuery === '' && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg mx-1"
          >
            Previous
          </button>
          <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg mx-1"
          >
            Next
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

export default Home;
