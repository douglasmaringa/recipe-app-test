import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define the structure of a Recipe
interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  category: string; // Added category field
}

// Define the initial state structure
interface RecipesState {
  items: Recipe[]; // List of all recipes
  currentPage: number; // Current page for pagination
  itemsPerPage: number; // Number of items per page
  totalRecipes: number; // Total number of recipes
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Loading status
  error: string | null; // Error message if any
}

// Initial state of the recipes slice
const initialState: RecipesState = {
  items: [],
  currentPage: 1,
  itemsPerPage: 10,
  totalRecipes: 0,
  status: 'idle',
  error: null,
};

// Asynchronous thunk to fetch recipes from the API
export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
  // Fetch the categories from the API
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
  const data = await response.json();

  // For each category, fetch recipes and add the category name to each recipe
  const categoryFetches = data.categories.map((category: any) =>
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`)
      .then(res => res.json())
      .then(categoryData =>
        categoryData.meals.map((meal: Recipe) => ({
          ...meal,
          category: category.strCategory // Add category to recipe
        }))
      )
  );

  // Wait for all category fetches to complete and combine all recipes into one list
  const results = await Promise.all(categoryFetches);
  const allMeals = results.flat(); // Flatten the list of recipes

  return allMeals; // Return the combined list of recipes
});

// Create a slice of the Redux store for recipes
const recipesSlice = createSlice({
  name: 'recipes', // Name of the slice
  initialState, // Initial state defined above
  reducers: {
    // Reducer to set the current page for pagination
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle different states of the fetchRecipes thunk
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading'; // Set status to loading when request is in progress
      })
      .addCase(fetchRecipes.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
        state.items = action.payload; // Set the fetched recipes
        state.totalRecipes = action.payload.length; // Update total number of recipes
        state.status = 'succeeded'; // Set status to succeeded when fetch is complete
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed'; // Set status to failed if an error occurs
        state.error = action.error.message || 'Failed to fetch recipes'; // Set error message
      });
  },
});

// Export actions and reducer
export const { setPage } = recipesSlice.actions;
export default recipesSlice.reducer;
