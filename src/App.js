import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import Users from './components/Users';
import Posts from './components/Posts';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import PatientManagement from './components/PatientManagement';
import Login from './pages/Login';
import Profile from './pages/Profile';
import DoctorList from './components/doctor/DoctorList';

// Main Application Layout Component
const AppLayout = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const location = useLocation();
  const navigate = useNavigate();

  // Update active tab based on current route
  useEffect(() => {
    const path = location.pathname.substring(1); // Remove leading slash
    if (path) {
      setActiveTab(path);
    } else {
      setActiveTab('dashboard');
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const getPageTitle = () => {
    const path = location.pathname.substring(1);
    switch (path) {
      case 'dashboard':
        return 'Dashboard';
      case 'users':
        return 'Users';
      case 'patient-list':
      case 'patient-registration':
      case 'patient-history':
        return 'Patient Management';
      case 'posts':
        return 'Posts';
      case 'settings':
        return 'Settings';
      case 'profile':
        return 'Profile';
      default:
        return 'AS Group of Hospitals';
    }
  };

  return (
        <div style={{
          display: 'flex',
          minHeight: '100vh',
          backgroundColor: '#f0f8ff'
        }}>
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={(tab) => navigate(`/${tab}`)} />
      
      {/* Main Content */}
      <main style={{ 
        marginLeft: '280px',
        flex: 1,
        minHeight: '100vh',
        backgroundColor: '#f0f8ff',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <Header onLogout={handleLogout} />

        {/* Content */}
        <div style={{ flex: 1, padding: '0' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/doctor-list" element={<DoctorList />} />
            <Route path="/users" element={<Users />} />
            <Route path="/patient-list" element={<PatientManagement />} />
            <Route path="/patient-registration" element={<PatientManagement />} />
            <Route path="/patient-history" element={<PatientManagement />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </main>

      {/* Toast Container */}
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

// Login Page Component
const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (success) => {
    if (success) {
      navigate('/dashboard');
    }
  };

  return <Login onLogin={handleLogin} />;
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated');
      const token = localStorage.getItem('token');
      // Check both authentication status and token presence
      setIsAuthenticated(authStatus === 'true' && !!token);
      setLoading(false);
    };

    checkAuth();

    // Listen for storage changes (when login happens in another tab/component)
    const handleStorageChange = (e) => {
      if (e.key === 'isAuthenticated' || e.key === 'token') {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically for immediate changes within the same tab
    const interval = setInterval(checkAuth, 100);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f0f8ff'
          }}>
        <div style={{
          textAlign: 'center'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #4CAF50',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{
            color: '#6c757d',
            fontSize: '16px',
            margin: 0
          }}>
            Loading AS Group of Hospitals...
          </p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Main App Component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
