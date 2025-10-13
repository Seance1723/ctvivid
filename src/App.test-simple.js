// Simple test version of App.js to debug white page issue
import React from 'react';

function App() {
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  
  console.log('App loading...', { googleClientId });
  
  return (
    <div style={{
      padding: '40px',
      fontFamily: 'system-ui, sans-serif',
      textAlign: 'center'
    }}>
      <h1 style={{ 
        fontSize: '48px', 
        margin: '0 0 20px 0',
        color: '#000'
      }}>
        VIVIDARA
      </h1>
      
      <div style={{
        background: '#f0f0f0',
        padding: '20px',
        borderRadius: '8px',
        margin: '20px 0'
      }}>
        <h2>Debug Information</h2>
        <p><strong>Google Client ID:</strong> {googleClientId || 'Not set'}</p>
        <p><strong>Environment:</strong> {process.env.NODE_ENV}</p>
        <p><strong>Status:</strong> App is loading successfully!</p>
      </div>
      
      <div style={{
        background: googleClientId ? '#d4edda' : '#f8d7da',
        padding: '15px',
        borderRadius: '4px',
        color: googleClientId ? '#155724' : '#721c24'
      }}>
        {googleClientId ? (
          <p>✅ Google Client ID is configured. Ready for OAuth2!</p>
        ) : (
          <p>❌ Google Client ID is missing. Check .env file.</p>
        )}
      </div>
      
      <button 
        onClick={() => {
          console.log('Button clicked!');
          alert('Simple app is working!');
        }}
        style={{
          background: '#007bff',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          marginTop: '20px'
        }}
      >
        Test Button
      </button>
    </div>
  );
}

export default App;