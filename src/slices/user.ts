/**
 * Slice для пользователя
 */

import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { getCookie, setCookie } from '../utils/cookie';
import { TUser } from '@utils-types';

export const registerUser = createAsyncThunk(
  'user/new',
  async (newUserData: TRegisterData, { rejectWithValue }) => {
    try {
      return await registerUserApi(newUserData);
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка регистрации пользователя');
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (loginData: TLoginData, { rejectWithValue }) => {
    try {
      return await loginUserApi(loginData);
    } catch (err: any) {
      return rejectWithValue(
        err.message ||
          'Ошибка авторизации: проверьте правильность логина и пароля'
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (userPartialData: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      return await updateUserApi(userPartialData);
    } catch (err: any) {
      return rejectWithValue(
        err.message || 'Ошибка обновления данных пользователя'
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      return await logoutApi();
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка выхода');
    }
  }
);

export const checkUser = createAsyncThunk(
  'user/checkUser',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi().then((user) =>
        dispatch(userSlice.actions.setUser(user.user))
      );
    }
  }
);

export const setIsChecked = createAction<boolean, 'user/setIsChecked'>(
  'user/setIsChecked'
);

interface UserState {
  user: TUser | null;
  isAuthChecked: boolean;
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      /* Регистрация */
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      /* Вход */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      /* Обновление */
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      /* Выход */
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        setCookie('accessToken', '', { expires: -1 });
        localStorage.removeItem('refreshToken');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      /* Проверка */
      .addCase(setIsChecked, (state, action) => {
        state.isAuthChecked = action.payload;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsChecked: (state) => state.isAuthChecked,
    selectUserLoading: (state) => state.loading
  }
});

export const { selectUser, selectIsChecked, selectUserLoading } =
  userSlice.selectors;
export default userSlice;
