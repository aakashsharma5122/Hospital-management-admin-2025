import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { USER_PROFILE_QUERY } from '../Graphql/query/UserProfileQuery';
import { USER_PROFILE_MUTATION } from '../Graphql/mutations/userProfilemutation';

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
      <div className="p-6 flex justify-center items-center min-h-96">
        <div className="p-5 bg-gray-50 rounded-lg text-center">
          <div className="w-10 h-10 border-4 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && !data) {
    return (
      <div className="p-6">
        <div className="p-5 bg-red-50 rounded-lg border border-red-200">
          <h3 className="text-red-600 mb-2 font-semibold">Error Loading Profile</h3>
          <p className="mb-4 text-gray-700">
            {error.message || 'Failed to load profile data'}
          </p>
          <button
            onClick={() => refetch()}
            className="px-5 py-2 bg-teal-500 text-white border-none rounded cursor-pointer hover:bg-teal-600 transition-colors"
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
    <div className="p-6 font-inter">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-slate-800 mb-2 text-3xl font-bold">
            User Profile
          </h1>
          <p className="text-gray-500 text-base">
            Manage your account information and preferences
          </p>
        </div>
        
        {!isEditing ? (
          <button
            onClick={handleEdit}
            disabled={!user}
            className={`px-5 py-3 text-white border-none rounded-lg text-sm font-semibold flex items-center gap-2 transition-all duration-200 ${
              user 
                ? 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5 shadow-lg shadow-blue-200 cursor-pointer' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            <span>✏️</span>
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="px-5 py-3 bg-orange-500 text-white border-none rounded-lg text-sm font-semibold cursor-pointer hover:bg-orange-600 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-3 bg-teal-500 text-white border-none rounded-lg text-sm font-semibold cursor-pointer hover:bg-teal-600 transition-all duration-200"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Profile Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8 items-stretch">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 text-center flex flex-col justify-center">
          <div className="w-32 h-32 rounded-full bg-teal-500 flex items-center justify-center mx-auto mb-6 text-5xl text-white shadow-lg shadow-teal-200">
            👤
          </div>
          
          <h3 className="mb-3 text-slate-800 text-xl font-semibold">
            {profileData.firstName + " " + profileData.lastName || 'Loading...'}
          </h3>
          
          <p className="mb-4 text-gray-500 text-base">
            {profileData.email || 'Loading...'}
          </p>
          
          <div className={`px-4 py-2 rounded-full border inline-block ${
            user 
              ? 'bg-green-50 border-green-500' 
              : 'bg-gray-100 border-gray-300'
          }`}>
            <span className={`text-sm font-semibold ${
              user ? 'text-green-700' : 'text-gray-600'
            }`}>
              {profileData.role || 'Loading...'}
            </span>
          </div>

          {user?.profile?.address?.country && (
            <div className="mt-4">
              <p className="text-gray-500 text-sm">
                📍 {user.profile.address.country}
              </p>
            </div>
          )}
        </div>

        {/* Profile Details */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 flex flex-col">
          <h3 className="mb-8 text-slate-800 text-xl font-semibold flex items-center gap-3">
            <span>📋</span>
            Profile Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
            {profileFields.map((field) => (
              <div key={field.key} className="space-y-2">
                <label className="block text-slate-700 text-sm font-medium">
                  {field.label}
                </label>
                
                {isEditing && field.editable ? (
                  <input
                    type={field.type}
                    value={editData[field.key] || ''}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-slate-800 outline-none transition-all duration-200 bg-white hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                ) : (
                  <div className={`px-3 py-2.5 rounded-lg text-sm text-slate-800 border transition-all duration-200 ${
                    field.editable 
                      ? 'bg-gray-50 border-gray-200 hover:bg-gray-100' 
                      : 'bg-gray-100 border-gray-300'
                  }`}>
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
