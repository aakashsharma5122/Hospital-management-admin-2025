import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaEye } from 'react-icons/fa';
import CommonTable from '../../components/CommonTable';
import { useQuery } from '@apollo/client';
import { DOCTOR_QUERY } from '../../Graphql/query/DoctorQuery';
import { DELETE_DOCTOR_MUTATION, TOGGLE_DOCTOR_STATUS_MUTATION } from '../../Graphql/mutations/DoctorMutations';
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
          isActive: !currentStatus
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
        <span className="font-semibold text-gray-800">
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
      render: (value) => {
        const normalized = (value || '').toLowerCase();
        const isMale = normalized === 'male';
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${isMale ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
            {value}
          </span>
        );
      }
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      render: (value) => (
        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700">
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
        <span className="px-2 py-1 rounded text-xs font-medium bg-emerald-50 text-emerald-700">
          {value}
        </span>
      )
    },
    {
      key: 'qualification',
      label: 'Qualification',
      sortable: true,
      render: (value) => (
        <span className="px-2 py-1 rounded text-xs font-medium bg-orange-50 text-orange-700">
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
        <span className="px-2 py-1 rounded text-xs font-medium bg-purple-50 text-purple-700">
          {value}
        </span>
      )
    },
    {
      key: 'isSurgeon',
      label: 'Type',
      sortable: true,
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${value ? 'bg-emerald-50 text-emerald-700' : 'bg-orange-50 text-orange-700'}`}>
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
          className={`px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 border-none ${value ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}
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
        <div className="flex gap-2">
          <button
            onClick={() => handleEditDoctor(row)}
            className="px-3 py-2 bg-blue-600 text-white rounded text-xs font-medium inline-flex items-center gap-1 hover:bg-blue-700 border-none"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDeleteDoctor(row.id)}
            className="px-3 py-2 bg-red-500 text-white rounded text-xs font-medium inline-flex items-center gap-1 hover:bg-red-600 border-none"
          >
            <FaTrash />
          </button>
          <button
            onClick={() => handleViewDoctor(row.id)}
            className="px-3 py-2 bg-blue-600 text-white rounded text-xs font-medium inline-flex items-center gap-1 hover:bg-blue-700 border-none"
          >
            <FaEye />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="p-6 font-inter">
      <div className="flex items-center justify-between mb-5">
        <h1 className="m-0 text-2xl font-semibold text-gray-800">Doctor Management</h1>
        <button
          onClick={handleAddDoctor}
          className="px-6 py-3 bg-emerald-500 text-white rounded-lg text-sm font-medium inline-flex items-center gap-2 shadow hover:bg-emerald-600 border-none"
        >
          <span className="text-base">+</span>
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
