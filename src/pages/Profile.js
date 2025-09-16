import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: localStorage.getItem('userName') || 'Admin User',
    email: localStorage.getItem('userEmail') || 'admin@example.com',
    role: localStorage.getItem('userRole') || 'ADMIN',
    department: 'Hospital Administration',
    phone: '+1-555-0123',
    joinDate: '2024-01-01',
    lastLogin: new Date().toLocaleString()
  });

  const [editData, setEditData] = useState({ ...profileData });

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...profileData });
  };

  const handleSave = () => {
    setProfileData({ ...editData });
    localStorage.setItem('userName', editData.name);
    localStorage.setItem('userEmail', editData.email);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const profileFields = [
    { key: 'name', label: 'Full Name', type: 'text', editable: true },
    { key: 'email', label: 'Email Address', type: 'email', editable: true },
    { key: 'role', label: 'Role', type: 'text', editable: false },
    { key: 'department', label: 'Department', type: 'text', editable: true },
    { key: 'phone', label: 'Phone Number', type: 'tel', editable: true },
    { key: 'joinDate', label: 'Join Date', type: 'date', editable: false },
    { key: 'lastLogin', label: 'Last Login', type: 'text', editable: false }
  ];

  return (
    <div style={{ padding: '25px' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <div>
          <h1 style={{
            color: '#2c3e50',
            margin: '0 0 8px 0',
            fontSize: '28px',
            fontWeight: '700'
          }}>
            User Profile
          </h1>
          <p style={{
            margin: 0,
            color: '#7f8c8d',
            fontSize: '16px'
          }}>
            Manage your account information and preferences
          </p>
        </div>
        
        {!isEditing ? (
          <button
            onClick={handleEdit}
            style={{
              padding: '12px 20px',
              backgroundColor: '#4682B4',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 8px rgba(70, 130, 180, 0.3)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#3a6b8a';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#4682B4';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <span>✏️</span>
            Edit Profile
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleCancel}
              style={{
                padding: '12px 20px',
                backgroundColor: '#FF9800',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f57c00';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#FF9800';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              style={{
                padding: '12px 20px',
                backgroundColor: '#5F9EA0',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
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
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Profile Content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: '30px'
      }}>
        {/* Profile Card */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '15px',
          padding: '30px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          border: '1px solid #e9ecef',
          textAlign: 'center',
          height: 'fit-content'
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            backgroundColor: '#5F9EA0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '48px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(95, 158, 160, 0.3)'
          }}>
            👤
          </div>
          
          <h3 style={{
            margin: '0 0 8px 0',
            color: '#2c3e50',
            fontSize: '20px',
            fontWeight: '600'
          }}>
            {profileData.name}
          </h3>
          
          <p style={{
            margin: '0 0 15px 0',
            color: '#6c757d',
            fontSize: '14px'
          }}>
            {profileData.email}
          </p>
          
          <div style={{
            padding: '8px 16px',
            backgroundColor: '#e8f5e8',
            borderRadius: '20px',
            border: '1px solid #4CAF50',
            display: 'inline-block'
          }}>
            <span style={{
              color: '#2e7d32',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              {profileData.role}
            </span>
          </div>
        </div>

        {/* Profile Details */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '15px',
          padding: '30px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{
            margin: '0 0 25px 0',
            color: '#2c3e50',
            fontSize: '18px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span>📋</span>
            Profile Information
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {profileFields.map((field) => (
              <div key={field.key}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: '#2c3e50',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  {field.label}
                </label>
                
                {isEditing && field.editable ? (
                  <input
                    type={field.type}
                    value={editData[field.key]}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '2px solid #e9ecef',
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                      backgroundColor: '#f8f9fa'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#5F9EA0';
                      e.target.style.backgroundColor = 'white';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e9ecef';
                      e.target.style.backgroundColor = '#f8f9fa';
                    }}
                  />
                ) : (
                  <div style={{
                    padding: '10px 12px',
                    backgroundColor: field.editable ? '#f8f9fa' : '#e9ecef',
                    borderRadius: '6px',
                    fontSize: '14px',
                    color: '#2c3e50',
                    border: '2px solid #e9ecef'
                  }}>
                    {profileData[field.key]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '15px',
        padding: '30px',
        marginTop: '30px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        border: '1px solid #e9ecef'
      }}>
        <h3 style={{
          margin: '0 0 20px 0',
          color: '#2c3e50',
          fontSize: '18px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span>📊</span>
          Recent Activity
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '15px'
        }}>
          {[
            { action: 'Profile Updated', time: '2 hours ago', icon: '✏️' },
            { action: 'Last Login', time: '1 day ago', icon: '🔐' },
            { action: 'Password Changed', time: '1 week ago', icon: '🔑' },
            { action: 'Account Created', time: '1 month ago', icon: '👤' }
          ].map((activity, index) => (
            <div
              key={index}
              style={{
                padding: '15px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e9ecef',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div style={{
                fontSize: '20px'
              }}>
                {activity.icon}
              </div>
              <div>
                <p style={{
                  margin: '0 0 4px 0',
                  color: '#2c3e50',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  {activity.action}
                </p>
                <p style={{
                  margin: 0,
                  color: '#6c757d',
                  fontSize: '12px'
                }}>
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
