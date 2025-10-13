// Debug version of App.js - bypasses authentication to test core app
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import NavLayout from './components/Layout/NavLayout/NavLayout';

// Pages
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import AuthTest from './components/Auth/AuthTest';

//Category Pages  
import Designers from './pages/Category/Designers/Designers';
import Men from './pages/Category/Men/Men';
import Women from './pages/Category/Women/Women';
import Sale from './pages/Category/Sale/Sale';

function App() {
  console.log('Debug App loading - NO AUTHENTICATION');
  
  try {
    return (
      <Router>
        <Routes>
          <Route element={<NavLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/auth-test" element={<div style={{padding: '40px', textAlign: 'center'}}>
              <h1>VIVIDARA Debug Mode</h1>
              <p>Authentication bypassed for testing</p>
              <p>Core app components loading successfully!</p>
            </div>} />
            <Route path="/products" element={<Product />} />
            <Route path="/designers" element={<Designers />} />
            <Route path="/men" element={<Men />} />
            <Route path="/women" element={<Women />} />
            <Route path="/sale" element={<Sale />} />
          </Route>
        </Routes>
      </Router>
    );
  } catch (error) {
    console.error('Debug App error:', error);
    return (
      <div style={{
        padding: '40px',
        textAlign: 'center',
        fontFamily: 'system-ui, sans-serif'
      }}>
        <h1 style={{ color: 'red' }}>Debug App Error</h1>
        <p>Error: {error.message}</p>
        <button onClick={() => window.location.reload()}>
          Reload Page
        </button>
      </div>
    );
  }
}

export default App;