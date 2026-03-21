// src/App.jsx 

import React from 'react';
// Use HashRouter to ensure routing works on static hosts without server-side
// route handling (avoids 404s when the page reloads)
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import AuthTest from './components/Auth/AuthTest';
import NavLayout from './components/Layout/NavLayout/NavLayout';

// Pages
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';

//Category Pages
import Designers from './pages/Category/Designers/Designers';
// import DaisyDrama from './pages/Category/DaisyDrama/DaisyDrama';
import DaisyDrama from './pages/Category/Daisydrama/DaisyDrama';
import Trishna from './pages/Category/Trishna/Trishna';

import Men from './pages/Category/Men/Men';
import Women from './pages/Category/Women/Women';
import Sale from './pages/Category/Sale/Sale';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <h1 style={{ color: 'red' }}>Something went wrong</h1>
          <p>Error: {this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  
  console.log('App loading with Google Client ID:', googleClientId);
  
  // If no Google Client ID is configured, show setup instructions
  if (!googleClientId || googleClientId === "your-google-client-id-here") {
    return (
      <div style={{
        padding: '40px',
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'system-ui, sans-serif',
        lineHeight: '1.6'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            fontFamily: 'BrownSugar, serif', 
            fontSize: '48px', 
            fontWeight: '300', 
            letterSpacing: '8px',
            margin: '0 0 20px 0'
          }}>
            VIVIDARA
          </h1>
          <p style={{ fontSize: '18px', color: '#666' }}>OAuth2 Setup Required</p>
        </div>

        <div style={{
          background: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '30px'
        }}>
          <h3 style={{ color: '#856404', margin: '0 0 15px 0' }}>⚠️ Setup Required</h3>
          <p style={{ color: '#856404', margin: 0 }}>
            Please configure your Google OAuth2 Client ID to enable authentication.
          </p>
        </div>

        <div style={{
          background: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          padding: '25px'
        }}>
          <h3 style={{ margin: '0 0 20px 0' }}>🚀 Quick Setup Steps:</h3>
          
          <ol style={{ paddingLeft: '20px' }}>
            <li style={{ marginBottom: '10px' }}>
              Go to <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer">
                Google Cloud Console
              </a>
            </li>
            <li style={{ marginBottom: '10px' }}>
              Create a new project: "VIVIDARA-OAuth2"
            </li>
            <li style={{ marginBottom: '10px' }}>
              Enable Google+ API
            </li>
            <li style={{ marginBottom: '10px' }}>
              Create OAuth2 Client ID (Web Application)
            </li>
            <li style={{ marginBottom: '10px' }}>
              Add authorized origins: <code>http://localhost:3000</code>
            </li>
            <li style={{ marginBottom: '10px' }}>
              Copy your Client ID
            </li>
            <li style={{ marginBottom: '10px' }}>
              Update <code>.env</code> file:
              <pre style={{
                background: '#2d3748',
                color: '#e2e8f0',
                padding: '10px',
                borderRadius: '4px',
                margin: '10px 0',
                fontSize: '14px'
              }}>
REACT_APP_GOOGLE_CLIENT_ID=your-actual-client-id.apps.googleusercontent.com
              </pre>
            </li>
            <li style={{ marginBottom: '10px' }}>
              Restart the development server: <code>npm start</code>
            </li>
          </ol>
        </div>
      </div>
    );
  }

  try {
    return (
      <ErrorBoundary>
        <GoogleOAuthProvider clientId={googleClientId}>
          <AuthProvider>
            <Router>
              <ProtectedRoute>
                {/* wrap all routes in NavLayout (renders PageHeader + dynamic header behavior) */}
                <Routes>
                  <Route element={<NavLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth-test" element={<AuthTest />} />
                    <Route path="/products" element={<Product />} />
                    <Route path="/designers" element={<Designers />} />
                    <Route path="/daisydrama" element={<DaisyDrama />} />
                    <Route path="/trishna" element={<Trishna />} />
                    <Route path="/men" element={<Men />} />
                    <Route path="/women" element={<Women />} />
                    <Route path="/sale" element={<Sale />} />
                  </Route>
                </Routes>
              </ProtectedRoute>
            </Router>
          </AuthProvider>
        </GoogleOAuthProvider>
      </ErrorBoundary>
    );  
  } catch (error) {
    console.error('App error:', error);
    return (
      <div style={{
        padding: '40px',
        textAlign: 'center',
        fontFamily: 'system-ui, sans-serif'
      }}>
        <h1 style={{ color: 'red' }}>Application Error</h1>
        <p>Error: {error.message}</p>
        <button onClick={() => window.location.reload()}>
          Reload Page
        </button>
      </div>
    );
  }
}

export default App;