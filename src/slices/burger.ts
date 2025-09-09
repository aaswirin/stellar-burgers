/**
 * Slice для бургера
 */

import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export interface BurgerState {
  burger: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  isLoading: boolean;
  error: string | null;
}

export const initialState: BurgerState = {
  burger: {
    bun: null,
    ingredients: []
  },
  isLoading: false,
  error: null
};

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.burger.bun = action.payload;
        } else {
          state.burger.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    replaceIngredient: (state, action) => {
      const ingredient = state.burger.ingredients[action.payload.first];
      state.burger.ingredients[action.payload.first] =
        state.burger.ingredients[action.payload.second];
      state.burger.ingredients[action.payload.second] = ingredient;
    },
    deleteIngredient: (state, action) => {
      state.burger.ingredients = state.burger.ingredients.filter(
        (ingredient) => ingredient._id !== action.payload
      );
    },
    deleteBurger(state) {
      state.burger.bun = null;
      state.burger.ingredients = [];
    }
  },
  selectors: {
    selectBurger: (state) => state.burger
  }
});

export const { selectBurger } = burgerSlice.selectors;
export const {
  addIngredient,
  replaceIngredient,
  deleteIngredient,
  deleteBurger
} = burgerSlice.actions;
export default burgerSlice;
