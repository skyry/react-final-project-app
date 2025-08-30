import React, {useCallback, useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {addToCart, selectIsProductInCart} from '../../cart/model/cartSlice';
import {selectIsAdmin} from '../../auth/model/authSlice';
import {updateProduct, deleteProduct} from '../model/productsSlice';
import ProductEditModal from '../../admin/components/ProductEditModal';
import type {ProductCardProps, Product} from '../../../types';

const DEFAULT_IMAGE_URL = 'https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=400&h=300&fit=crop';

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const selectIsInCart = useCallback((state) => selectIsProductInCart(state, product.id), [product.id]);
  const isInCart = useAppSelector(selectIsInCart);
  const isAdmin = useAppSelector(selectIsAdmin);

  // Закриваємо модальне вікно редагування при втраті адмін прав
  useEffect(() => {
    if (!isAdmin && showEditModal) {
      setShowEditModal(false);
    }
  }, [isAdmin, showEditModal]);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('uk-UA', {
      style: 'currency',
      currency: 'UAH',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = (): void => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  const handleEditProduct = async (updatedProduct: Product | Omit<Product, 'id'>) => {
    setLoading(true);
    try {
      // При редагуванні завжди передаємо існуючий товар
      if ('id' in updatedProduct) {
        await dispatch(updateProduct({ 
          id: product.id, 
          productData: { ...updatedProduct, id: product.id } 
        })).unwrap();
      }
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Помилка при оновленні товару');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!window.confirm('Ви впевнені, що хочете видалити цей товар?')) {
      return;
    }

    setLoading(true);
    try {
      await dispatch(deleteProduct(product.id)).unwrap();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Помилка при видаленні товару');
    } finally {
      setLoading(false);
    }
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="card product-card h-100">
      <div className="position-relative overflow-hidden">
        <img
          src={product.image || DEFAULT_IMAGE_URL}
          className="card-img-top"
          alt={product.name}
          style={{ height: '220px', objectFit: 'cover' }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== DEFAULT_IMAGE_URL) {
              target.src = DEFAULT_IMAGE_URL;
            }
          }}
        />
        
        <div className="position-absolute top-0 start-0 w-100 h-100" 
             style={{
               background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 30%)',
               pointerEvents: 'none'
             }}>
        </div>
        
        {/* Бейджі товарів */}
        <div className="position-absolute top-0 start-0 m-3">
          {discountPercentage > 0 && (
            <span className="badge text-white fw-bold px-3 py-2" 
                  style={{
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    borderRadius: '12px',
                    fontSize: '0.75rem'
                  }}>
              🔥 -{discountPercentage}%
            </span>
          )}
        </div>

        {/* Статус наявності */}
        <div className="position-absolute top-0 end-0 m-3">
          {product.inStock ? (
            <span className="badge text-white fw-bold px-3 py-2" 
                  style={{
                    background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                    borderRadius: '12px',
                    fontSize: '0.75rem'
                  }}>
              ✅ В наявності
            </span>
          ) : (
            <span className="badge text-white fw-bold px-3 py-2" 
                  style={{
                    background: 'linear-gradient(135deg, #9e9e9e 0%, #757575 100%)',
                    borderRadius: '12px',
                    fontSize: '0.75rem'
                  }}>
              ❌ Немає
            </span>
          )}
        </div>

        {/* Кнопки адміністратора */}
        {isAdmin && (
          <div className="position-absolute bottom-0 end-0 m-3">
            <div className="d-flex gap-2">
              <button
                className="btn btn-sm"
                onClick={() => setShowEditModal(true)}
                disabled={loading}
                style={{
                  background: 'rgba(255, 193, 7, 0.9)',
                  border: 'none',
                  color: 'white',
                  borderRadius: '8px',
                  backdropFilter: 'blur(10px)'
                }}
                title="Редагувати товар"
              >
                <i className="bi bi-pencil"></i>
              </button>
              <button
                className="btn btn-sm"
                onClick={handleDeleteProduct}
                disabled={loading}
                style={{
                  background: 'rgba(220, 53, 69, 0.9)',
                  border: 'none',
                  color: 'white',
                  borderRadius: '8px',
                  backdropFilter: 'blur(10px)'
                }}
                title="Видалити товар"
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : (
                  <i className="bi bi-trash"></i>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="card-body d-flex flex-column p-4">
        <div className="mb-2">
          <small className="text-muted fw-semibold text-uppercase" style={{letterSpacing: '0.5px'}}>
            {product.brand}
          </small>
        </div>
        
        <h6 className="card-title fw-bold mb-3" style={{lineHeight: '1.4'}}>
          {product.name}
        </h6>
        
        <p className="card-text text-muted small flex-grow-1 mb-4" style={{lineHeight: '1.5'}}>
          {product.description && product.description.length > 120 
            ? `${product.description.substring(0, 120)}...` 
            : (product.description || 'Опис відсутній')
          }
        </p>

        <div className="mt-auto">
          {/* Ціна */}
          <div className="mb-4 text-center">
            {discountPercentage > 0 && product.originalPrice && (
              <div className="text-muted text-decoration-line-through mb-1" style={{fontSize: '0.9rem'}}>
                {formatPrice(product.originalPrice)}
              </div>
            )}
            <div className="h4 fw-bold mb-0" 
                 style={{
                   background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                   WebkitBackgroundClip: 'text',
                   WebkitTextFillColor: 'transparent',
                   backgroundClip: 'text'
                 }}>
              {formatPrice(product.price)}
            </div>
          </div>

          {/* Кнопки */}
          <div className="d-grid gap-2">
            <button
              className={`btn fw-bold py-2 ${isInCart ? 'btn-success' : 'btn-primary'}`}
              onClick={handleAddToCart}
              disabled={!product.inStock}
              style={{
                borderRadius: '12px',
                fontSize: '0.85rem',
                letterSpacing: '0.3px'
              }}
            >
              <i className={`bi ${isInCart ? 'bi-check-circle-fill' : 'bi-cart-plus'} me-1`}></i>
              {isInCart ? 'В кошику' : 'Додати до кошика'}
            </button>
          </div>

          {/* Кількість в наявності */}
          {product.inStock && (
            <div className="text-center mt-2 p-1" 
                 style={{
                   background: 'rgba(255, 255, 255, 0.1)',
                   borderRadius: '6px',
                   backdropFilter: 'blur(10px)'
                 }}>
              <small className="text-muted fw-semibold" style={{ fontSize: '0.75rem' }}>
                <i className="bi bi-box me-1"></i>
                В наявності: <span className="fw-bold">{product.stockQuantity}</span> шт.
              </small>
            </div>
          )}
        </div>
      </div>
      
      {/* Модальне вікно редагування */}
      {showEditModal && (
        <ProductEditModal
          product={product}
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={handleEditProduct}
        />
      )}
    </div>
  );
};

export default ProductCard;