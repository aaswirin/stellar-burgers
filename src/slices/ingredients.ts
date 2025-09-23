/**
 * Slice для ингредиентов
 */

import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export interface IngredientsState {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
}

export const initialState: IngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const getApiIngredients = createAsyncThunk(
  'ingredients/getApiIngredients',
  async (_, { rejectWithValue }) => {
    try {
      return await getIngredientsApi();
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка загрузки ингредиентов');
    }
  }
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
      })
      .addCase(getApiIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(getApiIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
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
