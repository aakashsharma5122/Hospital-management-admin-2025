import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showConfirm, setShowConfirm] = React.useState(false);

  const getPageTitle = () => {
    const path = location.pathname.substring(1);
    switch (path) {
      case 'dashboard':
        return 'Dashboard';
      case 'users':
        return 'Users';
      case 'patient-list':
      case 'patient-registration':
      case 'patient-history':
        return 'Patient Management';
      case 'posts':
        return 'Posts';
      case 'settings':
        return 'Settings';
      case 'profile':
        return 'Profile';
      default:
        return 'AS Group of Hospitals';
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div style={{
      backgroundColor: '#ffffff',
      padding: '15px 25px',
      borderBottom: '1px solid #e9ecef',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'

    }} className='font-inter'>
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            borderRadius: '6px'
          }}>
            <img 
              src="/logo-for-my-admin.png" 
              alt="AS Group" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
          </div>
          <h2 style={{
            margin: 0,
            color: '#2c3e50',
            fontSize: '20px',
            fontWeight: '600'
          }}>
            {getPageTitle()}
          </h2>
        </div>
      </div>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
      }}>
        {/* Profile Icon */}
        <button
          onClick={handleProfileClick}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '2px solid #5F9EA0',
            backgroundColor: '#f8f9fa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontSize: '18px'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#5F9EA0';
            e.target.style.color = 'white';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#f8f9fa';
            e.target.style.color = '#5F9EA0';
            e.target.style.transform = 'scale(1)';
          }}
          title="View Profile"
        >
          👤
        </button>

        {/* User Info */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 15px',
          backgroundColor: '#e8f5e8',
          borderRadius: '20px',
          border: '1px solid #4CAF50'
        }}>
          <span style={{ fontSize: '14px' }}>👨‍⚕️</span>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span style={{
              color: '#2e7d32',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              {localStorage.getItem('userName') || 'Admin'}
            </span>
            <span style={{
              color: '#4CAF50',
              fontSize: '11px',
              fontWeight: '400'
            }}>
              {localStorage.getItem('userRole') || 'ADMIN'}
            </span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => setShowConfirm(true)}
          style={{
            padding: '8px 15px',
            backgroundColor: '#5F9EA0',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#4a8a8c';
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#5F9EA0';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          <span>🚪</span>
          Logout
        </button>
      </div>

      {/* Confirm Logout Modal */}
      {showConfirm && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '420px',
            padding: '20px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
            border: '1px solid #e9ecef'
          }}>
            <h3 style={{ margin: 0, color: '#2c3e50', fontSize: '18px', fontWeight: 700 }}>Confirm Logout</h3>
            <p style={{ margin: '10px 0 20px 0', color: '#6b7280', fontSize: '14px' }}>Are you sure you want to logout?</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setShowConfirm(false)}
                style={{
                  padding: '8px 14px',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 500
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => { setShowConfirm(false); onLogout && onLogout(); }}
                style={{
                  padding: '8px 14px',
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
