/**
 * Slice для профиля
 */

import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

type TProfileState = {
  isLoading: boolean;
  user: TUser | null;
};

export const initialState: TProfileState = {
  isLoading: true,
  user: null
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  selectors: {
    selectUser: (sliceState) => sliceState.user,
    selectIsLoading: (sliceState) => sliceState.isLoading
  }
});

export const { selectUser, selectIsLoading } = profileSlice.selectors;

export default profileSlice;
