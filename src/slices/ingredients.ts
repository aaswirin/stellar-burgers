/**
 * Slice для ингредиентов
 */

import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface IngredientsState {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const getApiIngredients = createAsyncThunk(
  'ingredients/getApiIngredients',
  getIngredientsApi
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getApiIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('pending');
      })
      .addCase(getApiIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
        console.log('fulfilled');
      })
      .addCase(getApiIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.log('rejected');
      });
  },
  selectors: {
    selectIngredientsLoading: (state) => state.loading,
    selectIngredients: (state) => state.ingredients,
    selectIngredientsError: (state) => state.error
  }
});

export const {
  selectIngredientsLoading,
  selectIngredients,
  selectIngredientsError
} = ingredientsSlice.selectors;
export default ingredientsSlice;
