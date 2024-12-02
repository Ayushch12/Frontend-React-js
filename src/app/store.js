import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/productsSlice';
import categoriesReducer from '../features/categoriesSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
  },
});

export default store;
