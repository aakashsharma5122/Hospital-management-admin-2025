import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaEye } from 'react-icons/fa';
import CommonTable from '../CommonTable';
import { useQuery } from '@apollo/client';
import { DOCTOR_QUERY } from '../../Graphql/mutations/query/doctor/DoctorQuery';
import { DELETE_DOCTOR_MUTATION, TOGGLE_DOCTOR_STATUS_MUTATION } from '../../Graphql/mutations/mutations/DoctorMutations/DoctorMutations';
import AddEditDoctorModel from './Model/AddEditDoctorModel';
import ViewModel from './Model/ViewModel';

const DoctorList = () => {
  const { data, loading, error } = useQuery(DOCTOR_QUERY);
  const [doctor, setdoctor] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingDoctor, setViewingDoctor] = useState(null);

  const [deleteDoctor] = useMutation(DELETE_DOCTOR_MUTATION, {
    refetchQueries: [{ query: DOCTOR_QUERY }],
    onCompleted: () => {
      toast.success('Doctor deleted successfully!');
    },
    onError: (error) => {
      toast.error(`Error deleting doctor: ${error.message}`);
    }
  });

  const [toggleDoctorStatus] = useMutation(TOGGLE_DOCTOR_STATUS_MUTATION, {
    refetchQueries: [{ query: DOCTOR_QUERY }],
    onCompleted: () => {
      toast.success('Doctor status updated successfully!');
    },
    onError: (error) => {
      toast.error(`Error updating doctor status: ${error.message}`);
    }
  });

  // Update doctor state when data changes
  useEffect(() => {
    if (data?.doctors) {
      setdoctor(data.doctors);
    }
  }, [data]);

  const handleAddDoctor = () => {
    setEditingDoctor(null);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleEditDoctor = (doctorData) => {
    setEditingDoctor(doctorData);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDeleteDoctor = async (doctorId) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await deleteDoctor({
          variables: { 
            deleteDoctorId: doctorId
          }
        });
      } catch (error) {
        console.error('Error deleting doctor:', error);
      }
    }
  };

  const handleToggleStatus = async (doctorId, currentStatus) => {
    try {
      await toggleDoctorStatus({
        variables: { 
          setDoctorStatusId: doctorId,
          isActive: !currentStatus  // Toggle the current status
        }
      });
    } catch (error) {
      console.error('Error toggling doctor status:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDoctor(null);
    setIsEditMode(false);
  };

  const handleViewDoctor = (doctorId) => {
    const doctorToView = doctor.find(d => d.id === doctorId);
    if (doctorToView) {
      setViewingDoctor(doctorToView);
      setIsViewModalOpen(true);
    }
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setViewingDoctor(null);
  };

  const columns = [
    {
      key: 'firstName',
      label: 'Doctor Name',
      sortable: true,
      render: (value, row) => (
        <span style={{ fontWeight: '600', color: '#2c3e50' }}>
          {row.firstName} {row.lastName}
        </span>
      )
    },
    {
      key: 'age',
      label: 'Age',
      sortable: true,
      render: (value) => `${value} years`
    },
    {
      key: 'gender',
      label: 'Gender',
      sortable: true,
      render: (value) => (
        <span style={{
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '500',
          backgroundColor: value === 'Male' ? '#e3f2fd' : '#fce4ec',
          color: value === 'Male' ? '#1976d2' : '#c2185b'
        }}>
          {value}
        </span>
      )
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      render: (value) => (
        <span style={{
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '500',
          backgroundColor: '#e3f2fd',
          color: '#1976d2'
        }}>
          {value}
        </span>
      )
    },
    {
      key: 'phoneNumber',
      label: 'Phone Number',
      sortable: false
    },
    {
      key: 'specialization',
      label: 'Specialization',
      sortable: true,
      render: (value) => (
        <span style={{
          padding: '4px 8px',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '500',
          backgroundColor: '#e8f5e8',
          color: '#2e7d32'
        }}>
          {value}
        </span>
      )
    },
    {
      key: 'qualification',
      label: 'Qualification',
      sortable: true,
      render: (value) => (
        <span style={{
          padding: '4px 8px',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '500',
          backgroundColor: '#fff3e0',
          color: '#f57c00'
        }}>
          {value}
        </span>
      )
    },
    {
      key: 'experiance',
      label: 'Experience',
      sortable: true,
      render: (value) => `${value} years`
    },
    {
      key: 'shifttiming',
      label: 'Shift',
      sortable: true,
      render: (value) => (
        <span style={{
          padding: '4px 8px',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '500',
          backgroundColor: '#f3e5f5',
          color: '#7b1fa2'
        }}>
          {value}
        </span>
      )
    },
    {
      key: 'isSurgeon',
      label: 'Type',
      sortable: true,
      render: (value) => (
        <span style={{
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '500',
          backgroundColor: value ? '#e8f5e8' : '#fff3e0',
          color: value ? '#2e7d32' : '#f57c00'
        }}>
          {value ? 'Surgeon' : 'General'}
        </span>
      )
    },
    {
      key: 'isActive',
      label: 'Status',
      sortable: true,
      render: (value, row) => (
        <button
          onClick={() => handleToggleStatus(row.id, value)}
          style={{
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '500',
            backgroundColor: value ? '#e8f5e8' : '#ffebee',
            color: value ? '#2e7d32' : '#c62828',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'all 0.2s ease'
          }}
        //   onMouseEnter={(e) => {
        //     e.target.style.transform = 'scale(1.05)';
        //   }}
        //   onMouseLeave={(e) => {
        //     e.target.style.transform = 'scale(1)';
        //   }}
        >
          {value ? <FaToggleOn /> : <FaToggleOff />}
          {value ? 'Active' : 'Inactive'}
        </button>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (value, row) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => handleEditDoctor(row)}
            style={{
              padding: '8px 12px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            //   transition: 'all 0.2s ease'
            }}
          
          >
            <FaEdit />
            
          </button>
          <button
            onClick={() => handleDeleteDoctor(row.id)}
            style={{
              padding: '8px 12px',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            //   transition: 'all 0.2s ease'
            }}
          
          >
            <FaTrash />
          </button>
          <button
            onClick={() => handleViewDoctor(row.id)}
            style={{
              padding: '8px 12px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            //   transition: 'all 0.2s ease'
            }}
          >
            <FaEye />
          </button>
        </div>
      )
    }
  ];

  return (
    <div style={{ padding: '25px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h1 style={{
          margin: 0,
          fontSize: '28px',
          fontWeight: '600',
          color: '#1f2937'
        }}>
          Doctor Management
        </h1>
        <button
          onClick={handleAddDoctor}
          style={{
            padding: '12px 24px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            // transition: 'all 0.2s ease',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
        //   onMouseEnter={(e) => {
        //     e.target.style.backgroundColor = '#059669';
        //     e.target.style.transform = 'translateY(-2px)';
        //     e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        //   }}
        //   onMouseLeave={(e) => {
        //     e.target.style.backgroundColor = '#10b981';
        //     e.target.style.transform = 'translateY(0)';
        //     e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        //   }}
        >
          <span style={{ fontSize: '16px' }}>+</span>
          Add New Doctor
        </button>
      </div>
     
      <CommonTable
        data={doctor}
        columns={columns}
        loading={loading}
        error={error}
        title="Doctor Records"
        emptyMessage="No doctor found"
      />

      <AddEditDoctorModel
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        doctor={editingDoctor}
        isEdit={isEditMode}
      />

      <ViewModel
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        doctor={viewingDoctor}
      />
    </div>
  );
};

export default DoctorList;
