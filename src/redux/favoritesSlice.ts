import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Recipe {
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

interface FavoritesState {
  favoriteRecipes: Recipe[]; // Store favorite recipes
}

const loadFavoritesFromLocalStorage = (): Recipe[] => {
  const savedFavorites = localStorage.getItem('favoriteRecipes');
  return savedFavorites ? JSON.parse(savedFavorites) : [];
};

const saveFavoritesToLocalStorage = (favoriteRecipes: Recipe[]) => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
};

const initialState: FavoritesState = {
  favoriteRecipes: loadFavoritesFromLocalStorage(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Recipe>) => {
      const recipe = action.payload;
      if (!state.favoriteRecipes.some(r => r.idMeal === recipe.idMeal)) {
        state.favoriteRecipes.push(recipe);
        saveFavoritesToLocalStorage(state.favoriteRecipes);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favoriteRecipes = state.favoriteRecipes.filter(recipe => recipe.idMeal !== action.payload);
      saveFavoritesToLocalStorage(state.favoriteRecipes);
    },
    clearFavorites: (state) => {
      state.favoriteRecipes = [];
      saveFavoritesToLocalStorage(state.favoriteRecipes);
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
