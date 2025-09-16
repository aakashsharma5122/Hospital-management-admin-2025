import React from 'react';
import { useQuery, gql } from '@apollo/client';
import CommonTable from './CommonTable';

// GraphQL query to fetch users data
const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

// Users component that displays a list of users
const Users = () => {
  // Use Apollo's useQuery hook to fetch data
  const { loading, error, data, refetch } = useQuery(GET_USERS);

  // Define table columns
  const columns = [
    {
      key: 'id',
      label: 'ID',
      sortable: true
    },
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (value) => (
        <span style={{ fontWeight: '600', color: '#495057' }}>
          {value || 'No Name'}
        </span>
      )
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      render: (value) => (
        <span style={{ color: '#007bff' }}>
          {value || 'No Email'}
        </span>
      )
    }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <CommonTable
        data={data?.users || []}
        columns={columns}
        loading={loading}
        error={error}
        onRefresh={refetch}
        title="Users"
        emptyMessage="No users found"
      />
    </div>
  );
};

export default Users;
