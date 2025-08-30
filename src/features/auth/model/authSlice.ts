import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../../app/store';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Мок-дані користувачів
const mockUsers = [
  {
    id: '1',
    email: 'admin@serjstore.ua',
    password: 'admin123',
    name: 'Адміністратор',
    role: 'admin' as const
  },
  {
    id: '2',
    email: 'user@google.com',
    password: 'user123',
    name: 'Користувач',
    role: 'user' as const
  }
];

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // Перевіряємо наявність window та localStorage
      if (typeof window === 'undefined') {
        return rejectWithValue('Сервер недоступний');
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = mockUsers.find(
        u => u.email === credentials.email && u.password === credentials.password
      );
      
      if (!user) {
        return rejectWithValue('Невірний email або пароль');
      }
      
      const { password, ...userWithoutPassword } = user;
      
      // Зберігаємо в localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      }
      
      return userWithoutPassword;
    } catch (error) {
      return rejectWithValue('Помилка входу');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
    return null;
  }
);

export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async () => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        return JSON.parse(userStr) as User;
      }
    }
    return null;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Логін
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
      })
      // Вихід
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      // Статус автентифікації
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
        }
      });
  },
});

export const {clearError} = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectIsAdmin = (state: RootState) => state.auth.user?.role === 'admin';
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;

export default authSlice.reducer;