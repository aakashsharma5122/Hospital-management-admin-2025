import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaEye, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import CommonTable from '../../components/CommonTable';
import { GET_HOSPITALS } from '../../Graphql/query/HospitalQuery';
import { DELETE_HOSPITALS, TOGGLE_HOSPITAL_STATUS } from '../../Graphql/mutations/HospitalMutation';
import AddEditHospitalModal from './model/AddEditHospitalModal';
import ViewHospitalModal from './model/ViewHospitalModal';

const HospitalList = () => {
  const { data, loading, error } = useQuery(GET_HOSPITALS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewingHospital, setViewingHospital] = useState(null);

  const [deleteHospital] = useMutation(DELETE_HOSPITALS, {
    refetchQueries: [{ query: GET_HOSPITALS }],
    onCompleted: () => toast.success('Hospital deleted successfully!'),
    onError: (e) => toast.error(e.message)
  });

  const [toggleHospitalStatus] = useMutation(TOGGLE_HOSPITAL_STATUS, {
    refetchQueries: [{ query: GET_HOSPITALS }],
    onCompleted: () => toast.success('Hospital status updated!'),
    onError: (e) => toast.error(e.message)
  });

  const handleAddHospital = () => {
    setSelectedHospital(null);
    setIsEdit(false);
    setIsModalOpen(true);
  };

  const handleEditHospital = (hospital) => {
    setSelectedHospital(hospital);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleDeleteHospital = async (hospitalId) => {
    if (!window.confirm('Are you sure you want to delete this hospital?')) return;
    try {
      await deleteHospital({ variables: { deleteHospitalId: hospitalId } });
    } catch (_e) {
      // toast handled in onError
    }
  };

  const handleViewHospital = (hospital) => {
    setViewingHospital(hospital);
    setIsViewOpen(true);
  };

  const handleToggleStatus = async (hospitalId, currentIsActive) => {
    try {
      await toggleHospitalStatus({
        variables: {
          setHospitalStatusId: hospitalId,
          isActive: !currentIsActive
        }
      });
    } catch (_e) {
      // toast handled in onError
    }
  };

  const columns = [
    {
      key: 'hospitalName',
      label: 'Hospital',
      sortable: true,
      render: (value) => (
        <span className="font-medium text-gray-800">{value || '—'}</span>
      ),
    },
    { key: 'phoneNumber', label: 'Phone', sortable: true },
    {
      key: 'numberOfBeds',
      label: 'Beds',
      sortable: true,
      render: (value) => (
        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">{value ?? '—'}</span>
      )
    },
    { key: 'establishedYear', label: 'Established', sortable: true },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      render: (value) => (
        value ? (
          <span className="inline-block rounded text-xs font-medium bg-blue-50 text-blue-700">{value}</span>
        ) : '—'
      ),
    },
    {
      key: 'departments',
      label: 'Departments',
      sortable: false,
      render: (value) => {
        if (!Array.isArray(value) || value.length === 0) return '—';
        return (
          <div className="flex flex-wrap gap-1 max-w-xs">
            {value.map((dept, i) => (
              <span key={`${dept}-${i}`} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-700">
                {dept}
              </span>
            ))}
          </div>
        );
      }
    },
    { key: 'address', label: 'Address', sortable: true },
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
      render: (_value, row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEditHospital(row)}
            className="px-2 py-2 bg-blue-600 text-white rounded text-xs font-medium inline-flex items-center gap-1 hover:bg-blue-700 border-none"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDeleteHospital(row.id)}
            className="px-2 py-2 bg-red-500 text-white rounded text-xs font-medium inline-flex items-center gap-1 hover:bg-red-600 border-none"
          >
            <FaTrash />
          </button>
          <button
            onClick={() => handleViewHospital(row)}
            className="px-2 py-2 bg-blue-600 text-white rounded text-xs font-medium inline-flex items-center gap-1 hover:bg-blue-700 border-none"
          >
            <FaEye />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className='p-6 font-inter'>
      <div className="flex items-center justify-between mb-5">
        <h2 className="m-0 text-2xl font-semibold text-gray-800">Hospitals Management</h2>
        <button
          className="px-6 py-3 bg-emerald-500 text-white rounded-lg text-sm font-medium inline-flex items-center gap-2 shadow hover:bg-emerald-600 border-none"
          onClick={handleAddHospital}
        >
          <span className="text-base">+</span>
          Add New Hospital
        </button>
      </div>

      <CommonTable
        title="Hospitals"
        data={data?.hospitals ?? []}
        columns={columns}
        loading={loading}
        error={error}
        emptyMessage="No hospitals found"
      />

      <AddEditHospitalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        hospital={selectedHospital}
        isEdit={isEdit}
      />

      <ViewHospitalModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        hospital={viewingHospital}
      />
    </div>
  );
};

export default HospitalList;