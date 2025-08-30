import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {toggleCart,selectCartTotalItems,selectCartTotalPrice,selectCartIsOpen,setCartOpen,clearCart} from '../model/cartSlice';

const CartIcon: React.FC = () => {
  const dispatch = useAppDispatch();
  const totalItems = useAppSelector(selectCartTotalItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);
  const isOpen = useAppSelector(selectCartIsOpen);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('uk-UA', {
      style: 'currency',
      currency: 'UAH',
    }).format(price);
  };

  const handleToggleCart = (): void => {
    dispatch(toggleCart());
  };

  const handleCloseCart = (): void => {
    dispatch(setCartOpen(false));
  };

  const handleClearCart = (): void => {
    dispatch(clearCart());
  };

  return (
    <>
      <button
        className="btn position-relative"
        onClick={handleToggleCart}
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '8px',
          color: 'white',
          transition: 'all 0.3s ease',
          padding: '0.4rem 0.6rem'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
        aria-label="Кошик"
      >
        <i className="bi bi-cart3" style={{ fontSize: '0.9rem' }}></i>
        {totalItems > 0 && (
          <span 
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
            style={{ 
              fontSize: '0.5rem', 
              padding: '0.15rem 0.3rem',
              background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              fontWeight: 'bold',
              minWidth: '16px'
            }}
          >
            {totalItems}
            <span className="visually-hidden">товарів у кошику</span>
          </span>
        )}
        <span className="ms-1 d-none d-xl-inline" style={{ fontSize: '0.7rem' }}>
          {totalItems > 0 ? formatPrice(totalPrice) : 'Кошик'}
        </span>
      </button>

      {isOpen && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-25"
          style={{ zIndex: 1040 }}
          onClick={handleCloseCart}
        />
      )}

      <div 
        className={`offcanvas offcanvas-end ${isOpen ? 'show' : ''}`}
        style={{ 
          visibility: isOpen ? 'visible' : 'hidden',
          zIndex: 1045,
          width: '280px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRight: 'none'
        }}
        tabIndex={-1}
      >
        <div className="offcanvas-header border-bottom border-white border-opacity-25" style={{ padding: '0.75rem' }}>
          <h6 className="offcanvas-title mb-0 text-white fw-bold">
            <i className="bi bi-cart3 me-2"></i>Кошик
            {totalItems > 0 && (
              <span 
                className="badge ms-2"
                style={{ 
                  background: 'linear-gradient(135deg, #007bff, #0056b3)',
                  fontSize: '0.6rem',
                  padding: '0.2rem 0.4rem'
                }}
              >
                {totalItems}
              </span>
            )}
          </h6>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={handleCloseCart}
            aria-label="Закрити"
          ></button>
        </div>
        
        <div className="offcanvas-body" style={{ padding: '0.75rem' }}>
          {totalItems === 0 ? (
            <div className="text-center">
              <i className="bi bi-cart-x fs-2 text-white-50 mb-2"></i>
              <p className="text-white-50 mb-1 small">Кошик порожній</p>
            </div>
          ) : (
            <>
              <div className="d-grid gap-2 mb-2">
                <a 
                  href="/cart" 
                  className="btn btn-sm" 
                  onClick={handleCloseCart}
                  style={{
                    background: 'linear-gradient(135deg, #007bff, #0056b3)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.5rem',
                    color: 'white',
                    fontSize: '0.8rem'
                  }}
                >
                  <i className="bi bi-eye me-1"></i>Переглянути кошик
                </a>
                <button 
                  className="btn btn-sm"
                  onClick={handleClearCart}
                  style={{
                    background: 'rgba(220, 53, 69, 0.8)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.4rem',
                    color: 'white',
                    fontSize: '0.75rem'
                  }}
                >
                  <i className="bi bi-trash me-1"></i>Очистити
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartIcon;