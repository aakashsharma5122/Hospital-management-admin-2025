const fetch = require('node-fetch');

async function testGraphQLServer() {
  try {
    console.log('🧪 Testing GraphQL Server...');
    
    const query = {
      query: `
        query {
          users {
            id
            name
            email
            age
            department
          }
        }
      `
    };

    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
    });

    const data = await response.json();
    
    if (data.errors) {
      console.error('❌ GraphQL Errors:', data.errors);
    } else {
      console.log('✅ GraphQL Server is working!');
      console.log('📊 Users data:', JSON.stringify(data.data.users, null, 2));
    }
  } catch (error) {
    console.error('❌ Error testing server:', error.message);
    console.log('💡 Make sure the GraphQL server is running on port 4000');
  }
}

testGraphQLServer();

