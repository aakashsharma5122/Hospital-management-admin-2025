import React from 'react';
import { FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaStethoscope, FaClock, FaUserMd, FaVenusMars } from 'react-icons/fa';

const ViewModel = ({ isOpen, onClose, doctor }) => {
  if (!isOpen || !doctor) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '30px',
        width: '90%',
        maxWidth: '700px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: '3px solid #e5e7eb'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#3b82f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px'
            }}>
              <FaUserMd />
            </div>
            <div>
              <h2 style={{
                margin: 0,
                fontSize: '28px',
                fontWeight: '700',
                color: '#1f2937'
              }}>
                Dr. {doctor.firstName} {doctor.lastName}
              </h2>
              <p style={{
                margin: 0,
                fontSize: '16px',
                color: '#6b7280',
                fontWeight: '500'
              }}>
                {doctor.specialization}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '28px',
              cursor: 'pointer',
              color: '#6b7280',
              padding: '8px',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f3f4f6';
              e.target.style.color = '#374151';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#6b7280';
            }}
          >
            ×
          </button>
        </div>

        {/* Doctor Details */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '25px'
        }}>
          {/* Personal Information */}
          <div style={{
            backgroundColor: '#f8fafc',
            padding: '25px',
            borderRadius: '12px',
            border: '2px solid #e2e8f0'
          }}>
            <h3 style={{
              margin: '0 0 20px 0',
              fontSize: '18px',
              fontWeight: '600',
              color: '#1e293b',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <FaUser style={{ color: '#3b82f6' }} />
              Personal Information
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '500', color: '#64748b' }}>Full Name:</span>
                <span style={{ fontWeight: '600', color: '#1e293b' }}>
                  {doctor.firstName} {doctor.lastName}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '500', color: '#64748b' }}>Age:</span>
                <span style={{ fontWeight: '600', color: '#1e293b' }}>{doctor.age} years</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '500', color: '#64748b' }}>Gender:</span>
                <span style={{ 
                  fontWeight: '600', 
                  color: '#1e293b',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <FaVenusMars style={{ color: '#3b82f6' }} />
                  {doctor.gender}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div style={{
            backgroundColor: '#f0f9ff',
            padding: '25px',
            borderRadius: '12px',
            border: '2px solid #bae6fd'
          }}>
            <h3 style={{
              margin: '0 0 20px 0',
              fontSize: '18px',
              fontWeight: '600',
              color: '#1e293b',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <FaEnvelope style={{ color: '#0ea5e9' }} />
              Contact Information
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '500', color: '#64748b' }}>Email:</span>
                <span style={{ 
                  fontWeight: '600', 
                  color: '#1e293b',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <FaEnvelope style={{ color: '#0ea5e9' }} />
                  {doctor.email}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '500', color: '#64748b' }}>Phone:</span>
                <span style={{ 
                  fontWeight: '600', 
                  color: '#1e293b',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <FaPhone style={{ color: '#0ea5e9' }} />
                  {doctor.phoneNumber}
                </span>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div style={{
            backgroundColor: '#f0fdf4',
            padding: '25px',
            borderRadius: '12px',
            border: '2px solid #bbf7d0'
          }}>
            <h3 style={{
              margin: '0 0 20px 0',
              fontSize: '18px',
              fontWeight: '600',
              color: '#1e293b',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <FaStethoscope style={{ color: '#22c55e' }} />
              Professional Information
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '500', color: '#64748b' }}>Specialization:</span>
                <span style={{ 
                  fontWeight: '600', 
                  color: '#1e293b',
                  backgroundColor: '#dcfce7',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '12px'
                }}>
                  {doctor.specialization}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '500', color: '#64748b' }}>Qualification:</span>
                <span style={{ 
                  fontWeight: '600', 
                  color: '#1e293b',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <FaGraduationCap style={{ color: '#22c55e' }} />
                  {doctor.qualification}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '500', color: '#64748b' }}>Experience:</span>
                <span style={{ fontWeight: '600', color: '#1e293b' }}>{doctor.experiance} years</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '500', color: '#64748b' }}>Type:</span>
                <span style={{ 
                  fontWeight: '600', 
                  // color: '#1e293b',
                  backgroundColor: doctor.isSurgeon ? '#fef3c7' : '#e0e7ff',
                  color: doctor.isSurgeon ? '#92400e' : '#3730a3',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '12px'
                }}>
                  {doctor.isSurgeon ? 'Surgeon' : 'General Doctor'}
                </span>
              </div>
            </div>
          </div>

          {/* Schedule Information */}
          <div style={{
            backgroundColor: '#fef7ff',
            padding: '25px',
            borderRadius: '12px',
            border: '2px solid #e9d5ff'
          }}>
            <h3 style={{
              margin: '0 0 20px 0',
              fontSize: '18px',
              fontWeight: '600',
              color: '#1e293b',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <FaClock style={{ color: '#a855f7' }} />
              Schedule Information
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '500', color: '#64748b' }}>Shift Timing:</span>
                <span style={{ 
                  fontWeight: '600', 
                  color: '#1e293b',
                  backgroundColor: '#f3e8ff',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '12px'
                }}>
                  {doctor.shifttiming}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '500', color: '#64748b' }}>Status:</span>
                <span style={{ 
                  fontWeight: '600', 
                  // color: '#1e293b',
                  backgroundColor: doctor.isActive ? '#dcfce7' : '#fee2e2',
                  color: doctor.isActive ? '#166534' : '#dc2626',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '12px'
                }}>
                  {doctor.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '2px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '12px 24px',
              backgroundColor: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#4b5563';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#6b7280';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewModel;
