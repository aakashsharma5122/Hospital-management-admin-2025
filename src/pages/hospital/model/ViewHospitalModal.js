import React from 'react';

const InfoRow = ({ label, value }) => (
  <div className="flex flex-col gap-1 p-3 rounded border border-gray-200 bg-gray-50">
    <div className="text-[11px] uppercase tracking-wide text-gray-500">{label}</div>
    <div className="text-sm text-gray-800">{value ?? '—'}</div>
  </div>
);

const ViewHospitalModal = ({ isOpen, onClose, hospital }) => {
  if (!isOpen || !hospital) return null;
  const departments = Array.isArray(hospital.departments) && hospital.departments.length > 0
    ? hospital.departments.join(', ')
    : '—';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="m-0 text-xl font-semibold text-gray-800">Hospital Details</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 border-none bg-transparent">✕</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InfoRow label="Hospital Name" value={hospital.hospitalName} />
          <InfoRow label="Phone Number" value={hospital.phoneNumber} />
          <InfoRow label="Email" value={hospital.email} />
          <InfoRow label="Website" value={hospital.website} />
          <InfoRow label="Number of Beds" value={hospital.numberOfBeds} />
          <InfoRow label="Established Year" value={hospital.establishedYear} />
          <InfoRow label="Address" value={hospital.address} />
          <InfoRow label="Departments" value={departments} />
          <InfoRow label="Status" value={hospital.isActive ? 'Active' : 'Inactive'} />
          <InfoRow label="ID" value={hospital.id} />
        </div>
        <div className="mt-5 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700 hover:bg-gray-50">Close</button>
        </div>
      </div>
    </div>
  );
};

export default ViewHospitalModal; 