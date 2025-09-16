import React, { useState } from 'react';

const CommonTable = ({ 
  data = [], 
  columns = [], 
  loading = false, 
  error = null, 
  onRefresh = null,
  title = "Data Table",
  emptyMessage = "No data available"
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Handle sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      
      if (aVal < bVal) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aVal > bVal) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Loading state
  if (loading) {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '40px',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #007bff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 20px'
        }}></div>
        <p style={{ color: '#6c757d', fontSize: '16px', margin: 0 }}>
          Loading {title.toLowerCase()}...
        </p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '30px',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        border: '1px solid #f8d7da'
      }}>
        <div style={{ color: '#dc3545', fontSize: '24px', marginBottom: '15px' }}>
          ⚠️
        </div>
        <h3 style={{ color: '#dc3545', margin: '0 0 10px 0' }}>
          Error loading {title.toLowerCase()}
        </h3>
        <p style={{ color: '#6c757d', margin: '0 0 20px 0' }}>
          {error.message}
        </p>
        {onRefresh && (
          <button
            onClick={onRefresh}
            style={{
              backgroundColor: '#5F9EA0',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
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
            Try Again
          </button>
        )}
      </div>
    );
  }

  // Empty state
  if (!data || data.length === 0) {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '40px',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ color: '#6c757d', fontSize: '48px', marginBottom: '20px' }}>
          📊
        </div>
        <h3 style={{ color: '#495057', margin: '0 0 10px 0' }}>
          {emptyMessage}
        </h3>
        <p style={{ color: '#6c757d', margin: 0 }}>
          There are no {title.toLowerCase()} to display at the moment.
        </p>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    }}>
      {/* Table Header */}
      <div style={{
        padding: '20px',
        borderBottom: '1px solid #e9ecef',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{
            margin: 0,
            color: '#495057',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            {title}
          </h3>
          {onRefresh && (
            <button
              onClick={onRefresh}
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#45a049';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#4CAF50';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              🔄 Refresh
            </button>
          )}
        </div>
        <p style={{
          margin: '5px 0 0 0',
          color: '#6c757d',
          fontSize: '14px'
        }}>
          {data.length} {data.length === 1 ? 'item' : 'items'} found
        </p>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '14px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => column.sortable && handleSort(column.key)}
                  style={{
                    padding: '15px 12px',
                    textAlign: 'left',
                    fontWeight: '600',
                    color: '#495057',
                    borderBottom: '2px solid #e9ecef',
                    cursor: column.sortable ? 'pointer' : 'default',
                    userSelect: 'none',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    {column.label}
                    {column.sortable && (
                      <span style={{ fontSize: '12px', color: '#6c757d' }}>
                        {sortConfig.key === column.key
                          ? sortConfig.direction === 'asc' ? '↑' : '↓'
                          : '↕️'
                        }
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <tr
                key={row.id || index}
                style={{
                  borderBottom: '1px solid #e9ecef',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f8f9fa';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    style={{
                      padding: '12px',
                      color: '#495057',
                      borderBottom: '1px solid #e9ecef'
                    }}
                  >
                    {column.render 
                      ? column.render(row[column.key], row)
                      : row[column.key]
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommonTable;
