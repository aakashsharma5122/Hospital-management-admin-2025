import React, { useEffect, useMemo, useState } from 'react';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { ADD_HOSPITALS, UPDATE_HOSPITALS } from '../../../Graphql/mutations/HospitalMutation';
import { GET_HOSPITALS } from '../../../Graphql/query/HospitalQuery';

const initialFormState = {
  hospitalName: '',
  address: '',
  phoneNumber: '',
  email: '',
  website: '',
  numberOfBeds: '',
  establishedYear: '',
  departments: '' // comma separated input; will convert to array
};

const AddEditHospitalModal = ({ isOpen, onClose, hospital, isEdit }) => {
  const [form, setForm] = useState(initialFormState);
  const [saving, setSaving] = useState(false);

  const [addHospital] = useMutation(ADD_HOSPITALS, {
    refetchQueries: [{ query: GET_HOSPITALS }],
  });
  const [updateHospital] = useMutation(UPDATE_HOSPITALS, {
    refetchQueries: [{ query: GET_HOSPITALS }],
  });

  useEffect(() => {
    if (isOpen) {
      if (isEdit && hospital) {
        setForm({
          hospitalName: hospital.hospitalName ?? '',
          address: hospital.address ?? '',
          phoneNumber: hospital.phoneNumber ?? '',
          email: hospital.email ?? '',
          website: hospital.website ?? '',
          numberOfBeds: hospital.numberOfBeds ?? '',
          establishedYear: hospital.establishedYear ?? '',
          departments: Array.isArray(hospital.departments) ? hospital.departments.join(', ') : ''
        });
      } else {
        setForm(initialFormState);
      }
    }
  }, [isOpen, isEdit, hospital]);

  const isValid = useMemo(() => {
    return (
      form.hospitalName.trim() &&
      form.address.trim() &&
      form.phoneNumber.trim() &&
      form.numberOfBeds !== '' &&
      form.establishedYear !== ''
    );
  }, [form]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) {
      toast.warn('Please fill required fields');
      return;
    }

    setSaving(true);
    const departmentsArray = form.departments
      .split(',')
      .map((d) => d.trim())
      .filter((d) => d.length > 0);

    const input = {
      website: form.website || null,
      phoneNumber: form.phoneNumber,
      numberOfBeds: Number(form.numberOfBeds),
      hospitalName: form.hospitalName,
      establishedYear: Number(form.establishedYear),
      email: form.email || null,
      departments: departmentsArray,
      address: form.address,
    };

    try {
      if (isEdit && hospital?.id) {
        await updateHospital({
          variables: {
            updateHospitalId: hospital.id,
            input,
          },
        });
        toast.success('Hospital updated successfully!');
      } else {
        await addHospital({
          variables: {
            input,
          },
        });
        toast.success('Hospital created successfully!');
      }
      onClose?.();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="m-0 text-xl font-semibold text-gray-800">{isEdit ? 'Edit Hospital' : 'Add Hospital'}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 border-none bg-transparent">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Hospital Name *</label>
            <input name="hospitalName" value={form.hospitalName} onChange={onChange} className="w-full rounded border border-gray-300 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Phone Number *</label>
            <input name="phoneNumber" value={form.phoneNumber} onChange={onChange} className="w-full rounded border border-gray-300 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Number of Beds *</label>
            <input name="numberOfBeds" type="number" value={form.numberOfBeds} onChange={onChange} className="w-full rounded border border-gray-300 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Established Year *</label>
            <input name="establishedYear" type="number" value={form.establishedYear} onChange={onChange} className="w-full rounded border border-gray-300 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input name="email" type="email" value={form.email} onChange={onChange} className="w-full rounded border border-gray-300 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Website</label>
            <input name="website" value={form.website} onChange={onChange} className="w-full rounded border border-gray-300 px-3 py-2 text-sm" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Address *</label>
            <input name="address" value={form.address} onChange={onChange} className="w-full rounded border border-gray-300 px-3 py-2 text-sm" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Departments (comma separated)</label>
            <input name="departments" value={form.departments} onChange={onChange} className="w-full rounded border border-gray-300 px-3 py-2 text-sm" placeholder="cardiology, orthopedics" />
          </div>

          <div className="sm:col-span-2 flex items-center justify-end gap-2 mt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700 hover:bg-gray-50">Cancel</button>
            <button type="submit" disabled={saving || !isValid} className={`px-4 py-2 rounded text-sm text-white ${saving || !isValid ? 'bg-emerald-300 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-600'}`}>
              {saving ? 'Saving...' : (isEdit ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditHospitalModal; 