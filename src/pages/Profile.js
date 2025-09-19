import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { USER_PROFILE_QUERY } from '../Graphql/query/UserProfileQuery';
import { USER_PROFILE_MUTATION } from '../Graphql/mutations/userProfilemutation';

// Update profile mutation

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Fetch profile data using GraphQL
  const { loading, error, data, refetch } = useQuery(USER_PROFILE_QUERY, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network'
  });

  // Update profile mutation
  const [updateProfile] = useMutation(USER_PROFILE_MUTATION);

  // Initialize profile data from GraphQL response
  const user = data?.me;
  
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    phone: '',
    dateOfBirth: ''
  });

  const [editData, setEditData] = useState({ ...profileData });

  // Update local state when GraphQL data loads
  // Update local state when GraphQL data loads
  useEffect(() => {
    if (user) {
      const updatedData = {
        firstName: user?.profile?.firstName || '',
        lastName: user?.profile?.lastName || '',
        email: user.email || '',
        role: user.role || '',
        phone: user.profile?.phone || '',
        dateOfBirth: user.profile?.dateOfBirth ? new Date(user.profile.dateOfBirth).toISOString().split('T')[0] : ''
      };
      setProfileData(updatedData);
      setEditData(updatedData);
    }
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...profileData });
  };

  const handleSave = async () => {
    try {
      const { data: updateData } = await updateProfile({
        variables: {
          input: {
            firstName: editData.firstName,
            lastName: editData.lastName,
            phone: editData.phone,
            dateOfBirth: editData.dateOfBirth
          }
        }
      });

      if (updateData?.updateProfile) {
        // Update local state with the response
        const updatedUser = updateData.updateProfile;
        const updatedData = {
          firstName: updatedUser.profile?.firstName || '',
          lastName: updatedUser.profile?.lastName || '',
          email: updatedUser.email || '',
          role: user.role || '', // Keep role from original user data
          phone: updatedUser.profile?.phone || '',
          dateOfBirth: updatedUser.profile?.dateOfBirth ? new Date(updatedUser.profile.dateOfBirth).toISOString().split('T')[0] : ''
        };
        
        setProfileData(updatedData);
        setEditData(updatedData);
        
        // Update localStorage with full name
        localStorage.setItem('userName', `${updatedData.firstName} ${updatedData.lastName}`.trim());
        localStorage.setItem('userEmail', updatedData.email);
        
        setIsEditing(false);
        toast.success('Profile updated successfully!');
        
        // Refetch to get latest data
        refetch();
      }
    } catch (err) {
      console.error('Update error:', err);
      toast.error('Failed to update profile: ' + (err.message || 'Unknown error'));
    }
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

  // Show loading state
  if (loading) {
    return (
      <div style={{ 
        padding: '25px', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '400px'
      }}>
        <div style={{
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #5F9EA0',
            borderTop: '4px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 10px'
          }}></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && !data) {
    return (
      <div style={{ padding: '25px' }}>
        <div style={{
          padding: '20px',
          backgroundColor: '#fee',
          borderRadius: '10px',
          border: '1px solid #fcc'
        }}>
          <h3 style={{ color: '#c66', margin: '0 0 10px 0' }}>Error Loading Profile</h3>
          <p style={{ margin: '0 0 15px 0' }}>
            {error.message || 'Failed to load profile data'}
          </p>
          <button
            onClick={() => refetch()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#5F9EA0',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Profile fields configuration
  const profileFields = [
    { key: 'firstName', label: 'First Name', type: 'text', editable: true },
    { key: 'lastName', label: 'Last Name', type: 'text', editable: true },
    { key: 'email', label: 'Email Address', type: 'email', editable: true },
    { key: 'role', label: 'Role', type: 'text', editable: false },
    { key: 'phone', label: 'Phone Number', type: 'tel', editable: true },
    { key: 'dateOfBirth', label: 'Date of Birth', type: 'date', editable: true }
  ];

  return (
    <div style={{ padding: '25px' }}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      
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
            disabled={!user}
            style={{
              padding: '12px 20px',
              backgroundColor: user ? '#4682B4' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: user ? 'pointer' : 'not-allowed',
              fontSize: '14px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: user ? '0 2px 8px rgba(70, 130, 180, 0.3)' : 'none',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (user) {
                e.target.style.backgroundColor = '#3a6b8a';
                e.target.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (user) {
                e.target.style.backgroundColor = '#4682B4';
                e.target.style.transform = 'translateY(0)';
              }
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
            {profileData.firstName +" " +profileData.lastName || 'Loading...'}
          </h3>
          
          <p style={{
            margin: '0 0 15px 0',
            color: '#6c757d',
            fontSize: '14px'
          }}>
            {profileData.email || 'Loading...'}
          </p>
          
          <div style={{
            padding: '8px 16px',
            backgroundColor: user ? '#e8f5e8' : '#f0f0f0',
            borderRadius: '20px',
            border: `1px solid ${user ? '#4CAF50' : '#ccc'}`,
            display: 'inline-block'
          }}>
            <span style={{
              color: user ? '#2e7d32' : '#666',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              {profileData.role || 'Loading...'}
            </span>
          </div>

          {user?.profile?.address?.country && (
            <div style={{ marginTop: '15px' }}>
              <p style={{
                margin: 0,
                color: '#6c757d',
                fontSize: '12px'
              }}>
                📍 {user.profile.address.country}
              </p>
            </div>
          )}
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
                    value={editData[field.key] || ''}
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
                    {profileData[field.key] || 'Not specified'}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
