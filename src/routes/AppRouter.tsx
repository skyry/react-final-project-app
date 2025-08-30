import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import CartPage from '../pages/CartPage';
import AboutPage from '../pages/AboutPage';
import CatalogPage from '../pages/CatalogPage';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={
            <div className="container text-center py-5">
              <h1 className="display-1">404</h1>
              <h2>Сторінка не знайдена</h2>
              <p className="text-muted">Вибачте, запитувана сторінка не існує.</p>
              <a href="/" className="btn btn-primary">
                <i className="bi bi-house"></i> На головну
              </a>
            </div>
          } />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default AppRouter;