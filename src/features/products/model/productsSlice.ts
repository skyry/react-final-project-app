import {createSlice, createAsyncThunk, PayloadAction, createSelector} from '@reduxjs/toolkit';
import {productsApi} from '../api/productsApi';
import type { 
  Product, 
  ProductsState, 
  ProductFilters, 
  SortBy, 
  SortOrder, 
  CreateProductData,
  UpdateProductData,
  Pagination
} from '../../../types';
import type { RootState } from '../../../app/store';

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const products = await productsApi.getAll();
      return products;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const fetchProductById = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>(
  'products/fetchProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const product = await productsApi.getById(productId);
      return product;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const createProduct = createAsyncThunk<
  Product,
  CreateProductData,
  { rejectValue: string }
>(
  'products/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const product = await productsApi.create(productData);
      // Невелика затримка для стабілізації DOM
      await new Promise(resolve => setTimeout(resolve, 100));
      return product;
    } catch (error) {
      console.error('Create product error:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const updateProduct = createAsyncThunk<
  Product,
  { id: string; productData: UpdateProductData },
  { rejectValue: string }
>(
  'products/updateProduct',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const product = await productsApi.update(id, productData);
      return product;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const deleteProduct = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  'products/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      await productsApi.delete(productId);
      return productId;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

const initialState: ProductsState = {
  items: [],
  currentProduct: null,
  loading: false,
  error: null,
  filters: {
    category: '',
    priceRange: { min: 0, max: 100000 },
    searchQuery: '',
  },
  sortBy: 'name',
  sortOrder: 'asc',
  pagination: {
    currentPage: 1,
    itemsPerPage: 9,
    totalItems: 0,
    totalPages: 0,
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action: PayloadAction<Partial<ProductFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.currentPage = 1; // Скидаємо на першу сторінку при зміні фільтрів
    },
    setSorting: (state, action: PayloadAction<{ sortBy: SortBy; sortOrder: SortOrder }>) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
      state.pagination.currentPage = 1; // Скидаємо на першу сторінку при зміні сортування
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.pagination.itemsPerPage = action.payload;
      state.pagination.currentPage = 1; // Скидаємо на першу сторінку
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        // Захист від некоректних даних з API
        const products = Array.isArray(action.payload) ? action.payload : [];
        state.items = products;
        // Оновлюємо пагінацію
        state.pagination.totalItems = products.length;
        state.pagination.totalPages = Math.ceil(products.length / state.pagination.itemsPerPage);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      })
      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      })
      // Create product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        // Безпечно додаємо новий продукт
        try {
          // Переконуємося, що items є масивом
          if (!Array.isArray(state.items)) {
            state.items = [];
          }
          state.items.push(action.payload);
          // Оновлюємо пагінацію
          state.pagination.totalItems = state.items.length;
          state.pagination.totalPages = Math.ceil(state.items.length / state.pagination.itemsPerPage);
        } catch (error) {
          console.warn('Error updating state after product creation:', error);
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      })
      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        // Переконуємося, що items є масивом
        if (!Array.isArray(state.items)) {
          state.items = [];
          return;
        }
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      })
      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        // Переконуємося, що items є масивом
        if (!Array.isArray(state.items)) {
          state.items = [];
          return;
        }
        state.items = state.items.filter(item => item.id !== action.payload);
        // Оновлюємо пагінацію
        state.pagination.totalItems = state.items.length;
        state.pagination.totalPages = Math.ceil(state.items.length / state.pagination.itemsPerPage);
        // Якщо поточна сторінка стала порожньою, переходимо на попередню
        if (state.pagination.currentPage > state.pagination.totalPages && state.pagination.totalPages > 0) {
          state.pagination.currentPage = state.pagination.totalPages;
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });
  },
});

export const { 
  clearError, 
  setFilters, 
  setSorting, 
  setCurrentPage, 
  setItemsPerPage, 
  clearCurrentProduct 
} = productsSlice.actions;

// Selectors
export const selectProducts = (state: RootState): Product[] => {
  return Array.isArray(state.products.items) ? state.products.items : [];
};
export const selectCurrentProduct = (state: RootState): Product | null => state.products.currentProduct;
export const selectProductsLoading = (state: RootState): boolean => state.products.loading;
export const selectProductsError = (state: RootState): string | null => state.products.error;
export const selectProductsFilters = (state: RootState): ProductFilters => state.products.filters;
export const selectProductsSorting = createSelector(
  [(state: RootState) => state.products.sortBy, (state: RootState) => state.products.sortOrder],
  (sortBy, sortOrder) => ({ sortBy, sortOrder })
);

// Селектор для фільтрованих та відсортованих продуктів
export const selectFilteredProducts = createSelector(
  [selectProducts, selectProductsFilters, selectProductsSorting],
  (products, filters, { sortBy, sortOrder }) => {
    // Захист від undefined або null
    if (!products || !Array.isArray(products)) {
      return [];
    }
    
    let filteredProducts = products.filter((product) => {
      const matchesCategory = !filters.category || product.category === filters.category;
      const matchesPrice = product.price >= filters.priceRange.min && product.price <= filters.priceRange.max;
      const matchesSearch = !filters.searchQuery || 
        product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(filters.searchQuery.toLowerCase()));
      
      return matchesCategory && matchesPrice && matchesSearch;
    });

    // Сортування
    filteredProducts.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'createdAt':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return filteredProducts;
  }
);

// Селектор для отримання товарів з пагінацією
export const selectPaginatedProducts = createSelector(
  [selectFilteredProducts, (state: RootState) => state.products.pagination],
  (filteredProducts, pagination) => {
    // Захист від undefined або null
    if (!filteredProducts || !Array.isArray(filteredProducts)) {
      return [];
    }
    
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    
    return filteredProducts.slice(startIndex, endIndex);
  }
);

// Селектор для отримання інформації про пагінацію з врахуванням фільтрів
export const selectPaginationInfo = createSelector(
  [selectFilteredProducts, (state: RootState) => state.products.pagination],
  (filteredProducts, pagination) => {
    // Захист від undefined або null
    const totalFilteredItems = filteredProducts && Array.isArray(filteredProducts) ? filteredProducts.length : 0;
    const totalPages = Math.ceil(totalFilteredItems / pagination.itemsPerPage);
    
    return {
      currentPage: pagination.currentPage,
      itemsPerPage: pagination.itemsPerPage,
      totalItems: totalFilteredItems,
      totalPages,
      hasNextPage: pagination.currentPage < totalPages,
      hasPrevPage: pagination.currentPage > 1,
    };
  }
);

export default productsSlice.reducer;