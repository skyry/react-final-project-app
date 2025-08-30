import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-2" style={{
      background: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div className="container py-3 px-3 px-md-0">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-2">
            <h6 className="text-white fw-bold mb-2">
              <i className="bi bi-pc-display-horizontal me-2" style={{
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}></i>
              SerjStore
            </h6>
            <p className="text-white-50 mb-3 small" style={{lineHeight: '1.4'}}>
              Ваш надійний партнер у світі комп'ютерних технологій. 
              Якісні комплектуючі за найкращими цінами.
            </p>
          </div>

          <div className="col-lg-2 col-md-6 mb-2">
            <h6 className="text-white fw-semibold mb-2 small">
              <i className="bi bi-compass me-2 text-info"></i>
              Навігація
            </h6>
            <ul className="list-unstyled">
              <li className="mb-1"><a href="/" className="text-white-50 text-decoration-none small" style={{transition: 'color 0.3s ease'}}>🏠 Головна</a></li>
              <li className="mb-1"><a href="/catalog" className="text-white-50 text-decoration-none small" style={{transition: 'color 0.3s ease'}}>📦 Каталог</a></li>
              <li className="mb-1"><a href="/about" className="text-white-50 text-decoration-none small" style={{transition: 'color 0.3s ease'}}>ℹ️ Про нас</a></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-3">
            <h6 className="text-white fw-semibold mb-2 small">
              <i className="bi bi-envelope me-2 text-warning"></i>
              Контакти
            </h6>
            <ul className="list-unstyled text-white-50 small">
              <li className="mb-2 d-flex align-items-start">
                <i className="bi bi-geo-alt me-2 mt-1 text-info"></i>
                <span>м. Київ, вул. Окіпної, 3</span>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <i className="bi bi-telephone me-2 text-success"></i>
                <span>+380 (50) 123-45-67</span>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <i className="bi bi-envelope me-2 text-warning"></i>
                <span>info@serjstore.ua</span>
              </li>
              <li className="mb-2 d-flex align-items-start">
                <i className="bi bi-clock me-2 mt-1 text-info"></i>
                <span>Пн-Пт: 9:00-18:00<br />Сб: 10:00-16:00</span>
              </li>
            </ul>
          </div>
        </div>

        <hr style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
          border: 'none',
          height: '1px',
          margin: '0 0 0 0'
        }} />

        <div className="row align-items-center">
          <div className="col-md-3">
            <p className="text-white-50 mb-0 fw-semibold small">
              © 2024 SerjStore. Всі права захищені.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;