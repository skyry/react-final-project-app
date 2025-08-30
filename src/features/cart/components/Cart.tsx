import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {
  selectCartItems,
  selectCartTotalPrice,
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../model/cartSlice';
import type {CartItemProps} from '../../../types';

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const {product, quantity} = item;

  const handleQuantityChange = (newQuantity: number): void => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(updateQuantity({ productId: product.id, quantity: newQuantity }));
    }
  };

  const handleRemove = (): void => {
    dispatch(removeFromCart(product.id));
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('uk-UA', {
      style: 'currency',
      currency: 'UAH',
    }).format(price);
  };

  return (
    <div 
      className="card mb-3"
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '15px'
      }}
    >
      <div className="card-body p-3">
        <div className="row align-items-center">
          <div className="col-2">
            <img
              src={product.image || '/placeholder-product.jpg'}
              alt={product.name}
              className="img-fluid rounded"
              style={{ maxHeight: '80px', objectFit: 'cover' }}
            />
          </div>
          
          <div className="col-4">
            <h6 className="card-title mb-1 text-white fw-semibold">{product.name}</h6>
            <small className="text-white-50">{product.category}</small>
          </div>
          
          <div className="col-2">
            <div className="fw-semibold text-white">{formatPrice(product.price)}</div>
          </div>
          
          <div className="col-3">
            <div className="input-group input-group-sm">
              <button
                className="btn"
                type="button"
                onClick={() => handleQuantityChange(quantity - 1)}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: 'white'
                }}
              >
                <i className="bi bi-dash"></i>
              </button>
              <input
                type="number"
                className="form-control text-center"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                min="1"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: 'white'
                }}
              />
              <button
                className="btn"
                type="button"
                onClick={() => handleQuantityChange(quantity + 1)}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: 'white'
                }}
              >
                <i className="bi bi-plus"></i>
              </button>
            </div>
          </div>
          
          <div className="col-1">
            <button
              className="btn btn-sm"
              onClick={handleRemove}
              title="Видалити з кошика"
              style={{
                background: 'linear-gradient(135deg, #dc3545, #c82333)',
                border: 'none',
                color: 'white',
                borderRadius: '8px'
              }}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
        
        <div className="row mt-3 pt-2 border-top border-white border-opacity-25">
          <div className="col-12 text-end">
            <strong className="text-white fs-6">Сума: {formatPrice(product.price * quantity)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('uk-UA', {
      style: 'currency',
      currency: 'UAH',
    }).format(price);
  };

  const handleClearCart = (): void => {
    if (window.confirm('Ви впевнені, що хочете очистити кошик?')) {
      dispatch(clearCart());
    }
  };

  const handleCheckout = (): void => {
    alert('Заказ оформлено!');
    dispatch(clearCart());
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mt-4">
        <div className="text-center py-5">
          <i className="bi bi-cart-x display-1 text-white-50"></i>
          <h3 className="text-white mt-3">Ваш кошик порожній</h3>
          <p className="text-white-50">Додайте товари з каталогу</p>
          <a href="/catalog" className="btn btn-primary mt-3" style={{
            background: 'linear-gradient(135deg, #007bff, #0056b3)',
            border: 'none',
            borderRadius: '10px',
            padding: '0.75rem 2rem'
          }}>
            <i className="bi bi-grid-3x3-gap me-2"></i>
            Перейти до каталогу
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-white fw-bold">
              <i className="bi bi-cart3 me-2"></i> Кошик
              <span 
                className="badge ms-2"
                style={{
                  background: 'linear-gradient(135deg, #007bff, #0056b3)',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '10px'
                }}
              >
                {cartItems.length}
              </span>
            </h2>
            <button
              className="btn"
              onClick={handleClearCart}
              style={{
                background: 'linear-gradient(135deg, #dc3545, #c82333)',
                border: 'none',
                color: 'white',
                borderRadius: '10px',
                padding: '0.5rem 1rem'
              }}
            >
              <i className="bi bi-trash me-2"></i> Очистити кошик
            </button>
          </div>

          {cartItems.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </div>

        <div className="col-lg-4">
          <div 
            className="card sticky-top" 
            style={{ 
              top: '20px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '20px'
            }}
          >
            <div className="card-header border-0" style={{ background: 'transparent' }}>
              <h5 className="mb-0 text-white fw-bold">
                <i className="bi bi-receipt me-2"></i> Підсумок замовлення
              </h5>
            </div>
            <div className="card-body"
              style={{ background: 'transparent' }}
            >
              <div className="d-flex justify-content-between mb-3">
                <span className="text-white-50">Товарів:</span>
                <span className="text-white fw-semibold">{cartItems.reduce((total, item) => total + item.quantity, 0)} шт.</span>
              </div>
              
              <div className="d-flex justify-content-between mb-3">
                <span className="text-white-50">Вартість товарів:</span>
                <span className="text-white fw-semibold">{formatPrice(totalPrice)}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-3">
                <span className="text-white-50">Доставка:</span>
                <span className="text-success fw-semibold">Безкоштовно</span>
              </div>
              
              <hr style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                border: 'none',
                height: '1px'
              }} />
              
              <div className="d-flex justify-content-between mb-4">
                <strong className="text-white fs-5">До сплати:</strong>
                <strong className="fs-4 text-white">{formatPrice(totalPrice)}</strong>
              </div>
              
              <div className="d-grid gap-3 mt-4">
                <button
                  className="btn btn-lg"
                  onClick={handleCheckout}
                  style={{
                    background: 'linear-gradient(135deg, #28a745, #20c997)',
                    border: 'none',
                    color: 'white',
                    borderRadius: '12px',
                    padding: '1rem',
                    fontWeight: 'bold'
                  }}
                >
                  <i className="bi bi-credit-card me-2"></i> Оформити замовлення
                </button>
                <a 
                  href="/catalog" 
                  className="btn"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    borderRadius: '10px',
                    padding: '0.75rem'
                  }}
                >
                  <i className="bi bi-arrow-left me-2"></i> Продовжити покупки
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;