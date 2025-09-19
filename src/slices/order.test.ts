import orderSlice, {
  /* API */
  getFeeds,
  getOrderByNumber,
  sendBurger,
  getUserOrders,
  /* Исходное состояние */
  initialState
} from './order';
import { ERROR_TEXT } from './const-test';

describe("Тест для всех Reducer'ов заказа (ingredientsSlice)", () => {
  const order = {
    _id: 'ДляМеняЛюбимого',
    status: 'done',
    name: 'Заказ №13579-Ы',
    createdAt: '2025-09-16T01:23:45.678Z',
    updatedAt: '2025-09-16T01:23:45.678',
    number: 123,
    ingredients: ['Не мясо', 'Не рыба']
  };

  /* Исходное состояние */
  test('исходное состояние', () => {
    expect(orderSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  /* API */
  /* Лента заказов */
  test('получение ленты заказов: проверка pending', () => {
    const action = { type: getFeeds.pending.type };
    const state = orderSlice.reducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('получение ленты заказов: проверка fulfilled', () => {
    const action = { type: getFeeds.fulfilled.type, payload: [order] };
    const state = orderSlice.reducer(
      { ...initialState, loading: true },
      action
    );

    expect(state.loading).toBe(false);
    expect(state).toEqual({ ...initialState, feed: [order] });
  });

  test('получение ленты заказов: проверка rejected', () => {
    const action = {
      type: getFeeds.rejected.type,
      payload: ERROR_TEXT
    };
    const state = orderSlice.reducer(
      { ...initialState, loading: true },
      action
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe(ERROR_TEXT);
  });

  /* Заказ по номеру */
  test('получение заказа по номеру: проверка pending', () => {
    const action = { type: getOrderByNumber.pending.type };
    const state = orderSlice.reducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('получение заказа по номеру: проверка fulfilled', () => {
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders: [order] }
    };
    const state = orderSlice.reducer(
      { ...initialState, loading: true },
      action
    );

    expect(state.loading).toBe(false);
    expect(state).toEqual({ ...initialState, orderByNumber: order });
  });

  test('получение заказа по номеру: проверка rejected', () => {
    const action = {
      type: getOrderByNumber.rejected.type,
      payload: ERROR_TEXT
    };
    const state = orderSlice.reducer(
      { ...initialState, loading: true },
      action
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe(ERROR_TEXT);
  });

  /* Отправить бургер */
  test('отправка бургера: проверка pending', () => {
    const action = { type: sendBurger.pending.type };
    const state = orderSlice.reducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('отправка бургера: проверка fulfilled', () => {
    const action = {
      type: sendBurger.fulfilled.type,
      payload: { order: order, name: order.name }
    };
    const state = orderSlice.reducer(
      { ...initialState, loading: true },
      action
    );

    expect(state.loading).toBe(false);
    expect(state.newOrder.name).toBe(order.name);
    expect(state).toEqual({
      ...initialState,
      newOrder: { order: order, name: order.name }
    });
  });

  test('отправка бургера: проверка rejected', () => {
    const action = {
      type: sendBurger.rejected.type,
      payload: ERROR_TEXT
    };
    const state = orderSlice.reducer(
      { ...initialState, loading: true },
      action
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe(ERROR_TEXT);
  });

  /* Мои заказы */
  test('получение моих заказов: проверка pending', () => {
    const action = { type: getUserOrders.pending.type };
    const state = orderSlice.reducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('получение моих заказов: проверка fulfilled', () => {
    const action = {
      type: getUserOrders.fulfilled.type,
      payload: [order]
    };
    const state = orderSlice.reducer(
      { ...initialState, loading: true },
      action
    );

    expect(state.loading).toBe(false);
    expect(state).toEqual({ ...initialState, userOrders: [order] });
  });

  test('получение моих заказов: проверка rejected', () => {
    const action = {
      type: getUserOrders.rejected.type,
      payload: ERROR_TEXT
    };
    const state = orderSlice.reducer(
      { ...initialState, loading: true },
      action
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe(ERROR_TEXT);
  });
});
