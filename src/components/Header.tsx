import React, {useState, useRef, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import CartIcon from '../features/cart/components/CartIcon';
import LoginForm from '../features/auth/components/LoginForm';
import UserProfile from '../features/auth/components/UserProfile';
import {useAppSelector} from '../app/hooks';
import {selectIsAuthenticated, selectCurrentUser, selectIsAdmin} from '../features/auth/model/authSlice';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectCurrentUser);
  const isAdmin = useAppSelector(selectIsAdmin);

  const handleCategoryClick = (category: string) => {
    navigate(`/catalog?category=${category}`);
    closeNavbarMenu();
  };

  const closeNavbarMenu = () => {
    const navbarCollapse = document.getElementById('navbarNav');
    const navbarToggler = document.querySelector('.navbar-toggler') as HTMLButtonElement;
    
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {

      if (navbarToggler) {
        navbarToggler.click();
      }
    }
  };;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowUserProfile(false);
      }
    };

    if (typeof document !== 'undefined') {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  return (
    <header className="border-0 sticky-top">
      <nav className="navbar navbar-expand-lg py-1">
        <div className="container-fluid px-2">
          {/* Лого */}
          <Link 
            className="navbar-brand fw-bold d-flex align-items-center" 
            to="/"
            onClick={closeNavbarMenu}
          >
            <i className="bi bi-pc-display-horizontal me-1 fs-5" style={{
              background: 'linear-gradient(45deg, #fff, #f0f0f0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}></i>
            <span style={{ fontSize: '2rem' }}>SerjStore</span>
          </Link>

          {/* Навбар для мобільних пристроїв */}
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Навігаційне меню */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link 
                  className="nav-link active fw-semibold" 
                  to="/" 
                  style={{ fontSize: '1rem' }}
                  onClick={closeNavbarMenu}
                >
                  <i className="bi bi-house-fill me-1"></i>
                  Головна
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle fw-semibold"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ fontSize: '1rem' }}
                >
                  <i className="bi bi-grid-3x3-gap me-1"></i>
                  Категорії
                </a>
                <ul className="dropdown-menu border-0 shadow-lg" style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '8px',
                  fontSize: '0.8rem'
                }}>
                  <li><button className="dropdown-item py-1 px-2" onClick={() => handleCategoryClick('processors')}>
                    <i className="bi bi-cpu me-1 text-primary"></i>Процесори
                  </button></li>
                  <li><button className="dropdown-item py-1 px-2" onClick={() => handleCategoryClick('graphics')}>
                    <i className="bi bi-display me-1 text-success"></i>Відеокарти
                  </button></li>
                  <li><button className="dropdown-item py-1 px-2" onClick={() => handleCategoryClick('memory')}>
                    <i className="bi bi-memory me-1 text-info"></i>Оперативна пам'ять
                  </button></li>
                  <li><button className="dropdown-item py-1 px-2" onClick={() => handleCategoryClick('storage')}>
                    <i className="bi bi-hdd me-1 text-warning"></i>Накопичувачі
                  </button></li>
                  <li><button className="dropdown-item py-1 px-2" onClick={() => handleCategoryClick('motherboards')}>
                    <i className="bi bi-motherboard me-1 text-danger"></i>Материнські плати
                  </button></li>
                  <li><button className="dropdown-item py-1 px-2" onClick={() => handleCategoryClick('power')}>
                    <i className="bi bi-lightning me-1 text-success"></i>Блоки живлення
                  </button></li>
                  <li><button className="dropdown-item py-1 px-2" onClick={() => handleCategoryClick('cases')}>
                    <i className="bi bi-pc me-1 text-secondary"></i>Корпуси
                  </button></li>
                  <li><button className="dropdown-item py-1 px-2" onClick={() => handleCategoryClick('cooling')}>
                    <i className="bi bi-snow me-1 text-info"></i>Охолодження
                  </button></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link 
                  className="nav-link fw-semibold" 
                  to="/catalog" 
                  style={{ fontSize: '1rem' }}
                  onClick={closeNavbarMenu}
                >
                  <i className="bi bi-grid-3x3-gap me-1"></i>
                  Каталог
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className="nav-link fw-semibold" 
                  to="/about" 
                  style={{ fontSize: '1rem' }}
                  onClick={closeNavbarMenu}
                >
                  <i className="bi bi-info-circle me-1"></i>
                  Про нас
                </Link>
              </li>
            </ul>

            {/* Авторизація та кошик */}
            <div className="d-flex align-items-center gap-2">
              {isAuthenticated ? (
                <div className="position-relative" ref={profileRef}>
                  <button
                    className="btn p-0 border-0 bg-transparent"
                    onClick={() => setShowUserProfile(!showUserProfile)}
                  >
                    <div className="d-flex align-items-center">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center me-2"
                        style={{
                          width: '32px',
                          height: '32px',
                          background: isAdmin 
                            ? 'linear-gradient(135deg, #ffd700, #ffed4e)' 
                            : 'linear-gradient(135deg, #007bff, #0056b3)',
                          color: isAdmin ? '#000' : '#fff',
                          fontSize: '14px'
                        }}
                      >
                        {isAdmin ? '👑' : '👤'}
                      </div>
                      <span className="text-white fw-semibold small d-none d-md-inline">
                        {user?.name || 'Користувач'}
                      </span>
                      <i className="bi bi-chevron-down text-white ms-1 small"></i>
                    </div>
                  </button>
                  
                  {showUserProfile && (
                    <UserProfile onClose={() => setShowUserProfile(false)} />
                  )}
                </div>
              ) : (
                <button
                  className="btn btn-outline-light btn-sm d-flex align-items-center"
                  onClick={() => setShowLoginForm(true)}
                  style={{
                    fontSize: '0.8rem',
                    padding: '0.375rem 0.75rem',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <i className="bi bi-person-circle me-1"></i>
                  <span className="d-none d-sm-inline">Увійти</span>
                </button>
              )}
              
              <CartIcon />
            </div>
          </div>
        </div>
      </nav>
      
      {/* Модальне вікно входу */}
      {showLoginForm && (
        <LoginForm onClose={() => setShowLoginForm(false)} />
      )}
    </header>
  );
};

export default Header;