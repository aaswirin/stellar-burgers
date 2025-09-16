import ingredientsSlice, {
  getApiIngredients,
  initialState
} from './ingredients';

describe("Тест для всех Reducer'ов ингредиента (ingredientsSlice)", () => {
  const ingredients = [
    {
      _id: '_Колобок',
      name: 'Колобок',
      type: 'bun',
      proteins: 11,
      fat: 12,
      carbohydrates: 13,
      calories: 14,
      price: 15,
      image: '',
      image_mobile: '',
      image_large: ''
    }
  ];

  test('исходное состояние', () => {
    expect(ingredientsSlice.reducer(undefined, { type: '' })).toEqual(
      initialState
    );
  });

  test('проверка pending', () => {
    const action = { type: getApiIngredients.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('проверка fulfilled', () => {
    const action = {
      type: getApiIngredients.fulfilled.type,
      payload: ingredients
    };
    const state = ingredientsSlice.reducer(
      { ...initialState, loading: true },
      action
    );

    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(ingredients);
  });

  test('проверка rejected', () => {
    const action = {
      type: getApiIngredients.rejected.type,
      payload: 'Шеф, всё пропало, гипс завтра снимают!'
    };
    const state = ingredientsSlice.reducer(
      { ...initialState, loading: true },
      action
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Шеф, всё пропало, гипс завтра снимают!');
  });
});
