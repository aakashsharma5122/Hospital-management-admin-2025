import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LOGIN_MUTATION } from '../Graphql/mutations/loginmutations';
import { useMutation } from '@apollo/client';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);


const [login] = useMutation(LOGIN_MUTATION);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   // Simulate API call
  //   setTimeout(() => {
  //     // Demo credentials
  //     if (credentials.email === 'admin@hospital.com' && credentials.password === 'admin123') {
  //       toast.success('Login successful! Welcome to Hospital Management System');
  //       localStorage.setItem('isAuthenticated', 'true');
  //       localStorage.setItem('userRole', 'admin');
  //       // Reduced delay for smoother transition
  //       setTimeout(() => {
  //         onLogin(true);
  //       }, 500);
  //     } else {
  //       toast.error('Invalid credentials. Please try again.');
  //     }
  //     setLoading(false);
  //   }, 1500);
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const { data } = await login({
        variables: {
          input: {
            email: credentials.email,
            password: credentials.password,
          },
        },
      });
  
      if (data?.login) {
        const { token, user } = data.login;
        
        // Store authentication data
        localStorage.setItem("token", token);
        localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("userRole", user.role);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userName", user.email.split("@")[0]);
        toast.success(`Welcome back, ${user.email.split("@")[0]}! Login successful.`);
        setTimeout(() => {
          onLogin(true);
        }, 500);
      } else {
        toast.error('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  



  return (
      <div style={{
        minHeight: '100vh',
        background: `
          linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(240, 248, 255, 0.75) 100%),
          url('/Gemini_Generated_Image_tsnoxntsnoxntsno.png')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        position: 'relative'
      }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '15px',
        boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
        padding: '30px',
        width: '100%',
        maxWidth: '380px',
        position: 'relative',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(255, 255, 255, 0.3)'
      }}>

        {/* Logo and Header */}
        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)'
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
          <h1 style={{
            margin: 0,
            color: '#1976D2',
            fontSize: '24px',
            fontWeight: '700',
            marginBottom: '5px'
          }}>
            AS Group of Hospitals
          </h1>
          <p style={{
            margin: 0,
            color: '#4CAF50',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Hospital Management System
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#1976D2',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e3f2fd',
                borderRadius: '8px',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                outline: 'none',
                boxSizing: 'border-box',
                backgroundColor: '#f8f9fa'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#2196F3';
                e.target.style.backgroundColor = 'white';
                e.target.style.boxShadow = '0 0 0 3px rgba(33, 150, 243, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e3f2fd';
                e.target.style.backgroundColor = '#f8f9fa';
                e.target.style.boxShadow = 'none';
              }}
              placeholder="admin@hospital.com"
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#1976D2',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e3f2fd',
                borderRadius: '8px',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                outline: 'none',
                boxSizing: 'border-box',
                backgroundColor: '#f8f9fa'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#2196F3';
                e.target.style.backgroundColor = 'white';
                e.target.style.boxShadow = '0 0 0 3px rgba(33, 150, 243, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e3f2fd';
                e.target.style.backgroundColor = '#f8f9fa';
                e.target.style.boxShadow = 'none';
              }}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                background: loading ? '#bdc3c7' : 'linear-gradient(135deg, #1976D2, #4CAF50)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(33, 150, 243, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(33, 150, 243, 0.3)';
              }
            }}
          >
            {loading ? (
              <>
                <div style={{
                  width: '18px',
                  height: '18px',
                  border: '2px solid transparent',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
      
      {/* Toast Container for Login Page */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Login;
