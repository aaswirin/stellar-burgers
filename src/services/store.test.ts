import { rootReducer } from './store';
import { initialState as ingredientsInitialState } from '../slices/ingredients';
import { initialState as burgerInitialState } from '../slices/burger';
import { initialState as orderInitialState } from '../slices/order';
import { initialState as profileInitialState } from '../slices/profile';
import { initialState as userInitialState } from '../slices/user';

const reducerInitialState = {
  ingredients: ingredientsInitialState,
  burger: burgerInitialState,
  order: orderInitialState,
  profile: profileInitialState,
  user: userInitialState
};

describe("Тест Reducer'ов", () => {
  test("action, который не обрабатывается ни одним Reducer'ом", () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual(reducerInitialState);
  });
});
