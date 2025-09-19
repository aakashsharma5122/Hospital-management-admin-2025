import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { CREATE_PATIENT, UPDATE_PATIENT } from '../../../Graphql/mutations/patientsMutation';
import { GET_PATIENTS } from '../../../Graphql/query/patientsQuery';
import { DOCTOR_QUERY } from '../../../Graphql/query/DoctorQuery';

const AddEditPatientModel = ({ isOpen, onClose, patient = null, isEdit = false }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    age: 0,
    gender: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    bloodGroup: '',
    assaingnedDoctor: '',
    emergencyContact: {
      name: '',
      relationship: '',
      emergencyContact: ''
    }
  });

  // Load doctors for the Assigned Doctor dropdown
  const { data: doctorsData, loading: doctorsLoading, error: doctorsError } = useQuery(DOCTOR_QUERY);

  const [createPatient] = useMutation(CREATE_PATIENT, {
    refetchQueries: [{ query: GET_PATIENTS }],
    onCompleted: () => {
      toast.success('Patient added successfully!');
      onClose();
    },
    onError: (error) => {
      toast.error(`Error adding patient: ${error.message}`);
    }
  });

  const [updatePatient] = useMutation(UPDATE_PATIENT, {
    refetchQueries: [{ query: GET_PATIENTS }],
    onCompleted: () => {
      toast.success('Patient updated successfully!');
      onClose();
    },
    onError: (error) => {
      toast.error(`Error updating patient: ${error.message}`);
    }
  });

  useEffect(() => {
    if (isEdit && patient) {
      setFormData({
        firstName: patient.firstName || '',
        lastName: patient.lastName || '',
        email: patient.email || '',
        phoneNumber: patient.phoneNumber || '',
        age: patient.age || 0,
        gender: patient.gender || '',
        address: patient.address || '',
        city: patient.city || '',
        state: patient.state || '',
        zipCode: patient.zipCode || '',
        country: patient.country || '',
        bloodGroup: patient.bloodGroup || '',
        assaingnedDoctor: patient.assaingnedDoctor?.id || '',
        emergencyContact: {
          name: patient.emergencyContact?.name || '',
          relationship: patient.emergencyContact?.relationship || '',
          emergencyContact: patient.emergencyContact?.emergencyContact || ''
        }
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        age: 0,
        gender: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        bloodGroup: '',
        assaingnedDoctor: '',
        emergencyContact: {
          name: '',
          relationship: '',
          emergencyContact: ''
        }
      });
    }
  }, [isEdit, patient, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEmergencyChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        age: Number(formData.age)
      };

      if (isEdit && patient) {
        await updatePatient({
          variables: {
            updatePatientId: patient.id,
            input: payload
          }
        });
      } else {
        await createPatient({
          variables: {
            input: payload
          }
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center border-none">
      <div className="absolute inset-0 bg-black/50 border-none" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 md:p-8 font-inter"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="m-0 text-2xl font-semibold text-gray-800">
            {isEdit ? 'Edit Patient' : 'Add New Patient'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center border-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>
         <hr></hr>
        <form onSubmit={handleSubmit} className="space-y-5 py-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-none">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
              <input
                type="number"
                name="age"
                placeholder="Enter Age"
                value={formData.age}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Enter Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
              <input
                type="text"
                name="address"
                placeholder="Enter Address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
              <input
                type="text"
                name="city"
                placeholder="Enter City"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
              <input
                type="text"
                name="state"
                placeholder="Enter State"
                value={formData.state}
                onChange={handleInputChange}
                required
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code *</label>
              <input
                type="text"
                name="zipCode"
                placeholder="Enter Zip Code"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
              <input
                type="text"
                name="country"
                placeholder="Enter Country"
                value={formData.country}
                onChange={handleInputChange}
                required
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group *</label>
              <input
                type="text"
                name="bloodGroup"
                placeholder="e.g., A+"
                value={formData.bloodGroup}
                onChange={handleInputChange}
                required
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Doctor *</label>
              <select
                name="assaingnedDoctor"
                value={formData.assaingnedDoctor}
                onChange={handleInputChange}
                required
                disabled={doctorsLoading}
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="">{doctorsLoading ? 'Loading doctors...' : 'Select Doctor'}</option>
                {!doctorsLoading && !doctorsError && (doctorsData?.doctors || [])
                  .filter((doc) => doc.isActive)
                  .map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {`${doc.firstName ?? ''} ${doc.lastName ?? ''}`.trim()} {doc.specialization ? `- ${doc.specialization}` : ''}
                  </option>
                ))}
              </select>
              {doctorsError && (
                <p className="text-xs text-red-600 mt-1">Failed to load doctors.</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Name *</label>
              <input
                type="text"
                name="name"
                placeholder="Contact Name"
                value={formData.emergencyContact.name}
                onChange={handleEmergencyChange}
                required
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Relationship *</label>
              <input
                type="text"
                name="relationship"
                placeholder="Relationship"
                value={formData.emergencyContact.relationship}
                onChange={handleEmergencyChange}
                required
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Phone *</label>
              <input
                type="text"
                name="emergencyContact"
                placeholder="Phone"
                value={formData.emergencyContact.emergencyContact}
                onChange={handleEmergencyChange}
                required
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 text-sm hover:bg-gray-300 border-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 border-none"
            >
              {isEdit ? 'Update Patient' : 'Add Patient'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditPatientModel;
