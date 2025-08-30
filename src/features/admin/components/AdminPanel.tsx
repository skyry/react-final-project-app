import React, {useState, useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '../../../app/hooks';
import {selectIsAdmin} from '../../auth/model/authSlice';
import {createProduct} from '../../products/model/productsSlice';
import ProductEditModal from './ProductEditModal';
import type {Product} from '../../../types';

const AdminPanel: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const isAdmin = useAppSelector(selectIsAdmin);
  const dispatch = useAppDispatch();

  // Закриваємо модальне вікно створення товару при втраті адміністративних прав
  useEffect(() => {
    if (!isAdmin && showCreateModal) {
      setShowCreateModal(false);
    }
  }, [isAdmin, showCreateModal]);

  const handleCreateProduct = async (newProduct: Omit<Product, 'id'>) => {
    setLoading(true);
    try {
      await dispatch(createProduct(newProduct)).unwrap();
      // Затримка перед закриттям модалки для уникнення DOM конфліктів
      setTimeout(() => {
        setShowCreateModal(false);
      }, 300);
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Помилка при створенні товару');
      setShowCreateModal(false);
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <div className="position-fixed bottom-0 end-0 m-4" style={{ zIndex: 1030 }}>
        <button
          className="btn rounded-circle shadow-lg d-flex align-items-center justify-content-center"
          onClick={() => setShowCreateModal(true)}
          disabled={loading}
          style={{
            width: '70px',
            height: '70px',
            background: 'linear-gradient(135deg, rgba(40, 167, 69, 0.9), rgba(32, 201, 151, 0.9))',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 32px rgba(40, 167, 69, 0.4)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(40, 167, 69, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(40, 167, 69, 0.4)';
          }}
          title="Додати новий товар"
        >
          {loading ? (
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <i className="bi bi-plus-lg"></i>
          )}
        </button>
      </div>

      {/* Модальне вікно створення товару */}
      {showCreateModal && (
        <ProductEditModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSave={handleCreateProduct}
        />
      )}
    </>
  );
};

export default AdminPanel;