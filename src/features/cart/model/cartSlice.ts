import {createSlice, PayloadAction, createSelector} from '@reduxjs/toolkit';
import {localStorageService, STORAGE_KEYS} from '../../../services/storage/localStorage';
import type {CartState, CartItem, Product} from '../../../types';
import type {RootState} from '../../../app/store';

const loadCartFromStorage = (): CartItem[] => {return localStorageService.get<CartItem[]>(STORAGE_KEYS.CART) || [];};

const saveCartToStorage = (cartItems: CartItem[]): void => {localStorageService.set(STORAGE_KEYS.CART, cartItems);};

const initialState: CartState = {
  items: loadCartFromStorage(),
  isOpen: false,
  loading: false,
  error: null,
};

interface AddToCartPayload {
  product: Product;
  quantity?: number;
}

interface UpdateQuantityPayload {
  productId: string;
  quantity: number;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {state.items.push({ product, quantity });}
      
      saveCartToStorage(state.items);
    },
    
    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.product.id !== productId);
      saveCartToStorage(state.items);
    },
    
    updateQuantity: (state, action: PayloadAction<UpdateQuantityPayload>) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.product.id === productId);
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.product.id !== productId);
        } else {item.quantity = quantity;}
        saveCartToStorage(state.items);
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage([]);
    },
    
    toggleCart: (state) => {state.isOpen = !state.isOpen;},
    
    setCartOpen: (state, action: PayloadAction<boolean>) => {state.isOpen = action.payload;},
    
    setCartError: (state, action: PayloadAction<string>) => {state.error = action.payload;},
    
    clearCartError: (state) => {state.error = null;},
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  setCartOpen,
  setCartError,
  clearCartError,
} = cartSlice.actions;

// Селектори
export const selectCartItems = (state: RootState): CartItem[] => state.cart.items;
export const selectCartIsOpen = (state: RootState): boolean => state.cart.isOpen;
export const selectCartLoading = (state: RootState): boolean => state.cart.loading;
export const selectCartError = (state: RootState): string | null => state.cart.error;

export const selectCartTotalItems = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartTotalPrice = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
);

export const selectCartItemById = createSelector(
  [selectCartItems, (state: RootState, productId: string) => productId],
  (items, productId) => items.find(item => item.product.id === productId)
);

export const selectIsProductInCart = createSelector(
  [selectCartItems, (state: RootState, productId: string) => productId],
  (items, productId) => items.some(item => item.product.id === productId)
);

export default cartSlice.reducer;