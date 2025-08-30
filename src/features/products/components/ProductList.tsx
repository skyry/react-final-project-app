import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import { 
  fetchProducts, 
  selectPaginatedProducts, 
  selectProductsLoading, 
  selectProductsError,
  setSorting,
  selectProductsSorting,
  selectPaginationInfo,
  setFilters
} from '../model/productsSlice';
import ProductCard from './ProductCard';
import {Pagination} from '../../../components/ui/Pagination';
import type {SortBy, SortOrder} from '../../../types';

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectPaginatedProducts);
  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);
  const sorting = useAppSelector(selectProductsSorting);
  const paginationInfo = useAppSelector(selectPaginationInfo);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const [sortBy, sortOrder] = event.target.value.split('-') as [SortBy, SortOrder];
    dispatch(setSorting({ sortBy, sortOrder }));
  };

  const clearFilters = (): void => {
    dispatch(setFilters({
      category: '',
      priceRange: { min: 0, max: 100000 },
      searchQuery: '',
    }));
  };

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="glass-container p-5 text-center">
          <div className="spinner-border text-white mb-4" style={{ width: '4rem', height: '4rem' }} role="status">
            <span className="visually-hidden">Завантаження...</span>
          </div>
          <h4 className="text-white fw-bold mb-2">
            <i className="bi bi-hourglass-split me-2"></i>
            Завантаження товарів...
          </h4>
          <p className="text-white-50 mb-0">Будь ласка, зачекайте</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-container p-4 text-center">
        <div className="text-danger mb-3">
          <i className="bi bi-exclamation-triangle display-4"></i>
        </div>
        <h4 className="text-white mb-3">
          <strong>Помилка завантаження!</strong>
        </h4>
        <p className="text-white-50 mb-4">{error}</p>
        <button 
          className="btn btn-primary fw-bold"
          onClick={() => dispatch(fetchProducts())}
        >
          <i className="bi bi-arrow-clockwise me-2"></i>
          Спробувати знову
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Заголовок та сортування */}
      <div className="glass-container p-4 mb-4 slide-in">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
          <div>
            <h2 className="text-white fw-bold mb-2">
              <i className="bi bi-grid-3x3-gap me-3" style={{
                background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}></i>
              Каталог товарів
            </h2>
            <div className="text-white-50">
              <i className="bi bi-info-circle me-2"></i>
              Знайдено <span className="fw-bold text-white">{paginationInfo.totalItems}</span> товарів
            </div>
          </div>
          
          <div className="d-flex align-items-center gap-3">
            <label className="text-white fw-semibold mb-0">
              <i className="bi me-2"></i>
              Сортування:
            </label>
            <select 
              className="form-select fw-semibold" 
              style={{ 
                minWidth: '200px',
                background: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white'
              }}
              value={`${sorting.sortBy}-${sorting.sortOrder}`}
              onChange={handleSortChange}
            >
              <option value="name-asc">📝 Назва (А-Я)</option>
              <option value="name-desc">📝 Назва (Я-А)</option>
              <option value="price-asc">💰 Ціна (зростання)</option>
              <option value="price-desc">💰 Ціна (спадання)</option>
              <option value="rating-desc">⭐ Рейтинг (високий)</option>
              <option value="rating-asc">⭐ Рейтинг (низький)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Контент товарів */}
      <div className="glass-container p-4">
        {paginationInfo.totalItems === 0 ? (
          <div className="text-center py-5">
            <div className="mb-4">
              <i className="bi bi-search display-1 text-white-50"></i>
            </div>
            <h3 className="text-white fw-bold mb-3">Товари не знайдені</h3>
            <p className="text-white-50 mb-4">Спробуйте змінити параметри пошуку або очистити фільтри</p>
            <button 
              className="btn btn-primary fw-bold px-4"
              onClick={clearFilters}
            >
              <i className="bi bi-arrow-clockwise me-2"></i>
              Очистити фільтри
            </button>
          </div>
        ) : (
          <>
            <div className="row g-4 fade-in">
              {products.map((product, index) => (
                <div 
                  key={product.id} 
                  className="col-xl-4 col-lg-6 col-md-6"
                  style={{
                    animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            <Pagination />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;