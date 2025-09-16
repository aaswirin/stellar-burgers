import orderSlice, {
  /* API */
  getFeeds,
  getOrderByNumber,
  sendBurger,
  getUserOrders,
  /* Селекторы */
  selectNewOrder,
  selectFeed,
  selectFeedOrders,
  selectOrdersLoading,
  selectOrderRequest,
  selectOrderByNumber,
  selectUserOrders,
  /* Исходное состояние */
  initialState
} from './order';

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
    console.log(state);
    expect(state.feed).toEqual([order]);
  });

  test('получение ленты заказов: проверка rejected', () => {
    const action = {
      type: getFeeds.rejected.type,
      payload: 'Шеф, всё пропало, гипс завтра снимают!'
    };
    const state = orderSlice.reducer(
      { ...initialState, loading: true },
      action
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Шеф, всё пропало, гипс завтра снимают!');
  });

  /* Заказ по номеру getOrderByNumber*/
  /* Отправить бургер sendBurger*/
  /* Мои заказы getUserOrders*/
});
