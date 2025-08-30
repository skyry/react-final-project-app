import React, {useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import {useAppDispatch} from '../app/hooks';
import {setFilters} from '../features/products/model/productsSlice';
import ProductList from '../features/products/components/ProductList';
import ProductFilters from '../features/products/components/ProductFilters';

const CatalogPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const category = searchParams.get('category') || '';
    const search = searchParams.get('search') || '';

    // Встановлюємо фільтри відповідно до URL параметрів
    dispatch(setFilters({ 
      category,
      searchQuery: search
    }));
  }, [searchParams, dispatch]);

  const getCategoryName = (categoryKey: string): string => {
    const categoryNames: Record<string, string> = {
      processors: 'Процесори',
      graphics: 'Відеокарти',
      memory: 'Оперативна пам\'ять',
      storage: 'Накопичувачі',
      motherboards: 'Материнські плати',
      power: 'Блоки живлення',
      cases: 'Корпуси',
      cooling: 'Охолодження'
    };
    return categoryNames[categoryKey] || 'Всі товари';
  };

  const currentCategory = searchParams.get('category') || '';

  return (
    <div className="container py-4">
      {/* Hero секція каталогу */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="glass-card text-center p-4 mb-4">
            <h1 className="display-5 fw-bold mb-3 glass-text">
              <i className="bi bi-grid-3x3-gap me-3"></i>
              {currentCategory ? getCategoryName(currentCategory) : 'Каталог товарів'}
            </h1>
            <p className="lead glass-text mb-0">
              {currentCategory 
                ? `Перегляд товарів у категорії: ${getCategoryName(currentCategory)}`
                : 'Широкий асортимент комп\'ютерних комплектуючих від провідних виробників'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Основний контент */}
      <div className="row">
        {/* Фільтри */}
        <div className="col-lg-3 mb-4">
          <div className="glass-card p-3">
            <h5 className="fw-bold mb-3 glass-text">
              <i className="bi bi-funnel me-2"></i>
              Фільтри
            </h5>
            <ProductFilters />
          </div>
        </div>

        {/* Список товарів */}
        <div className="col-lg-9">
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;