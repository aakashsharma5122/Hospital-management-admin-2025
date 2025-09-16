import React, { useState } from 'react';
import { toast } from 'react-toastify';
import CommonTable from './CommonTable';

const PatientManagement = () => {
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'John Smith',
      age: 45,
      gender: 'Male',
      phone: '+1-555-0123',
      email: 'john.smith@email.com',
      admissionDate: '2024-01-15',
      department: 'Cardiology',
      status: 'Active',
      doctor: 'Dr. Sarah Johnson'
    },
    {
      id: 2,
      name: 'Mary Johnson',
      age: 32,
      gender: 'Female',
      phone: '+1-555-0124',
      email: 'mary.johnson@email.com',
      admissionDate: '2024-01-14',
      department: 'Dermatology',
      status: 'Discharged',
      doctor: 'Dr. Michael Chen'
    },
    {
      id: 3,
      name: 'Robert Brown',
      age: 67,
      gender: 'Male',
      phone: '+1-555-0125',
      email: 'robert.brown@email.com',
      admissionDate: '2024-01-13',
      department: 'Orthopedics',
      status: 'Active',
      doctor: 'Dr. Emily Davis'
    },
    {
      id: 4,
      name: 'Lisa Wilson',
      age: 28,
      gender: 'Female',
      phone: '+1-555-0126',
      email: 'lisa.wilson@email.com',
      admissionDate: '2024-01-12',
      department: 'Pediatrics',
      status: 'Active',
      doctor: 'Dr. David Lee'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    department: '',
    doctor: ''
  });

  const columns = [
    {
      key: 'id',
      label: 'ID',
      sortable: true
    },
    {
      key: 'name',
      label: 'Patient Name',
      sortable: true,
      render: (value) => (
        <span style={{ fontWeight: '600', color: '#2c3e50' }}>
          {value}
        </span>
      )
    },
    {
      key: 'age',
      label: 'Age',
      sortable: true
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
      key: 'phone',
      label: 'Phone',
      sortable: false
    },
    {
      key: 'department',
      label: 'Department',
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
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => (
        <span style={{
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '500',
          backgroundColor: value === 'Active' ? '#e8f5e8' : '#fff3e0',
          color: value === 'Active' ? '#2e7d32' : '#f57c00'
        }}>
          {value}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (value, row) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => handleEdit(row.id)}
            style={{
              padding: '4px 8px',
              backgroundColor: '#4682B4',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#3a6b8a';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#4682B4';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            style={{
              padding: '4px 8px',
              backgroundColor: '#F44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#d32f2f';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#F44336';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Delete
          </button>
        </div>
      )
    }
  ];

  const handleEdit = (id) => {
    toast.info(`Editing patient with ID: ${id}`);
  };

  const handleDelete = (id) => {
    setPatients(patients.filter(patient => patient.id !== id));
    toast.success('Patient deleted successfully');
  };

  const handleAddPatient = () => {
    if (newPatient.name && newPatient.age && newPatient.gender) {
      const patient = {
        ...newPatient,
        id: patients.length + 1,
        admissionDate: new Date().toISOString().split('T')[0],
        status: 'Active'
      };
      setPatients([...patients, patient]);
      setNewPatient({
        name: '',
        age: '',
        gender: '',
        phone: '',
        email: '',
        department: '',
        doctor: ''
      });
      setShowAddForm(false);
      toast.success('Patient added successfully');
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  return (
    <div style={{ padding: '25px' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px'
      }}>
        <div>
          <h1 style={{
            color: '#2c3e50',
            margin: '0 0 8px 0',
            fontSize: '28px',
            fontWeight: '700'
          }}>
            AS Group - Patient Management
          </h1>
          <p style={{
            margin: 0,
            color: '#7f8c8d',
            fontSize: '16px'
          }}>
            Manage patient records, admissions, and medical information
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          style={{
            padding: '12px 20px',
            backgroundColor: '#5F9EA0',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 8px rgba(95, 158, 160, 0.3)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 12px rgba(95, 158, 160, 0.4)';
            e.target.style.backgroundColor = '#4a8a8c';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 8px rgba(95, 158, 160, 0.3)';
            e.target.style.backgroundColor = '#5F9EA0';
          }}
        >
          <span>➕</span>
          Add New Patient
        </button>
      </div>

      {/* Add Patient Form */}
      {showAddForm && (
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '25px',
          marginBottom: '25px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{
            margin: '0 0 20px 0',
            color: '#2c3e50',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            Add New Patient
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '20px'
          }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#2c3e50',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                Full Name *
              </label>
              <input
                type="text"
                value={newPatient.name}
                onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid #e9ecef',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                placeholder="Enter patient name"
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#2c3e50',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                Age *
              </label>
              <input
                type="number"
                value={newPatient.age}
                onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid #e9ecef',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                placeholder="Enter age"
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#2c3e50',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                Gender *
              </label>
              <select
                value={newPatient.gender}
                onChange={(e) => setNewPatient({...newPatient, gender: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid #e9ecef',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#2c3e50',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                Phone Number
              </label>
              <input
                type="tel"
                value={newPatient.phone}
                onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid #e9ecef',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#2c3e50',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                Email
              </label>
              <input
                type="email"
                value={newPatient.email}
                onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid #e9ecef',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                placeholder="Enter email address"
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#2c3e50',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                Department
              </label>
              <select
                value={newPatient.department}
                onChange={(e) => setNewPatient({...newPatient, department: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid #e9ecef',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
              >
                <option value="">Select Department</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Neurology">Neurology</option>
                <option value="Oncology">Oncology</option>
              </select>
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'flex-end'
          }}>
            <button
              onClick={() => setShowAddForm(false)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#FF9800',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f57c00';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#FF9800';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleAddPatient}
              style={{
                padding: '10px 20px',
                backgroundColor: '#5F9EA0',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#4a8a8c';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#5F9EA0';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Add Patient
            </button>
          </div>
        </div>
      )}

      {/* Patient Table */}
      <CommonTable
        data={patients}
        columns={columns}
        loading={false}
        error={null}
        onRefresh={() => toast.info('Refreshing patient data...')}
        title="Patient Records"
        emptyMessage="No patients found"
      />
    </div>
  );
};

export default PatientManagement;
