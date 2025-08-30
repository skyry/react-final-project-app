export interface ApiConfig {
  BASE_URL: string;
  ENDPOINTS: {
    PRODUCTS: string;
    CART: string;
  };
}

export const API_CONFIG: ApiConfig = {
  BASE_URL: 'https://68ab6acc7a0bbe92cbb77ce5.mockapi.io/api/v1/',
  ENDPOINTS: {
    PRODUCTS: '/Products',
    CART: '/cart',
  },
};

export interface ProductCategories {
  [key: string]: string;
}

export const PRODUCT_CATEGORIES: ProductCategories = {
  processors: 'Процесори',
  graphics: 'Відеокарти', 
  memory: 'Оперативна пам\'ять',
  storage: 'Накопичувачі',
  motherboards: 'Материнські плати',
  power: 'Блоки живлення',
  cases: 'Корпуси',
  cooling: 'Охолодження',
};
