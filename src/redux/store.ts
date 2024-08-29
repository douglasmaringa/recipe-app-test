import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from './recipesSlice';
import favoritesReducer from './favoritesSlice';

const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
