import React from 'react';
import { FaUser, FaGraduationCap, FaBriefcase, FaMoneyBillWave, FaCalendarAlt, FaToggleOn, FaToggleOff } from 'react-icons/fa';

const ViewStaffModel = ({ isOpen, onClose, staff }) => {
  if (!isOpen || !staff) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStaffTypeColor = (staffType) => {
    const colors = {
      'nurse': 'bg-pink-100 text-pink-700',
      'receptionist': 'bg-blue-100 text-blue-700',
      'lab technician': 'bg-purple-100 text-purple-700',
      'pharmacist': 'bg-green-100 text-green-700',
      'admin staff': 'bg-orange-100 text-orange-700',
      'surgical': 'bg-red-100 text-red-700',
      'physician': 'bg-emerald-100 text-emerald-700',
      'security': 'bg-gray-100 text-gray-700',
      'housekeeping': 'bg-yellow-100 text-yellow-700'
    };
    return colors[staffType] || 'bg-gray-100 text-gray-700';
  };

  const formatStaffType = (staffType) => {
    if (!staffType) return '';
    return staffType.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

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
        maxWidth: '600px',
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
          borderBottom: '2px solid #f3f4f6'
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '24px',
            fontWeight: '600',
            color: '#1f2937'
          }}>
            Staff Details
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6b7280',
              padding: '5px',
              borderRadius: '50%',
              width: '35px',
              height: '35px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#f3f4f6'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            ×
          </button>
        </div>

        {/* Staff Information */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Staff Type */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#3b82f6',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <FaUser size={16} />
            </div>
            <div>
              <p style={{
                margin: 0,
                fontSize: '12px',
                color: '#6b7280',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Staff Type
              </p>
              <p style={{
                margin: 0,
                fontSize: '16px',
                color: '#1f2937',
                fontWeight: '600'
              }}>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStaffTypeColor(staff.staffType)}`}>
                  {formatStaffType(staff.staffType)}
                </span>
              </p>
            </div>
          </div>

          {/* Qualification */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#10b981',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <FaGraduationCap size={16} />
            </div>
            <div>
              <p style={{
                margin: 0,
                fontSize: '12px',
                color: '#6b7280',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Qualification
              </p>
              <p style={{
                margin: 0,
                fontSize: '16px',
                color: '#1f2937',
                fontWeight: '600'
              }}>
                {staff.qualification || 'N/A'}
              </p>
            </div>
          </div>

          {/* Experience */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#f59e0b',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <FaBriefcase size={16} />
            </div>
            <div>
              <p style={{
                margin: 0,
                fontSize: '12px',
                color: '#6b7280',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Experience
              </p>
              <p style={{
                margin: 0,
                fontSize: '16px',
                color: '#1f2937',
                fontWeight: '600'
              }}>
                {staff.experiance || 0} years
              </p>
            </div>
          </div>

          {/* Salary */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#8b5cf6',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <FaMoneyBillWave size={16} />
            </div>
            <div>
              <p style={{
                margin: 0,
                fontSize: '12px',
                color: '#6b7280',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Salary
              </p>
              <p style={{
                margin: 0,
                fontSize: '16px',
                color: '#1f2937',
                fontWeight: '600'
              }}>
                ₹{staff.salary?.toLocaleString() || '0'}
              </p>
            </div>
          </div>

          {/* Status */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: staff.isActive ? '#10b981' : '#ef4444',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              {staff.isActive ? <FaToggleOn size={16} /> : <FaToggleOff size={16} />}
            </div>
            <div>
              <p style={{
                margin: 0,
                fontSize: '12px',
                color: '#6b7280',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Status
              </p>
              <p style={{
                margin: 0,
                fontSize: '16px',
                color: '#1f2937',
                fontWeight: '600'
              }}>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${staff.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                  {staff.isActive ? 'Active' : 'Inactive'}
                </span>
              </p>
            </div>
          </div>

          {/* Created Date */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#6b7280',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <FaCalendarAlt size={16} />
            </div>
            <div>
              <p style={{
                margin: 0,
                fontSize: '12px',
                color: '#6b7280',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Created Date
              </p>
              <p style={{
                margin: 0,
                fontSize: '16px',
                color: '#1f2937',
                fontWeight: '600'
              }}>
                {formatDate(staff.createdAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '2px solid #f3f4f6'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '12px 24px',
              border: '2px solid #d1d5db',
              borderRadius: '8px',
              backgroundColor: 'white',
              color: '#374151',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.borderColor = '#9ca3af';
              e.target.style.backgroundColor = '#f9fafb';
            }}
            onMouseOut={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.backgroundColor = 'white';
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewStaffModel;
