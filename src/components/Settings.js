import React, { useState } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoRefresh: true,
    refreshInterval: 30,
    language: 'en',
    theme: 'light'
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const settingGroups = [
    {
      title: 'General Settings',
      icon: '⚙️',
      settings: [
        {
          key: 'language',
          label: 'Language',
          type: 'select',
          options: [
            { value: 'en', label: 'English' },
            { value: 'es', label: 'Spanish' },
            { value: 'fr', label: 'French' },
            { value: 'de', label: 'German' }
          ]
        },
        {
          key: 'theme',
          label: 'Theme',
          type: 'select',
          options: [
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'auto', label: 'Auto' }
          ]
        }
      ]
    },
    {
      title: 'Notifications',
      icon: '🔔',
      settings: [
        {
          key: 'notifications',
          label: 'Enable Notifications',
          type: 'toggle'
        }
      ]
    },
    {
      title: 'Data & Refresh',
      icon: '🔄',
      settings: [
        {
          key: 'autoRefresh',
          label: 'Auto Refresh Data',
          type: 'toggle'
        },
        {
          key: 'refreshInterval',
          label: 'Refresh Interval (seconds)',
          type: 'number',
          min: 10,
          max: 300,
          disabled: !settings.autoRefresh
        }
      ]
    }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{
        color: '#495057',
        marginBottom: '30px',
        fontSize: '28px',
        fontWeight: '600'
      }}>
        Settings
      </h1>

      <div style={{
        display: 'grid',
        gap: '20px',
        maxWidth: '800px'
      }}>
        {settingGroups.map((group, groupIndex) => (
          <div
            key={groupIndex}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              border: '1px solid #e9ecef',
              overflow: 'hidden'
            }}
          >
            {/* Group Header */}
            <div style={{
              padding: '20px',
              borderBottom: '1px solid #e9ecef',
              backgroundColor: '#f8f9fa'
            }}>
              <h3 style={{
                margin: 0,
                color: '#495057',
                fontSize: '18px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span>{group.icon}</span>
                {group.title}
              </h3>
            </div>

            {/* Group Settings */}
            <div style={{ padding: '20px' }}>
              {group.settings.map((setting, settingIndex) => (
                <div
                  key={settingIndex}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '15px 0',
                    borderBottom: settingIndex < group.settings.length - 1 ? '1px solid #e9ecef' : 'none'
                  }}
                >
                  <div>
                    <label style={{
                      color: '#495057',
                      fontSize: '14px',
                      fontWeight: '500',
                      margin: 0
                    }}>
                      {setting.label}
                    </label>
                  </div>

                  <div>
                    {setting.type === 'toggle' && (
                      <button
                        onClick={() => handleSettingChange(setting.key, !settings[setting.key])}
                        style={{
                          width: '50px',
                          height: '24px',
                          borderRadius: '12px',
                          border: 'none',
                          backgroundColor: settings[setting.key] ? '#5F9EA0' : '#6c757d',
                          cursor: 'pointer',
                          position: 'relative',
                          transition: 'background-color 0.2s ease'
                        }}
                      >
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          backgroundColor: 'white',
                          position: 'absolute',
                          top: '2px',
                          left: settings[setting.key] ? '28px' : '2px',
                          transition: 'left 0.2s ease',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }} />
                      </button>
                    )}

                    {setting.type === 'select' && (
                      <select
                        value={settings[setting.key]}
                        onChange={(e) => handleSettingChange(setting.key, e.target.value)}
                        style={{
                          padding: '8px 12px',
                          border: '1px solid #ced4da',
                          borderRadius: '4px',
                          backgroundColor: 'white',
                          color: '#495057',
                          fontSize: '14px',
                          cursor: 'pointer'
                        }}
                      >
                        {setting.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}

                    {setting.type === 'number' && (
                      <input
                        type="number"
                        value={settings[setting.key]}
                        onChange={(e) => handleSettingChange(setting.key, parseInt(e.target.value))}
                        min={setting.min}
                        max={setting.max}
                        disabled={setting.disabled}
                        style={{
                          width: '80px',
                          padding: '8px 12px',
                          border: '1px solid #ced4da',
                          borderRadius: '4px',
                          backgroundColor: setting.disabled ? '#f8f9fa' : 'white',
                          color: '#495057',
                          fontSize: '14px',
                          cursor: setting.disabled ? 'not-allowed' : 'text'
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div style={{
        marginTop: '30px',
        textAlign: 'center'
      }}>
        <button
          onClick={() => {
            // Here you would typically save settings to localStorage or API
            alert('Settings saved successfully!');
          }}
          style={{
            backgroundColor: '#5F9EA0',
            color: 'white',
            border: 'none',
            padding: '12px 30px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            boxShadow: '0 2px 4px rgba(95, 158, 160, 0.3)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#4a8a8c';
            e.target.style.transform = 'translateY(-1px)';
            e.target.style.boxShadow = '0 4px 8px rgba(95, 158, 160, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#5F9EA0';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 4px rgba(95, 158, 160, 0.3)';
          }}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
