const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');

// Mock data for users with extended profile fields
const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'admin@hospital.com',
    age: 28,
    department: 'Hospital Administration',
    role: 'ADMIN',
    lastLogin: new Date().toISOString(),
    profile: {
      address: {
        country: 'USA'
      }
    },
    password: 'admin123' // In real app, this would be hashed
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    age: 32,
    department: 'Marketing',
    role: 'USER',
    lastLogin: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    profile: {
      address: {
        country: 'Canada'
      }
    },
    password: 'password123'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    age: 25,
    department: 'Sales',
    role: 'USER',
    lastLogin: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    profile: {
      address: {
        country: 'UK'
      }
    },
    password: 'password123'
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
  }
];

// Current user for authentication simulation
let currentUser = null;

// GraphQL type definitions
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    department: String
    role: String!
    lastLogin: String
    profile: Profile
    posts: [Post!]!
  }

  type Profile {
    address: Address
  }

  type Address {
    country: String
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    authorId: String!
    author: User!
    publishedAt: String!
  }

  type AuthPayload {
    accessToken: String!
    email: String!
    name: String!
    role: String!
    user: User!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    posts: [Post!]!
    post(id: ID!): Post
    me: User
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int, department: String): User!
    updateUser(id: ID!, name: String, email: String, age: Int, department: String): User!
    deleteUser(id: ID!): Boolean!
    login(input: LoginInput!): AuthPayload!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.find(user => user.id === id),
    posts: () => posts,
    post: (_, { id }) => posts.find(post => post.id === id),
    me: () => currentUser, // Return current authenticated user
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
        role: 'USER',
        lastLogin: new Date().toISOString(),
        profile: {
          address: {
            country: 'Not specified'
          }
        }
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

    login: (_, { input }) => {
      const { email, password } = input;
      
      // Find user by email and password (in real app, compare hashed passwords)
      const user = users.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Update last login
      user.lastLogin = new Date().toISOString();
      
      // Set current user for me query
      currentUser = user;

      // Generate a mock token (in real app, use JWT)
      const accessToken = `mock-token-${user.id}-${Date.now()}`;

      return {
        accessToken,
        email: user.email,
        name: user.name,
        role: user.role,
        user
      };
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
    context: ({ req }) => {
      // In real app, decode JWT token here
      const token = req.headers.authorization?.replace('Bearer ', '');
      return { user: currentUser };
    }
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
    console.log(`🔐 Login with: admin@hospital.com / admin123`);
  });
}

startServer().catch(error => {
  console.error('Error starting server:', error);
});
