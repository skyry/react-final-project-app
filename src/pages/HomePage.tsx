import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useAppDispatch} from '../app/hooks';
import {setFilters} from '../features/products/model/productsSlice';
import ProductList from '../features/products/components/ProductList';
import ProductFilters from '../features/products/components/ProductFilters';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Очищуємо фільтри на головній сторінці
    dispatch(setFilters({ 
      category: '',
      searchQuery: '',
      priceRange: { min: 0, max: 100000 }
    }));
  }, [dispatch]);

  return (
    <div className="container-fluid py-4">
      {/* Hero секція */}
      <div className="hero-section text-white rounded mb-5 p-5 fade-in">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="fw-bold mb-4 text-shadow">
                <span style={{
                  background: 'linear-gradient(45deg, #fff, #f0f8ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Комп'ютерні комплектуючі
                </span>
                <br />
                <span className="text-white">за найкращими цінами</span>
              </h1>
              <p className="lead mb-5 text-white-50" style={{fontSize: '1.3rem', lineHeight: '1.6'}}>
                Знайдіть все необхідне для збирання або модернізації вашого комп'ютера. 
                Якісні товари від провідних виробників з гарантією та швидкою доставкою.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3">
                <Link to="/catalog" className="btn btn-primary btn-lg px-5 py-3 fw-bold hover-scale">
                  <i className="bi bi-grid-3x3-gap me-2"></i>
                  🛍️ Переглянути каталог
                </Link>
                <Link to="/about" className="btn btn-outline-primary btn-lg px-5 py-3 fw-bold hover-scale">
                  <i className="bi bi-info-circle me-2"></i>
                  ℹ️ Дізнатися більше
                </Link>
              </div>
            </div>
            <div className="col-lg-6 text-center slide-in-right">
              <div className="position-relative">
                <i className="bi bi-pc-display-horizontal" style={{
                  fontSize: '12rem',
                  background: 'linear-gradient(45deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 4px 20px rgba(255,255,255,0.3))'
                }}></i>
                <div className="position-absolute top-50 start-50 translate-middle" style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  zIndex: -1
                }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Переваги */}
      <div className="container mb-5">
        <div className="row g-4">
          <div className="col-lg-3 col-md-6">
            <div className="glass-container p-4 text-center h-100 hover-lift scale-in">
              <div className="mb-4">
                <i className="bi bi-truck display-4 text-info"></i>
              </div>
              <h5 className="text-white fw-bold mb-3">🚚 Швидка доставка</h5>
              <p className="text-white-50 mb-0">Безкоштовна доставка від 1000 грн по всій Україні</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="glass-container p-4 text-center h-100 hover-lift scale-in" style={{animationDelay: '0.1s'}}>
              <div className="mb-4">
                <i className="bi bi-shield-check display-4 text-success"></i>
              </div>
              <h5 className="text-white fw-bold mb-3">🛡️ Гарантія якості</h5>
              <p className="text-white-50 mb-0">Офіційна гарантія на всі товари від виробника</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="glass-container p-4 text-center h-100 hover-lift scale-in" style={{animationDelay: '0.2s'}}>
              <div className="mb-4">
                <i className="bi bi-headset display-4 text-warning"></i>
              </div>
              <h5 className="text-white fw-bold mb-3">🎧 Підтримка 24/7</h5>
              <p className="text-white-50 mb-0">Консультації спеціалістів у будь-який час</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="glass-container p-4 text-center h-100 hover-lift scale-in" style={{animationDelay: '0.3s'}}>
              <div className="mb-4">
                <i className="bi bi-credit-card display-4 text-primary"></i>
              </div>
              <h5 className="text-white fw-bold mb-3">💳 Зручна оплата</h5>
              <p className="text-white-50 mb-0">Готівка, картка, розстрочка без переплат</p>
            </div>
          </div>
        </div>
      </div>

      {/* Популярні категорії */}
      <div className="container mb-5">
        <h2 className="text-white fw-bold mb-4 text-center">
          <i className="bi bi-star me-2"></i>
          ⭐ Популярні категорії
        </h2>
        <div className="row g-4">
          <div className="col-lg-3 col-md-6">
            <Link to="/catalog?category=processors" className="text-decoration-none">
              <div className="glass-container p-4 text-center h-100 hover-lift category-card">
                <div className="mb-3">
                  <i className="bi bi-cpu display-4 text-info"></i>
                </div>
                <h5 className="text-white fw-bold mb-2">🧠 Процесори</h5>
                <p className="text-white-50 mb-0">Intel, AMD та інші</p>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-6">
            <Link to="/catalog?category=graphics" className="text-decoration-none">
              <div className="glass-container p-4 text-center h-100 hover-lift category-card">
                <div className="mb-3">
                  <i className="bi bi-gpu-card display-4 text-success"></i>
                </div>
                <h5 className="text-white fw-bold mb-2">🎮 Відеокарти</h5>
                <p className="text-white-50 mb-0">NVIDIA RTX, AMD Radeon</p>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-6">
            <Link to="/catalog?category=memory" className="text-decoration-none">
              <div className="glass-container p-4 text-center h-100 hover-lift category-card">
                <div className="mb-3">
                  <i className="bi bi-memory display-4 text-warning"></i>
                </div>
                <h5 className="text-white fw-bold mb-2">💾 Пам'ять</h5>
                <p className="text-white-50 mb-0">DDR4, DDR5 модулі</p>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-6">
            <Link to="/catalog?category=storage" className="text-decoration-none">
              <div className="glass-container p-4 text-center h-100 hover-lift category-card">
                <div className="mb-3">
                  <i className="bi bi-device-ssd display-4 text-primary"></i>
                </div>
                <h5 className="text-white fw-bold mb-2">💿 Накопичувачі</h5>
                <p className="text-white-50 mb-0">SSD, HDD диски</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Каталог товарів */}
      <div id="catalog">
        <div className="container mb-4">
          <h2 className="text-white fw-bold mb-4 text-center">
            <i className="bi bi-shop me-2"></i>
            🛍️ Каталог товарів
          </h2>
        </div>
        
        <div className="container-fluid">
          <div className="row">
            {/* Фільтри */}
            <div className="col-lg-3 col-md-4 mb-4">
              <ProductFilters />
            </div>
            
            {/* Список товарів */}
            <div className="col-lg-9 col-md-8">
              <ProductList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;