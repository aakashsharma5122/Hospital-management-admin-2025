import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#ffffff',
      borderTop: '1px solid #e9ecef',
      padding: '20px 25px',
      marginTop: 'auto',
      boxShadow: '0 -2px 4px rgba(0,0,0,0.05)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        {/* Left side - Company info */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            borderRadius: '4px'
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
          <div>
            <p style={{
              margin: 0,
              color: '#2c3e50',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              AS Group of Hospitals
            </p>
            <p style={{
              margin: 0,
              color: '#6c757d',
              fontSize: '12px'
            }}>
              Hospital Management System v2.0
            </p>
          </div>
        </div>

        {/* Center - Copyright */}
        <div style={{
          textAlign: 'center',
          flex: 1
        }}>
          <p style={{
            margin: 0,
            color: '#6c757d',
            fontSize: '12px'
          }}>
            © 2025 AS Group of Hospitals. All rights reserved.
          </p>
        </div>

        {/* Right side - Quick links */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '15px',
            border: '1px solid #e9ecef'
          }}>
            <span style={{ fontSize: '12px' }}>🕐</span>
            <span style={{
              color: '#6c757d',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              {new Date().toLocaleDateString()}
            </span>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            backgroundColor: '#e8f5e8',
            borderRadius: '15px',
            border: '1px solid #4CAF50'
          }}>
            <span style={{ fontSize: '12px' }}>✅</span>
            <span style={{
              color: '#2e7d32',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              System Online
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
