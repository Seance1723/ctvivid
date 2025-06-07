// src/App.jsx 

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavLayout from './components/Layout/NavLayout/NavLayout';

// Pages
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';

//Category Pages
import Designers from './pages/Category/Designers/Designers';
import Men from './pages/Category/Men/Men';
import Women from './pages/Category/Women/Women';
import Sale from './pages/Category/Sale/Sale';

function App() {
  return (
    <Router>
      {/* wrap all routes in NavLayout (renders PageHeader + dynamic header behavior) */}
      <Routes>
        <Route element={<NavLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/designers" element={<Designers />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/sale" element={<Sale />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;