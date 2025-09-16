# GraphQL React App with Dummy API

A complete React.js application with GraphQL integration using Apollo Client and a local GraphQL server. This project demonstrates how to set up and use Apollo Client to fetch data from a GraphQL endpoint with a fully functional dummy API.

## Features

- ✅ React.js with functional components and hooks
- ✅ Apollo Client integration
- ✅ Local GraphQL server with dummy data
- ✅ GraphQL query implementation
- ✅ Loading and error state handling
- ✅ Authentication header support
- ✅ Responsive design with tab navigation
- ✅ Modern UI with CSS animations
- ✅ Users and Posts data display
- ✅ GraphQL Playground for testing queries

## Project Structure

```
├── server.js                 # GraphQL server with dummy data
├── test-server.js           # Test script for GraphQL server
├── src/
│   ├── ApolloProvider.js    # Apollo Client configuration
│   ├── components/
│   │   ├── Users.js         # Users component with GraphQL query
│   │   └── Posts.js         # Posts component with GraphQL query
│   ├── App.js               # Main App component with tab navigation
│   ├── index.js             # Entry point with Apollo Provider
│   └── index.css            # Global styles
└── package.json             # Dependencies and scripts
```

## Setup Instructions

### 1. Prerequisites

Make sure you have Node.js installed on your system.

### 2. Installation

The project is already set up with all necessary dependencies:

```bash
# Dependencies already installed:
# - @apollo/client
# - graphql
# - react
# - react-dom
```

### 3. Configuration

#### Update GraphQL Endpoint

Edit `src/ApolloProvider.js` and replace the GraphQL endpoint:

```javascript
const httpLink = createHttpLink({
  uri: 'https://your-actual-graphql-endpoint.com/graphql', // Replace with your endpoint
});
```

#### Authentication (Optional)

If your GraphQL endpoint requires authentication, the app is already configured to handle it:

1. **JWT Token**: Store your authentication token in localStorage with the key `auth-token`
2. **Custom Headers**: Modify the `authLink` in `ApolloProvider.js` to add custom headers

Example for custom authentication:
```javascript
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('auth-token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      'x-api-key': 'your-api-key', // Add custom headers if needed
    }
  }
});
```

### 4. Running the Application

You have several options to run the application:

#### Option 1: Run Both Servers Together (Recommended)
```bash
# This will start both the GraphQL server and React app
npm run dev
```

#### Option 2: Run Servers Separately
```bash
# Terminal 1: Start GraphQL server
npm run server

# Terminal 2: Start React app
npm start
```

#### Option 3: Run Only React App (if GraphQL server is already running)
```bash
npm start
```

### 5. Accessing the Application

- **React App**: http://localhost:3000 (or 3001 if 3000 is busy)
- **GraphQL Server**: http://localhost:4000/graphql
- **GraphQL Playground**: http://localhost:4000/graphql (for testing queries)

### 6. GraphQL Queries

The app uses the following GraphQL queries:

#### Users Query
```graphql
query GetUsers {
  users {
    id
    name
    email
    age
    department
  }
}
```

#### Posts Query
```graphql
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
```

### 7. Available GraphQL Operations

The dummy API supports the following operations:

#### Queries
- `users` - Get all users
- `user(id: ID!)` - Get a specific user
- `posts` - Get all posts
- `post(id: ID!)` - Get a specific post

#### Mutations
- `createUser(name: String!, email: String!, age: Int, department: String)` - Create a new user
- `updateUser(id: ID!, name: String, email: String, age: Int, department: String)` - Update a user
- `deleteUser(id: ID!)` - Delete a user

### 8. Testing the GraphQL Server

You can test the GraphQL server using the included test script:

```bash
node test-server.js
```

Or visit the GraphQL Playground at http://localhost:4000/graphql to test queries interactively.

## Key Components Explained

### ApolloProvider.js

- **Apollo Client Setup**: Configures the Apollo Client with HTTP link and InMemoryCache
- **Authentication**: Handles authentication headers automatically
- **Error Policy**: Configured to show both data and errors for better debugging

### Users.js

- **useQuery Hook**: Uses Apollo's `useQuery` hook to fetch data
- **Loading State**: Shows a spinner while data is loading
- **Error Handling**: Displays error messages with retry functionality
- **Data Display**: Renders user data in a responsive grid layout

### Features Implemented

1. **Loading States**: Animated spinner during data fetching
2. **Error Handling**: User-friendly error messages with retry buttons
3. **Responsive Design**: Grid layout that adapts to different screen sizes
4. **Authentication**: Automatic token handling for authenticated requests
5. **Caching**: InMemoryCache for efficient data management
6. **Refresh Functionality**: Manual refresh button to refetch data

## Customization

### Adding New Queries

To add new GraphQL queries:

1. Create a new component in `src/components/`
2. Import `useQuery` and `gql` from `@apollo/client`
3. Define your GraphQL query using `gql`
4. Use the `useQuery` hook to fetch data
5. Handle loading, error, and success states

Example:
```javascript
import { useQuery, gql } from '@apollo/client';

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      content
    }
  }
`;

const Posts = () => {
  const { loading, error, data } = useQuery(GET_POSTS);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {data.posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};
```

### Styling

The app uses inline styles for simplicity, but you can:

1. Replace inline styles with CSS modules
2. Use styled-components
3. Add a CSS framework like Bootstrap or Tailwind CSS

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure your GraphQL endpoint allows requests from `localhost:3000`
2. **Authentication Errors**: Verify your token is stored correctly in localStorage
3. **Query Errors**: Check that your GraphQL query matches your schema
4. **Network Errors**: Ensure your GraphQL endpoint is accessible

### Debug Mode

To enable Apollo Client DevTools:

1. Install the Apollo Client DevTools browser extension
2. The client is already configured to work with DevTools in development mode

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App (irreversible)

## Learn More

- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [GraphQL Documentation](https://graphql.org/learn/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)