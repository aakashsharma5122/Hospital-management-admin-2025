
const Dashboard = () => {
  const stats = [
    { title: 'Total Patients', value: '1,234', icon: '🏥', color: '#5f9ea0', change: '+12%', trend: 'up' },
    { title: 'Active Doctors', value: '89', icon: '👨‍⚕️', color: '#5f9ea0', change: '+5%', trend: 'up' },
    { title: 'Today Appointments', value: '156', icon: '📅', color: '#5f9ea0', change: '+8%', trend: 'up' },
  ];

  return (
    <div style={{ padding: '25px' }} className='font-inter'>
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
    </div>
  );
};

export default Dashboard;
