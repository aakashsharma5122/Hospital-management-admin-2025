import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaEye } from 'react-icons/fa';
import CommonTable from '../../components/CommonTable';
import { useQuery } from '@apollo/client';
import { GET_STAFF } from '../../Graphql/query/staffQuery';
import { DELETE_STAFF, TOGGLE_STAFF_STATUS } from '../../Graphql/mutations/staffMutation';
import AddEditStaffModel from './Model/AddEditStaffModel';
import ViewStaffModel from './Model/ViewStaffModel';

const StaffList = () => {
  const { data, loading, error } = useQuery(GET_STAFF);
  const [staff, setStaff] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingStaff, setViewingStaff] = useState(null);

  const [deleteStaff] = useMutation(DELETE_STAFF, {
    refetchQueries: [{ query: GET_STAFF }],
    onCompleted: () => {
      toast.success('Staff deleted successfully!');
    },
    onError: (error) => {
      toast.error(`Error deleting staff: ${error.message}`);
    }
  });

  const [toggleStaffStatus] = useMutation(TOGGLE_STAFF_STATUS, {
    refetchQueries: [{ query: GET_STAFF }],
    onCompleted: () => {
      toast.success('Staff status updated successfully!');
    },
    onError: (error) => {
      toast.error(`Error updating staff status: ${error.message}`);
    }
  });

  // Update staff state when data changes
  useEffect(() => {
    if (data?.staffList) {
      setStaff(data.staffList);
    }
  }, [data]);

  const handleAddStaff = () => {
    setEditingStaff(null);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleEditStaff = (staffData) => {
    setEditingStaff(staffData);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDeleteStaff = async (staffId) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      try {
        await deleteStaff({
          variables: { 
            deleteStaffId: staffId
          }
        });
      } catch (error) {
        console.error('Error deleting staff:', error);
      }
    }
  };

  const handleToggleStatus = async (staffId, currentStatus) => {
    try {
      await toggleStaffStatus({
        variables: { 
          setStaffStatusId: staffId,
          isActive: !currentStatus
        }
      });
    } catch (error) {
      console.error('Error toggling staff status:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStaff(null);
    setIsEditMode(false);
  };

  const handleViewStaff = (staffId) => {
    const staffToView = staff.find(s => s.id === staffId);
    if (staffToView) {
      setViewingStaff(staffToView);
      setIsViewModalOpen(true);
    }
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setViewingStaff(null);
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

  const columns = [
    {
      key: 'staffType',
      label: 'Staff Type',
      sortable: true,
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStaffTypeColor(value)}`}>
          {formatStaffType(value)}
        </span>
      )
    },
    {
      key: 'qualification',
      label: 'Qualification',
      sortable: true,
      render: (value) => (
        <span className="px-2 py-1 rounded text-xs font-medium bg-emerald-50 text-emerald-700">
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
      key: 'salary',
      label: 'Salary',
      sortable: true,
      render: (value) => (
        <span className="px-2 py-1 rounded text-xs font-medium bg-green-50 text-green-700">
          ₹{value?.toLocaleString()}
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
      key: 'createdAt',
      label: 'Created Date',
      sortable: true,
      render: (value) => {
        if (!value) return 'N/A';
        return new Date(value).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      }
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (value, row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEditStaff(row)}
            className="px-3 py-2 bg-blue-600 text-white rounded text-xs font-medium inline-flex items-center gap-1 hover:bg-blue-700 border-none"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDeleteStaff(row.id)}
            className="px-3 py-2 bg-red-500 text-white rounded text-xs font-medium inline-flex items-center gap-1 hover:bg-red-600 border-none"
          >
            <FaTrash />
          </button>
          <button
            onClick={() => handleViewStaff(row.id)}
            className="px-3 py-2 bg-green-600 text-white rounded text-xs font-medium inline-flex items-center gap-1 hover:bg-green-700 border-none"
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
        <h1 className="m-0 text-2xl font-semibold text-gray-800">Staff Management</h1>
        <button
          onClick={handleAddStaff}
          className="px-6 py-3 bg-emerald-500 text-white rounded-lg text-sm font-medium inline-flex items-center gap-2 shadow hover:bg-emerald-600 border-none"
        >
          <span className="text-base">+</span>
          Add New Staff
        </button>
      </div>
     
      <CommonTable
        data={staff}
        columns={columns}
        loading={loading}
        error={error}
        title="Staff Records"
        emptyMessage="No staff found"
      />

      <AddEditStaffModel
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        staff={editingStaff}
        isEdit={isEditMode}
      />

      <ViewStaffModel
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        staff={viewingStaff}
      />
    </div>
  );
};

export default StaffList;
