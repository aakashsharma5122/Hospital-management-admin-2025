import React from 'react';

const Dashboard = () => {
  const stats = [
    { title: 'Total Patients', value: '1,234', icon: '🏥', color: '#5f9ea0', change: '+12%', trend: 'up' },
    { title: 'Active Doctors', value: '89', icon: '👨‍⚕️', color: '#5f9ea0', change: '+5%', trend: 'up' },
    { title: 'Today Appointments', value: '156', icon: '📅', color: '#5f9ea0', change: '+8%', trend: 'up' },
    { title: 'Available Beds', value: '45', icon: '🛏️', color: '#5f9ea0', change: '-3%', trend: 'down' },
    { title: 'Pharmacy Orders', value: '78', icon: '💊', color: '#5f9ea0', change: '+15%', trend: 'up' },
    { title: 'Staff Members', value: '234', icon: '👩‍💼', color: '#5f9ea0', change: '+2%', trend: 'up' }
  ];

  const recentActivities = [
    { id: 1, action: 'New patient registered', user: 'Dr. Sarah Johnson', time: '2 minutes ago', type: 'patient', status: 'success' },
    { id: 2, action: 'Appointment scheduled', user: 'Dr. Michael Chen', time: '5 minutes ago', type: 'appointment', status: 'info' },
    { id: 3, action: 'Medicine dispensed', user: 'Pharmacy Staff', time: '8 minutes ago', type: 'pharmacy', status: 'success' },
    { id: 4, action: 'Lab report ready', user: 'Lab Technician', time: '12 minutes ago', type: 'lab', status: 'warning' },
    { id: 5, action: 'Emergency admission', user: 'Dr. Emily Davis', time: '15 minutes ago', type: 'emergency', status: 'error' },
    { id: 6, action: 'Staff shift change', user: 'Nursing Supervisor', time: '20 minutes ago', type: 'staff', status: 'info' }
  ];

  const upcomingAppointments = [
    { id: 1, patient: 'John Smith', doctor: 'Dr. Sarah Johnson', time: '09:00 AM', department: 'Cardiology', status: 'confirmed' },
    { id: 2, patient: 'Mary Johnson', doctor: 'Dr. Michael Chen', time: '09:30 AM', department: 'Dermatology', status: 'confirmed' },
    { id: 3, patient: 'Robert Brown', doctor: 'Dr. Emily Davis', time: '10:00 AM', department: 'Orthopedics', status: 'pending' },
    { id: 4, patient: 'Lisa Wilson', doctor: 'Dr. David Lee', time: '10:30 AM', department: 'Pediatrics', status: 'confirmed' }
  ];

  return (
    <div style={{ padding: '25px' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <div>
          <h1 style={{
            color: '#2c3e50',
            margin: '0 0 8px 0',
            fontSize: '32px',
            fontWeight: '700'
          }}>
            AS Group Hospital Dashboard
          </h1>
          <p style={{
            margin: 0,
            color: '#7f8c8d',
            fontSize: '16px'
          }}>
            Welcome to AS Group of Hospitals - Your comprehensive hospital management system
          </p>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 20px',
          backgroundColor: '#e8f5e8',
          borderRadius: '25px',
          border: '1px solid #5f9ea0'
        }}>
          <span style={{ fontSize: '16px' }}>🕐</span>
          <span style={{ color: '#5f9ea0', fontSize: '14px', fontWeight: '600' }}>
            {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '15px',
              padding: '25px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              border: '1px solid #e9ecef',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
            }}
          >
            {/* Decorative background */}
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '80px',
              height: '80px',
              background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`,
              borderRadius: '50%'
            }}></div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{ flex: 1 }}>
                <p style={{
                  margin: '0 0 8px 0',
                  color: '#6c757d',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  {stat.title}
                </p>
                <p style={{
                  margin: '0 0 8px 0',
                  color: '#2c3e50',
                  fontSize: '28px',
                  fontWeight: '700'
                }}>
                  {stat.value}
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <span style={{
                    color: stat.trend === 'up' ? '#5f9ea0' : '#F44336',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {stat.trend === 'up' ? '↗' : '↘'} {stat.change}
                  </span>
                  <span style={{
                    color: '#6c757d',
                    fontSize: '12px'
                  }}>
                    vs last month
                  </span>
                </div>
              </div>
              <div style={{
                fontSize: '40px',
                color: stat.color,
                opacity: 0.8
              }}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '25px',
        marginBottom: '30px'
      }}>
        {/* Recent Activities */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '15px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          border: '1px solid #e9ecef',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '20px',
            borderBottom: '1px solid #e9ecef',
            background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)'
          }}>
            <h3 style={{
              margin: 0,
              color: '#2c3e50',
              fontSize: '18px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span>📋</span>
              Recent Activities
            </h3>
          </div>
          
          <div style={{ padding: '0' }}>
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                style={{
                  padding: '15px 20px',
                  borderBottom: '1px solid #f1f3f4',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f8f9fa';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: activity.status === 'success' ? '#e8f5e8' : 
                                  activity.status === 'warning' ? '#fff3e0' :
                                  activity.status === 'error' ? '#ffebee' : '#e3f2fd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  border: `2px solid ${activity.status === 'success' ? '#5f9ea0' : 
                                        activity.status === 'warning' ? '#FF9800' :
                                        activity.status === 'error' ? '#F44336' : '#2196F3'}20`
                }}>
                  {activity.type === 'patient' ? '🏥' :
                   activity.type === 'appointment' ? '📅' :
                   activity.type === 'pharmacy' ? '💊' :
                   activity.type === 'lab' ? '🧪' :
                   activity.type === 'emergency' ? '🚨' : '👥'}
                </div>
                
                <div style={{ flex: 1 }}>
                  <p style={{
                    margin: '0 0 5px 0',
                    color: '#2c3e50',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    {activity.action}
                  </p>
                  <p style={{
                    margin: 0,
                    color: '#6c757d',
                    fontSize: '12px'
                  }}>
                    by {activity.user}
                  </p>
                </div>
                
                <div style={{
                  color: '#6c757d',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '15px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          border: '1px solid #e9ecef',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '20px',
            borderBottom: '1px solid #e9ecef',
            background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)'
          }}>
            <h3 style={{
              margin: 0,
              color: '#2c3e50',
              fontSize: '18px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span>📅</span>
              Today's Appointments
            </h3>
          </div>
          
          <div style={{ padding: '0' }}>
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                style={{
                  padding: '15px 20px',
                  borderBottom: '1px solid #f1f3f4',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f8f9fa';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: appointment.status === 'confirmed' ? '#e8f5e8' : '#fff3e0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  border: `2px solid ${appointment.status === 'confirmed' ? '#5f9ea0' : '#FF9800'}20`
                }}>
                  👨‍⚕️
                </div>
                
                <div style={{ flex: 1 }}>
                  <p style={{
                    margin: '0 0 5px 0',
                    color: '#2c3e50',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    {appointment.patient}
                  </p>
                  <p style={{
                    margin: '0 0 3px 0',
                    color: '#6c757d',
                    fontSize: '12px'
                  }}>
                    {appointment.doctor} • {appointment.department}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '10px',
                      fontWeight: '600',
                      backgroundColor: appointment.status === 'confirmed' ? '#e8f5e8' : '#fff3e0',
                      color: appointment.status === 'confirmed' ? '#5f9ea0' : '#f57c00'
                    }}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
                
                <div style={{
                  color: '#5f9ea0',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  {appointment.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '15px',
        padding: '25px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        border: '1px solid #e9ecef'
      }}>
        <h3 style={{
          margin: '0 0 20px 0',
          color: '#2c3e50',
          fontSize: '18px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span>⚡</span>
          Quick Actions
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px'
        }}>
          {[
            { label: 'New Patient', icon: '🏥', color: '#5f9ea0' },
            { label: 'Book Appointment', icon: '📅', color: '#5f9ea0' },
            { label: 'Pharmacy Order', icon: '💊', color: '#5f9ea0' },
            { label: 'Lab Report', icon: '🧪', color: '#5f9ea0' },
            { label: 'Staff Management', icon: '👥', color: '#5f9ea0' },
            { label: 'Emergency Alert', icon: '🚨', color: '#5f9ea0' }
          ].map((action, index) => (
            <button
              key={index}
              style={{
                padding: '15px',
                border: 'none',
                borderRadius: '10px',
                backgroundColor: '#f8f9fa',
                color: '#2c3e50',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.2s ease',
                border: `2px solid ${action.color}20`
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = `${action.color}10`;
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#f8f9fa';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <span style={{ fontSize: '18px' }}>{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
