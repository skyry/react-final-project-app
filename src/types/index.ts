// Типи для товарів
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  image: string;
  inStock: boolean;
  stockQuantity: number;
  isNew?: boolean;
  discount?: number;
  createdAt: string;
}

// Типи для фільтрів
export interface ProductFilters {
  category: string;
  priceRange: {
    min: number;
    max: number;
  };
  searchQuery: string;
}

// Типи для сортування
export type SortBy = 'name' | 'price' | 'createdAt';
export type SortOrder = 'asc' | 'desc';

export interface ProductSorting {
  sortBy: SortBy;
  sortOrder: SortOrder;
}

// Типи для пагінації
export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

// Типи для стану товарів
export interface ProductsState {
  items: Product[];
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
  filters: ProductFilters;
  sortBy: SortBy;
  sortOrder: SortOrder;
  pagination: Pagination;
}

// Типи для кошика
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  loading: boolean;
  error: string | null;
}

// Типи для API запитів
export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  image: string;
  inStock: boolean;
  stockQuantity: number;
  isNew?: boolean;
  discount?: number;
}

export interface UpdateProductData extends Partial<CreateProductData> {
  id: string;
}

// Типи для компонентів
export interface ProductCardProps {
  product: Product;
}

export interface CartItemProps {
  item: CartItem;
}

export interface PriceFormatOptions {
  locale?: string;
  currency?: string;
}
