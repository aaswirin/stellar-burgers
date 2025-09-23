import burgerSlice, {
  addIngredient,
  replaceIngredient,
  deleteIngredient,
  deleteBurger,
  initialState
} from './burger';
import { TConstructorIngredient, TIngredient } from '@utils-types';

describe("Тест для всех Reducer'ов конструктора бургеров (burgerSlice)", () => {
  const bun: TIngredient = {
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
  };
  const ingredient1: TConstructorIngredient = {
    id: 'Не мясо',
    _id: '_Не мясо',
    name: 'Не мясо',
    type: 'main',
    proteins: 21,
    fat: 22,
    carbohydrates: 23,
    calories: 24,
    price: 25,
    image: '',
    image_mobile: '',
    image_large: ''
  };
  const ingredient2: TConstructorIngredient = {
    id: 'Не рыба',
    _id: '_Не рыба',
    name: 'Не рыба',
    type: 'main',
    proteins: 31,
    fat: 32,
    carbohydrates: 33,
    calories: 34,
    price: 35,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  test('исходное состояние', () => {
    expect(burgerSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('добавление булки', () => {
    const state = burgerSlice.reducer(undefined, addIngredient(bun));

    expect({
      ...state.burger.bun,
      id: bun._id
    }).toEqual({
      ...bun,
      id: bun._id
    });

    expect(state.burger.ingredients).toEqual([]);
  });

  test('добавление ингредиента', () => {
    const state = burgerSlice.reducer(undefined, addIngredient(ingredient1));

    expect({
      ...state.burger.ingredients['0'],
      id: ingredient1.id
    }).toEqual(ingredient1);
  });

  test('перемещение ингредиента', () => {
    const sourceState = {
      burger: { bun: null, ingredients: [ingredient1, ingredient2] },
      isLoading: true,
      error: null
    };
    const move = { first: 1, second: 0 };
    const state = burgerSlice.reducer(sourceState, replaceIngredient(move));

    expect(state.burger.ingredients).toEqual([ingredient2, ingredient1]);
  });

  test('удаление ингредиента', () => {
    const sourceState = {
      burger: { bun: null, ingredients: [ingredient1, ingredient2] },
      isLoading: true,
      error: null
    };
    const state = burgerSlice.reducer(
      sourceState,
      deleteIngredient(ingredient1._id)
    );

    expect(state.burger.ingredients).toEqual([ingredient2]);
  });

  test('удаление бургера', () => {
    const sourceState = {
      burger: { bun: null, ingredients: [ingredient1, ingredient2] },
      isLoading: true,
      error: null
    };
    const resultState = {
      burger: { bun: null, ingredients: [] },
      isLoading: true,
      error: null
    };
    const state = burgerSlice.reducer(sourceState, deleteBurger());

    expect(state).toEqual(resultState);
  });
});
