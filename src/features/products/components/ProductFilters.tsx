import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {setFilters, selectProductsFilters} from '../model/productsSlice';
import {PRODUCT_CATEGORIES} from '../../../shared/config/constants';

const getCategoryIcon = (categoryKey: string): string => {
  const icons: Record<string, string> = {
    processors: '🧠',
    graphics: '🎮',
    memory: '💾',
    storage: '💿',
    motherboards: '🔌',
    power: '⚡',
    cases: '📦',
    cooling: '❄️'
  };
  return icons[categoryKey] || '🖥️';
};

const ProductFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectProductsFilters);

  const handleCategoryChange = (category: string): void => {
    dispatch(setFilters({ category }));
  };

  const handlePriceRangeChange = (min: number, max: number): void => {
    dispatch(setFilters({ priceRange: { min, max } }));
  };

  const handleSearchChange = (searchQuery: string): void => {
    dispatch(setFilters({ searchQuery }));
  };

  const clearFilters = (): void => {
    dispatch(setFilters({
      category: '',
      priceRange: { min: 0, max: 100000 },
      searchQuery: '',
    }));
  };

  return (
    <div className="glass-container p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="mb-0 text-white fw-bold">
          <i className="bi bi-funnel me-2"></i> Фільтри
        </h5>
        <button 
          className="btn btn-outline-primary btn-sm"
          onClick={clearFilters}
        >
          <i className="bi bi-arrow-clockwise me-1"></i>
          Очистити
        </button>
      </div>

      {/* Пошук */}
      <div className="mb-4">
        <label className="form-label fw-semibold text-white">
          <i className="bi bi-search me-2"></i>Пошук
        </label>
        <div className="input-group">
          <span className="input-group-text" style={{
            background: 'rgba(255, 255, 255, 0.2)', 
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: 'white'
          }}>
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Введіть назву товару..."
            value={filters.searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
      </div>

      {/* Категорії */}
      <div className="mb-4">
        <label className="form-label fw-semibold text-white">
          <i className="bi bi-grid me-2"></i>Категорія
        </label>
        <select
          className="form-select"
          value={filters.category}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">🛍️ Всі категорії</option>
          {Object.entries(PRODUCT_CATEGORIES).map(([key, value]) => (
            <option key={key} value={key}>
              {getCategoryIcon(key)} {value}
            </option>
          ))}
        </select>
      </div>

      {/* Ціновий діапазон */}
      <div className="mb-4">
        <label className="form-label fw-semibold text-white">
          <i className="bi bi-currency-dollar me-2"></i>Ціна (грн)
        </label>
        <div className="row g-2">
          <div className="col-6">
            <input
              type="number"
              className="form-control"
              placeholder="Від"
              value={filters.priceRange.min}
              onChange={(e) => 
                handlePriceRangeChange(
                  parseInt(e.target.value) || 0, 
                  filters.priceRange.max
                )
              }
            />
          </div>
          <div className="col-6">
            <input
              type="number"
              className="form-control"
              placeholder="До"
              value={filters.priceRange.max}
              onChange={(e) => 
                handlePriceRangeChange(
                  filters.priceRange.min,
                  parseInt(e.target.value) || 100000
                )
              }
            />
          </div>
        </div>
        <div className="form-text text-white-50 mt-2">
          <i className="bi bi-info-circle me-1"></i>
          Від {filters.priceRange.min.toLocaleString()} до {filters.priceRange.max.toLocaleString()} грн
        </div>
      </div>

      {/* Швидкі фільтри по ціні */}
      <div className="mb-3">
        <label className="form-label fw-semibold text-white">
          <i className="bi bi-lightning me-2"></i>Швидкий вибір ціни
        </label>
        <div className="d-grid gap-2">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => handlePriceRangeChange(0, 5000)}
          >
            💰 До 5,000 грн
          </button>
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => handlePriceRangeChange(5000, 15000)}
          >
            💵 5,000 - 15,000 грн
          </button>
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => handlePriceRangeChange(15000, 50000)}
          >
            💸 15,000 - 50,000 грн
          </button>
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => handlePriceRangeChange(50000, 100000)}
          >
            🔥 Понад 50,000 грн
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;