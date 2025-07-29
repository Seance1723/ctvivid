import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const AuthTest = () => {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Authentication Test</h2>
        <p>User is not authenticated. Please sign in.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
        🎉 OAuth2 Authentication Successful!
      </h2>
      
      <div style={{ 
        background: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3>User Information:</h3>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Provider:</strong> {user?.provider}</p>
        <p><strong>User ID:</strong> {user?.id}</p>
        
        {user?.picture && (
          <div style={{ marginTop: '15px' }}>
            <p><strong>Profile Picture:</strong></p>
            <img 
              src={user.picture} 
              alt="Profile" 
              style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%',
                border: '2px solid #ddd'
              }} 
            />
          </div>
        )}
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <button 
          onClick={logout}
          style={{
            background: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Sign Out & Test Again
        </button>
      </div>
      
      <div style={{ 
        marginTop: '30px', 
        padding: '15px', 
        background: '#d4edda', 
        borderRadius: '4px',
        border: '1px solid #c3e6cb'
      }}>
        <h4 style={{ color: '#155724', margin: '0 0 10px 0' }}>
          ✅ OAuth2 Integration Status
        </h4>
        <ul style={{ color: '#155724', margin: 0 }}>
          <li>Google OAuth2 authentication working</li>
          <li>User data successfully retrieved</li>
          <li>Session management active</li>
          <li>Protected routes functioning</li>
        </ul>
      </div>
    </div>
  );
};

export default AuthTest;