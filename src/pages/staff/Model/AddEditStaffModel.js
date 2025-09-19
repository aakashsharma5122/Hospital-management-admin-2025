import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { ADD_STAFF, UPDATE_STAFF } from '../../../Graphql/mutations/staffMutation';
import { GET_STAFF } from '../../../Graphql/query/staffQuery';

const AddEditStaffModel = ({ isOpen, onClose, staff = null, isEdit = false }) => {
  const [formData, setFormData] = useState({
    staffType: '',
    qualification: '',
    experiance: 0,
    salary: 0
  });

  const [addStaff] = useMutation(ADD_STAFF, {
    refetchQueries: [{ query: GET_STAFF }],
    onCompleted: () => {
      toast.success('Staff added successfully!');
      onClose();
    },
    onError: (error) => {
      toast.error(`Error adding staff: ${error.message}`);
    }
  });

  const [updateStaff] = useMutation(UPDATE_STAFF, {
    refetchQueries: [{ query: GET_STAFF }],
    onCompleted: () => {
      toast.success('Staff updated successfully!');
      onClose();
    },
    onError: (error) => {
      toast.error(`Error updating staff: ${error.message}`);
    }
  });

  useEffect(() => {
    if (isEdit && staff) {
      setFormData({
        staffType: staff.staffType || '',
        qualification: staff.qualification || '',
        experiance: staff.experiance || 0,
        salary: staff.salary || 0
      });
    } else {
      setFormData({
        staffType: '',
        qualification: '',
        experiance: 0,
        salary: 0
      });
    }
  }, [isEdit, staff]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const submitData = {
        ...formData,
        experiance: parseInt(formData.experiance, 10),
        salary: parseInt(formData.salary, 10)
      };
      
      if (isEdit && staff) {
        await updateStaff({
          variables: {
            updateStaffInputId: staff.id, 
            input: submitData
          }
        });
      } else {
        await addStaff({
          variables: {
            input: submitData
          }
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (!isOpen) return null;

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
            {isEdit ? 'Edit Staff' : 'Add New Staff'}
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

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Staff Type */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151'
            }}>
              Staff Type *
            </label>
            <select
              name="staffType"
              value={formData.staffType}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                backgroundColor: 'white',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            >
              <option value="">Select Staff Type</option>
              <option value="nurse">Nurse</option>
              <option value="receptionist">Receptionist</option>
              <option value="lab technician">Lab Technician</option>
              <option value="pharmacist">Pharmacist</option>
              <option value="admin staff">Admin Staff</option>
              <option value="surgical">Surgical</option>
              <option value="physician">Physician</option>
              <option value="security">Security</option>
              <option value="housekeeping">Housekeeping</option>
            </select>
          </div>

          {/* Qualification */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151'
            }}>
              Qualification *
            </label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleInputChange}
              required
              placeholder="e.g., B.Sc, Diploma, Certificate"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>

          {/* Experience */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151'
            }}>
              Experience (Years) *
            </label>
            <input
              type="number"
              name="experiance"
              value={formData.experiance}
              onChange={handleInputChange}
              required
              min="0"
              max="50"
              placeholder="0"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>

          {/* Salary */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151'
            }}>
              Salary (₹) *
            </label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              required
              min="0"
              placeholder="0"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'flex-end',
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: '2px solid #f3f4f6'
          }}>
            <button
              type="button"
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
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: '#10b981',
                color: 'white',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#059669'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#10b981'}
            >
              {isEdit ? 'Update Staff' : 'Add Staff'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditStaffModel;
