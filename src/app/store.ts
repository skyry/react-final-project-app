import {configureStore} from '@reduxjs/toolkit';
import productsReducer from '../features/products/model/productsSlice';
import cartReducer from '../features/cart/model/cartSlice';
import authReducer from '../features/auth/model/authSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
