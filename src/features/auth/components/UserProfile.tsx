import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {logoutUser, selectCurrentUser, selectIsAdmin} from '../model/authSlice';

interface UserProfileProps {onClose: () => void;}

const UserProfile: React.FC<UserProfileProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const isAdmin = useAppSelector(selectIsAdmin);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 576);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    onClose();
  };

  if (!user) {return null;}

  return (
    <div className="user-profile-dropdown" style={{
      fontSize: '0.875rem'
    }}>
      <div className="px-2 px-sm-3 py-2 border-bottom border-white border-opacity-25">
        <div className="d-flex align-items-center">
          <div className="me-2 me-sm-3 flex-shrink-0">
            <div 
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: isMobile ? '32px' : '40px',
                height: isMobile ? '32px' : '40px',
                background: isAdmin 
                  ? 'linear-gradient(135deg, #ffd700, #ffed4e)' 
                  : 'linear-gradient(135deg, #007bff, #0056b3)',
                color: isAdmin ? '#000' : '#fff',
                fontSize: isMobile ? '14px' : '16px',
                fontWeight: 'bold'
              }}
            >
              {isAdmin ? '👑' : '👤'}
            </div>
          </div>
          <div className="flex-grow-1 min-width-0">
            <div className="fw-semibold text-black text-truncate" style={{ fontSize: isMobile ? '0.8rem' : '0.85rem' }}>
              {user.name}
            </div>
            <div className="small text-black-50 text-truncate" style={{ fontSize: isMobile ? '0.7rem' : '0.75rem' }}>
              {user.email}
            </div>
            <div className="small mt-1">
              <span 
                className={`badge ${isAdmin ? 'bg-warning text-dark' : 'bg-primary'}`}
                style={{ fontSize: isMobile ? '0.6rem' : '0.65rem' }}
              >
                {isAdmin ? 'Адміністратор' : 'Користувач'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-top border-white border-opacity-25 pt-1 pb-1">
        <button 
          className="dropdown-item text-danger d-flex align-items-center w-100 border-0 bg-transparent px-2 px-sm-3 py-2"
          onClick={handleLogout}
          style={{
            fontSize: isMobile ? '0.85rem' : '0.8rem',
            borderRadius: '8px',
            transition: 'background-color 0.2s',
            padding: isMobile ? '12px 16px' : '8px 12px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(220, 53, 69, 0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <i className="bi bi-box-arrow-right me-2" style={{ fontSize: isMobile ? '1rem' : '0.9rem' }}></i>
          Вийти
        </button>
      </div>
    </div>
  );
};

export default UserProfile;