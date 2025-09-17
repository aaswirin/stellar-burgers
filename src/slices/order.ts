/**
 * Slice для заказов
 */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '@api';

export const getFeeds = createAsyncThunk(
  'feed/fetchInfo',
  async (_, { rejectWithValue }) => {
    try {
      return await getFeedsApi();
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка загрузки ленты заказов');
    }
  }
);

export const getOrderByNumber = createAsyncThunk(
  'feed/fetchByNumber',
  async (orderNumber: number, { rejectWithValue }) => {
    try {
      return await getOrderByNumberApi(orderNumber);
    } catch (err: any) {
      return rejectWithValue(
        err.message || 'Ошибка получения заказа по номеру'
      );
    }
  }
);

export const sendBurger = createAsyncThunk(
  'order/postUserBurger',
  async (userBurgerIngredients: string[], { rejectWithValue }) => {
    try {
      return await orderBurgerApi(userBurgerIngredients);
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка отправки заказа');
    }
  }
);

export const getUserOrders = createAsyncThunk(
  'order/getUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      return await getOrdersApi();
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка получения заказа');
    }
  }
);

interface OrderState {
  feed: {
    success: boolean;
    orders: TOrder[];
    total: number;
    totalToday: number;
  };
  userOrders: TOrder[];
  orderByNumber: TOrder | null;
  newOrder: {
    order: TOrder | null;
    name: string;
  };
  orderRequest: boolean;
  loading: boolean;
  error: string | null;
}

export const initialState: OrderState = {
  feed: {
    success: false,
    total: 0,
    totalToday: 0,
    orders: []
  },
  userOrders: [],
  orderByNumber: null,
  newOrder: {
    order: null,
    name: ''
  },
  orderRequest: false,
  loading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setNewOrder: (state, action) => {
      state.orderRequest = action.payload;
      state.newOrder.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      /* Новый заказ */
      .addCase(sendBurger.pending, (state) => {
        state.loading = true;
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(sendBurger.fulfilled, (state, action) => {
        state.loading = false;
        state.orderRequest = false;
        state.newOrder = {
          order: action.payload.order,
          name: action.payload.name
        };
      })
      .addCase(sendBurger.rejected, (state, action) => {
        state.loading = false;
        state.orderRequest = false;
        state.error = action.payload as string;
      })
      /* Лента заказов */
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.feed = action.payload;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      /* Заказ по номеру */
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderByNumber = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.orderByNumber = action.payload.orders[0];
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      /* ЗаказЫ пользователя */
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
  selectors: {
    selectNewOrder: (state) => state.newOrder,
    selectFeed: (state) => state.feed,
    selectFeedOrders: (state) => state.feed.orders,
    selectOrdersLoading: (state) => state.loading,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderByNumber: (state) => state.orderByNumber,
    selectUserOrders: (state) => state.userOrders
  }
});

export const {
  selectNewOrder,
  selectFeed,
  selectFeedOrders,
  selectOrdersLoading,
  selectOrderRequest,
  selectOrderByNumber,
  selectUserOrders
} = orderSlice.selectors;
export default orderSlice;
