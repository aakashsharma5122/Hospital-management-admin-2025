import React, { useState } from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleMenu = (menuId) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', type: 'single' },
    // { 
    //   id: 'patients', 
    //   label: 'Patient Management', 
    //   icon: '🏥', 
    //   type: 'submenu',
    //   subItems: [
    //     { id: 'patient-list', label: 'Patient List', icon: '👥' },
    //     { id: 'patient-registration', label: 'New Registration', icon: '📝' },
    //     { id: 'patient-history', label: 'Medical History', icon: '📋' }
    //   ]
    // },
    { 
      id: 'doctors', 
      label: 'Doctor Management', 
      icon: '👨‍⚕️', 
      type: 'submenu',
      subItems: [
        { id: 'doctor-list', label: 'Doctor List', icon: '👨‍⚕️' },

      ]
    },
    // { 
    //   id: 'staff', 
    //   label: 'Staff Management', 
    //   icon: '👩‍💼', 
    //   type: 'submenu',
    //   subItems: [
    //     { id: 'nursing-staff', label: 'Nursing Staff', icon: '👩‍⚕️' },
    //     { id: 'cleaning-staff', label: 'Cleaning Staff', icon: '🧹' },
    //     { id: 'security-staff', label: 'Security Staff', icon: '🛡️' },
    //     { id: 'admin-staff', label: 'Admin Staff', icon: '👨‍💼' }
    //   ]
    // },
    // { 
    //   id: 'pharmacy', 
    //   label: 'Pharmacy', 
    //   icon: '💊', 
    //   type: 'submenu',
    //   subItems: [
    //     { id: 'medicine-inventory', label: 'Medicine Inventory', icon: '💊' },
    //     { id: 'prescriptions', label: 'Prescriptions', icon: '📋' },
    //     { id: 'suppliers', label: 'Suppliers', icon: '🚚' }
    //   ]
    // },
    // { 
    //   id: 'appointments', 
    //   label: 'Appointments', 
    //   icon: '📅', 
    //   type: 'submenu',
    //   subItems: [
    //     { id: 'appointment-list', label: 'All Appointments', icon: '📅' },
    //     { id: 'appointment-booking', label: 'Book Appointment', icon: '➕' },
    //     { id: 'appointment-calendar', label: 'Calendar View', icon: '📆' }
    //   ]
    // },
    // { 
    //   id: 'billing', 
    //   label: 'Billing & Finance', 
    //   icon: '💰', 
    //   type: 'submenu',
    //   subItems: [
    //     { id: 'patient-bills', label: 'Patient Bills', icon: '🧾' },
    //     { id: 'insurance', label: 'Insurance', icon: '🛡️' },
    //     { id: 'payments', label: 'Payments', icon: '💳' }
    //   ]
    // },
    // { 
    //   id: 'reports', 
    //   label: 'Reports & Analytics', 
    //   icon: '📊', 
    //   type: 'submenu',
    //   subItems: [
    //     { id: 'patient-reports', label: 'Patient Reports', icon: '📈' },
    //     { id: 'financial-reports', label: 'Financial Reports', icon: '💹' },
    //     { id: 'staff-reports', label: 'Staff Reports', icon: '👥' }
    //   ]
    // },
    // { 
    //   id: 'inventory', 
    //   label: 'Inventory Management', 
    //   icon: '📦', 
    //   type: 'submenu',
    //   subItems: [
    //     { id: 'medical-equipment', label: 'Medical Equipment', icon: '🩺' },
    //     { id: 'hospital-supplies', label: 'Hospital Supplies', icon: '🏥' },
    //     { id: 'maintenance', label: 'Maintenance', icon: '🔧' }
    //   ]
    // },
    // { 
    //   id: 'promotions', 
    //   label: 'Promotions & Ads', 
    //   icon: '📢', 
    //   type: 'submenu',
    //   subItems: [
    //     { id: 'health-campaigns', label: 'Health Campaigns', icon: '🎯' },
    //     { id: 'advertisements', label: 'Advertisements', icon: '📺' },
    //     { id: 'events', label: 'Events', icon: '🎉' }
    //   ]
    // },
    { id: 'settings', label: 'Settings', icon: '⚙️', type: 'single' }
  ];

  return (
    <div style={{
      width: '280px',
      height: '100vh',
      background: '#5f9ea0',
    //   background: 'linear-gradient(180deg, #1976D2 0%, #4CAF50 100%)',
      borderRight: '1px solid #e9ecef',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 1000,
      boxShadow: '2px 0 10px rgba(0,0,0,0.08)',
      overflowY: 'auto'
    }}>
      {/* Logo/Header */}
      <div style={{
        padding: '25px 20px',
        borderBottom: '1px solid #e9ecef',
        // background: 'linear-gradient(135deg, #1976D2, #4CAF50)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '60px',
          height: '60px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          width: '80px',
          height: '80px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '50%'
        }}></div>
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '8px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              <img 
                src="/logo-for-my-admin.png" 
                alt="AS Group of Hospitals" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
              />
            </div>
            <h2 style={{
              margin: 0,
              fontSize: '20px',
              fontWeight: '700'
            }}>
              AS Group
            </h2>
          </div>
          <p style={{
            margin: 0,
            fontSize: '12px',
            opacity: 0.9
          }}>
            Hospital Management System
          </p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav style={{ padding: '15px 0' }}>
        {menuItems.map((item) => (
          <div key={item.id}>
            {item.type === 'single' ? (
              <button
                onClick={() => setActiveTab(item.id)}
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  border: 'none',
                  backgroundColor: activeTab === item.id ? '#e8f5e8' : 'transparent',
                  color: activeTab === item.id ? '#2e7d32' : '#495057',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: activeTab === item.id ? '600' : '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.2s ease',
                  borderLeft: activeTab === item.id ? '4px solid #4CAF50' : '4px solid transparent',
                  margin: '2px 0'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== item.id) {
                    e.target.style.backgroundColor = '#f1f8e9';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== item.id) {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span style={{ fontSize: '16px' }}>{item.icon}</span>
                {item.label}
              </button>
            ) : (
              <div>
                <button
                  onClick={() => toggleMenu(item.id)}
                  style={{
                    width: '100%',
                    padding: '12px 20px',
                    border: 'none',
                    backgroundColor: expandedMenus[item.id] ? '#e8f5e8' : 'transparent',
                    color: expandedMenus[item.id] ? '#2e7d32' : '#495057',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: expandedMenus[item.id] ? '600' : '500',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease',
                    borderLeft: expandedMenus[item.id] ? '4px solid #4CAF50' : '4px solid transparent',
                    margin: '2px 0'
                  }}
                  onMouseEnter={(e) => {
                    if (!expandedMenus[item.id]) {
                      e.target.style.backgroundColor = '#f1f8e9';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!expandedMenus[item.id]) {
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '16px' }}>{item.icon}</span>
                    {item.label}
                  </div>
                  <span style={{
                    fontSize: '12px',
                    transform: expandedMenus[item.id] ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease'
                  }}>
                    ▶
                  </span>
                </button>
                
                {expandedMenus[item.id] && (
                  <div style={{ paddingLeft: '20px' }}>
                    {item.subItems.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => setActiveTab(subItem.id)}
                        style={{
                          width: '100%',
                          padding: '10px 20px',
                          border: 'none',
                          backgroundColor: activeTab === subItem.id ? '#e8f5e8' : 'transparent',
                          color: activeTab === subItem.id ? '#2e7d32' : '#6c757d',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontWeight: activeTab === subItem.id ? '600' : '400',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          transition: 'all 0.2s ease',
                          borderLeft: activeTab === subItem.id ? '3px solid #4CAF50' : '3px solid transparent',
                          margin: '1px 0'
                        }}
                        onMouseEnter={(e) => {
                          if (activeTab !== subItem.id) {
                            e.target.style.backgroundColor = '#f1f8e9';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (activeTab !== subItem.id) {
                            e.target.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        <span style={{ fontSize: '14px' }}>{subItem.icon}</span>
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      {/* <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        right: '20px',
        padding: '15px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e9ecef',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '5px'
        }}>
          <div style={{
            width: '16px',
            height: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            <img 
              src="/logo-for-my-admin.png" 
              alt="AS Group" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
          </div>
          <p style={{
            margin: 0,
            color: '#6c757d',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            AS Group v2.0
          </p>
        </div>
        <p style={{
          margin: 0,
          color: '#adb5bd',
          fontSize: '10px'
        }}>
          Hospital Management System
        </p>
      </div> */}
    </div>
  );
};

export default Sidebar;
