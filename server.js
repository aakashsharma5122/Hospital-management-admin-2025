const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');

// Mock data for users
const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 28,
    department: 'Engineering'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    age: 32,
    department: 'Marketing'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    age: 25,
    department: 'Sales'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    age: 29,
    department: 'HR'
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david.brown@example.com',
    age: 35,
    department: 'Engineering'
  }
];

// Mock data for posts
const posts = [
  {
    id: '1',
    title: 'Getting Started with GraphQL',
    content: 'GraphQL is a powerful query language for APIs...',
    authorId: '1',
    publishedAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'React Hooks Best Practices',
    content: 'React hooks have revolutionized how we write components...',
    authorId: '2',
    publishedAt: '2024-01-20'
  },
  {
    id: '3',
    title: 'Building Scalable APIs',
    content: 'When building APIs, scalability should be a primary concern...',
    authorId: '1',
    publishedAt: '2024-01-25'
  }
];

// GraphQL type definitions
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    department: String
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    authorId: String!
    author: User!
    publishedAt: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    posts: [Post!]!
    post(id: ID!): Post
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int, department: String): User!
    updateUser(id: ID!, name: String, email: String, age: Int, department: String): User!
    deleteUser(id: ID!): Boolean!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.find(user => user.id === id),
    posts: () => posts,
    post: (_, { id }) => posts.find(post => post.id === id),
  },
  
  User: {
    posts: (user) => posts.filter(post => post.authorId === user.id),
  },
  
  Post: {
    author: (post) => users.find(user => user.id === post.authorId),
  },
  
  Mutation: {
    createUser: (_, { name, email, age, department }) => {
      const newUser = {
        id: String(users.length + 1),
        name,
        email,
        age: age || null,
        department: department || null,
      };
      users.push(newUser);
      return newUser;
    },
    
    updateUser: (_, { id, name, email, age, department }) => {
      const userIndex = users.findIndex(user => user.id === id);
      if (userIndex === -1) {
        throw new Error('User not found');
      }
      
      const user = users[userIndex];
      if (name !== undefined) user.name = name;
      if (email !== undefined) user.email = email;
      if (age !== undefined) user.age = age;
      if (department !== undefined) user.department = department;
      
      return user;
    },
    
    deleteUser: (_, { id }) => {
      const userIndex = users.findIndex(user => user.id === id);
      if (userIndex === -1) {
        return false;
      }
      
      users.splice(userIndex, 1);
      return true;
    },
  },
};

async function startServer() {
  const app = express();
  
  // Enable CORS for all routes
  app.use(cors());
  
  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true, // Enable GraphQL Playground
    playground: true,    // Enable GraphQL Playground
  });
  
  // Start the server
  await server.start();
  
  // Apply Apollo GraphQL middleware
  server.applyMiddleware({ app, path: '/graphql' });
  
  // Start the Express server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 GraphQL Server running at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`📊 GraphQL Playground available at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`👥 Sample users available: ${users.length} users`);
    console.log(`📝 Sample posts available: ${posts.length} posts`);
  });
}

startServer().catch(error => {
  console.error('Error starting server:', error);
});

