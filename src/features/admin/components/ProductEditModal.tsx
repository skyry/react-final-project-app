import React, {useState, useEffect} from 'react';
import {PRODUCT_CATEGORIES} from '../../../shared/config/constants';
import type {Product} from '../../../types';

const DEFAULT_IMAGE_URL = 'https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=400&h=300&fit=crop';

interface ProductEditModalProps {
  product?: Product;
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id'> | Product) => void;
}

const ProductEditModal: React.FC<ProductEditModalProps> = ({
  product,
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    originalPrice: 0,
    category: '',
    brand: '',
    image: '',
    stockQuantity: 0,
    discount: 0,
    inStock: true,
    isNew: false
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description || '',
        price: product.price,
        originalPrice: product.originalPrice || 0,
        category: product.category,
        brand: product.brand || '',
        image: product.image || '',
        stockQuantity: product.stockQuantity || 0,
        discount: product.discount || 0,
        inStock: product.inStock !== false,
        isNew: product.isNew || false
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: 0,
        originalPrice: 0,
        category: '',
        brand: '',
        image: '',
        stockQuantity: 0,
        discount: 0,
        inStock: true,
        isNew: false
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Підготовка даних з дефолтною картинкою якщо поле порожнє
      const productData = {
        ...formData,
        image: formData.image.trim() || DEFAULT_IMAGE_URL
      };

      if (product) {
        // Редагування існуючого товару
        await onSave({ ...product, ...productData });
      } else {
        // Створення нового товару
        await onSave({
          ...productData,
          createdAt: new Date().toISOString()
        });
      }
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Помилка при збереженні товару');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content" style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '20px'
        }}>
          <div className="modal-header border-0">
            <h5 className="modal-title text-white fw-bold">
              <i className="bi bi-box me-2"></i>
              {product ? 'Редагувати товар' : 'Додати новий товар'}
            </h5>
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              onClick={onClose}
              disabled={loading}
            ></button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="name" className="form-label text-white fw-semibold">
                    <i className="bi bi-tag me-2"></i>Назва товару
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: 'white'
                    }}
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="price" className="form-label text-white fw-semibold">
                    <i className="bi bi-currency-exchange me-2"></i>Ціна (грн)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    required
                    placeholder="0.00"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: 'white'
                    }}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="originalPrice" className="form-label text-white fw-semibold">
                    <i className="bi bi-tag me-2"></i>Оригінальна ціна (грн)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="originalPrice"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: 'white'
                    }}
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="discount" className="form-label text-white fw-semibold">
                    <i className="bi bi-percent me-2"></i>Знижка (грн)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="discount"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: 'white'
                    }}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="category" className="form-label text-white fw-semibold">
                    <i className="bi bi-grid me-2"></i>Категорія
                  </label>
                  <select
                    className="form-select"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: 'white'
                    }}
                  >
                    <option value="">Оберіть категорію</option>
                    {Object.entries(PRODUCT_CATEGORIES).map(([key, value]) => (
                      <option key={key} value={key} style={{ background: '#333', color: 'white' }}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="image" className="form-label text-white fw-semibold">
                    <i className="bi bi-image me-2"></i>URL зображення
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: 'white'
                    }}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="brand" className="form-label text-white fw-semibold">
                    <i className="bi bi-award me-2"></i>Бренд
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: 'white'
                    }}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="stockQuantity" className="form-label text-white fw-semibold">
                    <i className="bi bi-boxes me-2"></i>Кількість на складі
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="stockQuantity"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="0"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: 'white'
                    }}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label text-white fw-semibold">
                  <i className="bi bi-text-paragraph me-2"></i>Опис товару
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: 'white'
                  }}
                ></textarea>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inStock"
                      name="inStock"
                      checked={formData.inStock}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label text-white" htmlFor="inStock">
                      <i className="bi bi-check-circle me-2"></i>В наявності
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn"
                onClick={onClose}
                disabled={loading}
                style={{
                  background: 'rgba(108, 117, 125, 0.8)',
                  border: 'none',
                  color: 'white',
                  borderRadius: '10px'
                }}
              >
                Скасувати
              </button>
              <button
                type="submit"
                className="btn"
                disabled={loading}
                style={{
                  background: 'linear-gradient(135deg, #28a745, #20c997)',
                  border: 'none',
                  color: 'white',
                  borderRadius: '10px'
                }}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Збереження...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-lg me-2"></i>
                    {product ? 'Зберегти зміни' : 'Створити товар'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductEditModal;