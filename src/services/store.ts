/**
 * Хранилище
 */

import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import profileSlice from '../slices/profile';
import ingredientsSlice from '../slices/ingredients';
import burgerSlice from '../slices/burger';
import orderSlice from '../slices/order';
import userSlice from '../slices/user';

export const rootReducer = combineReducers({
  profile: profileSlice.reducer,
  ingredients: ingredientsSlice.reducer,
  burger: burgerSlice.reducer,
  order: orderSlice.reducer,
  user: userSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
