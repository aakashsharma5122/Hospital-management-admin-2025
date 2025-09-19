import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaEye, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import CommonTable from '../../components/CommonTable';
import { GET_PATIENTS } from '../../Graphql/query/patientsQuery';
import { DELETE_PATIENT, TOGGLE_PATIENT_STATUS } from '../../Graphql/mutations/patientsMutation';
import AddEditPatientModel from './model/AddEditPatientModel';
import ViewPatientModal from './model/ViewPatientModal';

const PatientList = () => {
  const { data, loading, error } = useQuery(GET_PATIENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewingPatient, setViewingPatient] = useState(null);

  const [deletePatient] = useMutation(DELETE_PATIENT, {
    refetchQueries: [{ query: GET_PATIENTS }],
    onCompleted: () => toast.success('Patient deleted successfully!'),
    onError: (e) => toast.error(e.message)
  });

  // Mutation for toggling patient active status
  const [togglePatientStatus] = useMutation(TOGGLE_PATIENT_STATUS, {
    refetchQueries: [{ query: GET_PATIENTS }],
    onCompleted: () => toast.success('Patient status updated!'),
    onError: (e) => toast.error(e.message)
  });

  const handleAddPatient = () => {
    setSelectedPatient(null);
    setIsEdit(false);
    setIsModalOpen(true);
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleDeletePatient = async (patientId) => {
    if (!window.confirm('Are you sure you want to delete this patient?')) return;
    try {
      await deletePatient({ variables: { deletePatientId: patientId } });
    } catch (e) {
      // error toast handled in onError
    }
  };

  const handleViewPatient = (patient) => {
    setViewingPatient(patient);
    setIsViewOpen(true);
  };

  // Toggle patient isActive status using dedicated mutation
  const handleToggleStatus = async (patientId, currentIsActive) => {
    try {
      await togglePatientStatus({
        variables: {
          setPatientStatusId: patientId,
          isActive: !currentIsActive
        }
      });
    } catch (e) {
      // error toast handled in onError
    }
  };

  const columns = [
    {
      key: 'firstName',
      label: 'Name',
      sortable: true,
      render: (_value, row) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-800">{`${row.firstName ?? ''} ${row.lastName ?? ''}`.trim() || '—'}</span>
        </div>
      ),
    },
    { key: 'phoneNumber', label: 'Phone', sortable: true },
    { key: 'age', label: 'Age', sortable: true },
    {
      key: 'gender',
      label: 'Gender',
      sortable: true,
      render: (value) => (
        <span
          className={
            `px-2 py-0.5 rounded-full text-xs font-medium ` +
            (value === 'female'
              ? 'bg-pink-100 text-pink-700'
              : 'bg-blue-100 text-blue-700')
          }
        >
          {value || '—'}
        </span>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      render: (value) => (
        value ? (
          <span
            href={`mailto:${value}`}
            className="inline-block rounded text-xs font-medium bg-blue-50 text-blue-700"
          >
            {value}
          </span>
        ) : '—'
      ),
    },
    {
      key: 'bloodGroup',
      label: 'Blood Group',
      sortable: true,
      render: (value) => (
        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-cyan-700">
          {value || '—'}
        </span>
      ),
    },
    {
      key: 'assaingnedDoctor',
      label: 'Assigned Doctor',
      sortable: false,
      render: (_value, row) => {
        const doctor = row.assaingnedDoctor;
        if (!doctor) return '—';
        const fullName = `${doctor.firstName ?? ''} ${doctor.lastName ?? ''}`.trim();
        return (
          <div className="flex flex-col">
            <span className="text-gray-800">{fullName || '—'}</span>
            {doctor.specialization && (
              <span className="text-xs text-gray-500">{doctor.specialization}</span>
            )}
          </div>
        );
      },
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
      render: (_value, row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEditPatient(row)}
            className="px-2 py-2 bg-blue-600 text-white rounded text-xs font-medium inline-flex items-center gap-1 hover:bg-blue-700 border-none"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDeletePatient(row.id)}
            className="px-2 py-2 bg-red-500 text-white rounded text-xs font-medium inline-flex items-center gap-1 hover:bg-red-600 border-none"
          >
            <FaTrash />
          </button>
          <button
            onClick={() => handleViewPatient(row)}
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
        <h2 className="m-0 text-2xl font-semibold text-gray-800">Patients Management</h2>
        <button
          className="px-6 py-3 bg-emerald-500 text-white rounded-lg text-sm font-medium inline-flex items-center gap-2 shadow hover:bg-emerald-600 border-none"
          onClick={handleAddPatient}
        >
          <span className="text-base">+</span>
          Add New Patient
        </button>
      </div>
      <CommonTable
        title="Patients"
        data={data?.patients ?? []}
        columns={columns}
        loading={loading}
        error={error}
        emptyMessage="No patients found"
      />

      <AddEditPatientModel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        patient={selectedPatient}
        isEdit={isEdit}
      />

      <ViewPatientModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        patient={viewingPatient}
      />
    </div>
  );
};

export default PatientList;