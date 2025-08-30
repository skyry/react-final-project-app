import React, {useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {loginUser, clearError, selectAuthLoading, selectAuthError} from '../model/authSlice';

interface LoginFormProps {onClose: () => void;}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const [isMobile, setIsMobile] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('keydown', handleEscape);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(result)) {
      onClose();
    }
  };

  const fillDemoCredentials = (role: 'admin' | 'user') => {
    if (role === 'admin') {
      setFormData({
        email: 'admin@serjstore.ua',
        password: 'admin123'
      });
    } else {
      setFormData({
        email: 'user@google.com',
        password: 'user123'
      });
    }
  };

  return (
    <div className="modal show d-block login-modal" onClick={handleBackdropClick}>
      <div className="modal-dialog modal-dialog-centered login-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content login-modal-content">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title text-white fw-bold" style={{ fontSize: isMobile ? '1.1rem' : '1.25rem' }}>
              <i className="bi bi-person-circle me-2"></i>
              Вхід в систему
            </h5>
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              onClick={onClose}
              style={{ fontSize: isMobile ? '0.9rem' : '1rem' }}
            ></button>
          </div>
          <div className="modal-body" style={{ padding: isMobile ? '1rem' : '1.5rem' }}>
            {error && (
              <div className="alert alert-danger" role="alert" style={{ fontSize: isMobile ? '0.85rem' : '0.9rem' }}>
                <i className="bi bi-exclamation-triangle me-2"></i>
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-white fw-semibold" style={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>
                  <i className="bi bi-envelope me-2"></i>
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  autoComplete="email"
                  required
                  style={{ 
                    fontSize: isMobile ? '16px' : '14px',
                    padding: isMobile ? '12px 16px' : '8px 12px'
                  }}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label text-white fw-semibold" style={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>
                  <i className="bi bi-lock me-2"></i>
                  Пароль
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Введіть пароль"
                  autoComplete="current-password"
                  required
                  style={{ 
                    fontSize: isMobile ? '16px' : '14px',
                    padding: isMobile ? '12px 16px' : '8px 12px'
                  }}
                />
              </div>
              
              <div className="d-grid gap-2 mb-3">
                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg"
                  disabled={loading}
                  style={{ 
                    padding: isMobile ? '12px 20px' : '10px 16px',
                    fontSize: isMobile ? '1rem' : '1.1rem'
                  }}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Заходимо...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Увійти
                    </>
                  )}
                </button>
              </div>
            </form>

            <hr style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              border: 'none',
              height: '1px'
            }} />

            <div className="text-center">
              <p className="text-white-50 mb-3 small" style={{ fontSize: isMobile ? '0.8rem' : '0.85rem' }}>
                Демо акаунти для тестування:
              </p>
              <div className={`d-flex gap-2 justify-content-center ${isMobile ? 'flex-column' : ''}`}>
                <button 
                  type="button"
                  className="btn btn-outline-warning btn-sm"
                  onClick={() => fillDemoCredentials('admin')}
                  style={{ 
                    padding: isMobile ? '8px 12px' : '6px 12px',
                    fontSize: isMobile ? '0.85rem' : '0.8rem',
                    width: isMobile ? '100%' : 'auto'
                  }}
                >
                  👑 Адмін
                </button>
                <button 
                  type="button"
                  className="btn btn-outline-info btn-sm"
                  onClick={() => fillDemoCredentials('user')}
                  style={{ 
                    padding: isMobile ? '8px 12px' : '6px 12px',
                    fontSize: isMobile ? '0.85rem' : '0.8rem',
                    width: isMobile ? '100%' : 'auto',
                    marginTop: isMobile ? '0.5rem' : '0'
                  }}
                >
                  👤 Користувач
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;