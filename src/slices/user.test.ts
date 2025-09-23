import userSlice, {
  initialState,
  registerUser,
  loginUser,
  updateUser,
  logoutUser
} from './user';
import { getCookie, setCookie } from '../utils/cookie';
import { ERROR_TEXT } from './const-test';

describe("Тест для всех Reducer'ов заказа (userSlice)", () => {
  /* Что было до тестов */
  const mockCookie = getCookie('accessToken');
  const mockLocalStorage = localStorage.getItem('refreshToken');

  const user = {
    email: 'village@grandfather.рф',
    name: 'Ванька Жуков'
  };

  test('исходное состояние', () => {
    expect(userSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  /* Регистрация пользователя */
  test('регистрация пользователя: проверка pending', () => {
    const action = { type: registerUser.pending.type };
    const state = userSlice.reducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('регистрация пользователя: проверка fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: { user: user }
    };
    const state = userSlice.reducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(user);
    expect(state.isAuthChecked).toBe(true);
  });

  test('регистрация пользователя: проверка rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      payload: ERROR_TEXT
    };
    const state = userSlice.reducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(ERROR_TEXT);
  });

  /* Вход */
  test('вход пользователя: проверка pending', () => {
    const action = { type: loginUser.pending.type };
    const state = userSlice.reducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('вход пользователя: проверка fulfilled', () => {
    const action = { type: loginUser.fulfilled.type, payload: { user: user } };
    const state = userSlice.reducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(user);
    expect(state.isAuthChecked).toBe(true);
  });

  test('вход пользователя: проверка rejected', () => {
    const action = {
      type: loginUser.rejected.type,
      payload: ERROR_TEXT
    };
    const state = userSlice.reducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(ERROR_TEXT);
  });

  /* Обновление */
  test('обновление пользователя: проверка pending', () => {
    const action = { type: updateUser.pending.type };
    const state = userSlice.reducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('обновление пользователя: проверка fulfilled', () => {
    const action = { type: updateUser.fulfilled.type, payload: { user: user } };
    const state = userSlice.reducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(user);
  });

  test('обновление пользователя: проверка rejected', () => {
    const action = {
      type: updateUser.rejected.type,
      payload: ERROR_TEXT
    };
    const state = userSlice.reducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(ERROR_TEXT);
  });

  /* Выход */
  test('выход пользователя: проверка pending', () => {
    const action = { type: logoutUser.pending.type };
    const state = userSlice.reducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('выход пользователя: проверка fulfilled', () => {
    const action = { type: logoutUser.fulfilled.type, payload: { user: user } };
    const state = userSlice.reducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(null);
  });

  test('выход пользователя: проверка rejected', () => {
    const action = {
      type: logoutUser.rejected.type,
      payload: ERROR_TEXT
    };
    const state = userSlice.reducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(ERROR_TEXT);
  });

  /* Прибраться */
  if (mockCookie) setCookie('accessToken', mockCookie);
  if (mockLocalStorage) localStorage.setItem('refreshToken', mockLocalStorage);
});
