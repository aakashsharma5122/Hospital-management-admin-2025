import React from 'react';
import { useQuery, gql } from '@apollo/client';
import CommonTable from './CommonTable';

// GraphQL query to fetch posts data
const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      content
      publishedAt
      author {
        id
        name
        email
      }
    }
  }
`;

// Posts component that displays a list of posts
const Posts = () => {
  // Use Apollo's useQuery hook to fetch data
  const { loading, error, data, refetch } = useQuery(GET_POSTS);

  // Define table columns
  const columns = [
    {
      key: 'id',
      label: 'ID',
      sortable: true
    },
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      render: (value) => (
        <span style={{ fontWeight: '600', color: '#495057' }}>
          {value}
        </span>
      )
    },
    {
      key: 'content',
      label: 'Content',
      sortable: false,
      render: (value) => (
        <span style={{ 
          color: '#6c757d',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          maxWidth: '300px'
        }}>
          {value}
        </span>
      )
    },
    {
      key: 'author',
      label: 'Author',
      sortable: true,
      render: (author) => (
        <div>
          <div style={{ fontWeight: '500', color: '#495057' }}>
            {author?.name}
          </div>
          <div style={{ fontSize: '12px', color: '#6c757d' }}>
            {author?.email}
          </div>
        </div>
      )
    },
    {
      key: 'publishedAt',
      label: 'Published',
      sortable: true,
      render: (value) => (
        <span style={{ 
          color: '#6c757d',
          fontSize: '12px'
        }}>
          {new Date(value).toLocaleDateString()}
        </span>
      )
    }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <CommonTable
        data={data?.posts || []}
        columns={columns}
        loading={loading}
        error={error}
        onRefresh={refetch}
        title="Posts"
        emptyMessage="No posts found"
      />
    </div>
  );
};

export default Posts;
