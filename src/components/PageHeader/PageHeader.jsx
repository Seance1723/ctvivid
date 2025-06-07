// src/components/PageHeader/PageHeader.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { IconSearch, IconUser, IconShoppingBag } from '@tabler/icons-react';

const HeaderIcons = () => (
  <div id="navAction" className='d-none d-md-block'>
    <div className="d-flex gap-4 align-items-center">
      <div className="d-flex align-items-center gap-1">
        <IconSearch size={20} />
        <span>Search</span>
      </div>
      <div className="d-flex align-items-center gap-1">
        <IconUser size={20} />
        <span>Sign In</span>
      </div>
      <div className="d-flex align-items-center gap-1">
        <IconShoppingBag size={20} />
        <span>Bag</span>
      </div>
    </div>
  </div>
);

export default function PageHeader() {
  const location = useLocation();
  const [navClasses, setNavClasses] = useState([]);

  useEffect(() => {
    setNavClasses([]);
    const triggers = Array.from(document.querySelectorAll('[data-nav-style]'));
    if (!triggers.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target.dataset.navStyle) {
            setNavClasses(entry.target.dataset.navStyle.split(' '));
          }
        });
      },
      { root: null, threshold: 0.5 }
    );

    triggers.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <header className={navClasses.join(' ')}>
      <nav className="navbar">
        <div className="container nav-inner">

          {/* Left nav */}
          <div id="pageNav" className="d-none d-md-flex gap-4">
            <NavLink to="/women"     className={({isActive})=> isActive ? 'active' : ''}>Women</NavLink>
            <NavLink to="/men"       className={({isActive})=> isActive ? 'active' : ''}>Men</NavLink>
            <NavLink to="/designers" className={({isActive})=> isActive ? 'active' : ''}>Designer</NavLink>
            <NavLink to="/sale"      className={({isActive})=> isActive ? 'active' : ''}>Sale</NavLink>
          </div>

          {/* Center text-logo */}
          <div id="branding">
            <NavLink to="/" className="branding-link">
              <h3 className="m-0 text-uppercase">VIVIDARA</h3>
            </NavLink>
          </div>

          {/* Right icons */}
          <HeaderIcons />

        </div>
      </nav>
    </header>
  );
}
