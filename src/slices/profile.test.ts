import profileSlice, { initialState } from './profile';

describe('Тест исходного состояния для профиля (profileSlice)', () => {
  test('исходное состояние', () => {
    expect(profileSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });
});
