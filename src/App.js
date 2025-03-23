import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PageHeader from './components/PageHeader/PageHeader';
import Footer from './components/Footer/Footer';
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
      <PageHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/designers" element={<Designers />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/sale" element={<Sale />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;