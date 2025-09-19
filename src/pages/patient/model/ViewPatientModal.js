import React from 'react';

const ViewPatientModal = ({ isOpen, onClose, patient }) => {
  if (!isOpen || !patient) return null;

  const doctor = patient.assaingnedDoctor;
  const emergency = patient.emergencyContact;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center border-none">
      <div className="absolute inset-0 bg-black/50 border-none" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl p-6 w-full max-w-3xl font-inter">
        <div className="flex items-center justify-between mb-4">
          <h3 className="m-0 text-xl font-semibold text-gray-800">Patient Details</h3>
          <button className="w-8 h-8 rounded-full hover:bg-gray-100 border-none" onClick={onClose}>×</button>
        </div>
        <hr className='my-4' />

        {/* Patient Info */}
        <h4 className="m-0 mb-2 text-base font-semibold text-gray-700">General Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-4">
          <div><span className="text-gray-500">ID:</span> {patient.id}</div>
          <div><span className="text-gray-500">Status:</span> {patient.isActive ? 'Active' : 'Inactive'}</div>
          <div><span className="text-gray-500">Name:</span> {patient.firstName} {patient.lastName}</div>
          <div><span className="text-gray-500">Email:</span> {patient.email}</div>
          <div><span className="text-gray-500">Phone:</span> {patient.phoneNumber}</div>
          <div><span className="text-gray-500">Gender:</span> {patient.gender}</div>
          <div><span className="text-gray-500">Age:</span> {patient.age}</div>
          <div><span className="text-gray-500">Blood Group:</span> {patient.bloodGroup}</div>
          <div className="md:col-span-2"><span className="text-gray-500">Address:</span> {patient.address}</div>
          <div><span className="text-gray-500">City:</span> {patient.city}</div>
          <div><span className="text-gray-500">State:</span> {patient.state}</div>
          <div><span className="text-gray-500">Zip Code:</span> {patient.zipCode}</div>
          <div><span className="text-gray-500">Country:</span> {patient.country}</div>
          <div><span className="text-gray-500">Created At:</span> {patient.createdAt ? new Date(patient.createdAt).toLocaleString() : '—'}</div>
          <div><span className="text-gray-500">Updated At:</span> {patient.updatedAt ? new Date(patient.updatedAt).toLocaleString() : '—'}</div>
        </div>
       <hr className='my-4' />
        {/* Assigned Doctor */}
        <h4 className="m-0 mb-2 text-base font-semibold text-gray-700">Assigned Doctor</h4>
        {doctor ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-4">
            <div><span className="text-gray-500">ID:</span> {doctor.id}</div>
            <div><span className="text-gray-500">Name:</span> {doctor.firstName} {doctor.lastName}</div>
            <div><span className="text-gray-500">Phone:</span> {doctor.phoneNumber}</div>
            <div><span className="text-gray-500">Email:</span> {doctor.email}</div>
            <div><span className="text-gray-500">Age:</span> {doctor.age}</div>
            <div><span className="text-gray-500">Gender:</span> {doctor.gender}</div>
            <div><span className="text-gray-500">Experience:</span> {doctor.experiance} years</div>
            <div><span className="text-gray-500">Specialization:</span> {doctor.specialization}</div>
            <div><span className="text-gray-500">Qualification:</span> {doctor.qualification}</div>
            <div><span className="text-gray-500">Shift:</span> {doctor.shifttiming}</div>
            <div><span className="text-gray-500">Is Surgeon:</span> {doctor.isSurgeon ? 'Yes' : 'No'}</div>
            <div><span className="text-gray-500">Active:</span> {doctor.isActive ? 'Yes' : 'No'}</div>
          </div>
        ) : (
          <p className="text-sm text-gray-500 mb-4">No doctor assigned.</p>
        )}
       <hr className='my-4' />

        {/* Emergency Contact */}
        <h4 className="m-0 mb-2 text-base font-semibold text-gray-700">Emergency Contact</h4>
        {emergency ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm mb-4">
            <div><span className="text-gray-500">Name:</span> {emergency.name}</div>
            <div><span className="text-gray-500">Relationship:</span> {emergency.relationship}</div>
            <div><span className="text-gray-500">Phone:</span> {emergency.emergencyContact}</div>
          </div>
        ) : (
          <p className="text-sm text-gray-500 mb-4">No emergency contact provided.</p>
        )}

        <div className="mt-4 text-right">
          <button className="px-4 py-2 rounded bg-blue-600 text-white text-sm border-none" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ViewPatientModal; 