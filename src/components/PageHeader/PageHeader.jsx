// src/components/PageHeader/PageHeader.jsx

import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { IconSearch, IconUser, IconShoppingBag } from '@tabler/icons-react';

const HeaderIcons = () => (
  <div id="navAction">
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
    // reset on route change
    setNavClasses([]);

    // find any sections with a data-nav-style attribute
    const triggers = Array.from(document.querySelectorAll('[data-nav-style]'));
    if (!triggers.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.target.dataset.navStyle) return;
          if (entry.isIntersecting) {
            // take the data-nav-style value, split into multiple classes if needed
            setNavClasses(entry.target.dataset.navStyle.split(' '));
          }
        });
      },
      {
        root: null,       // viewport
        threshold: 0.5    // 50% visibility
      }
    );

    triggers.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <header className={navClasses.join(' ')}>
      <nav className="navbar navbar-expand-lg">
        <div className="container d-flex justify-content-between align-items-center">

          {/* Left nav links */}
          <div id="pageNav" className="d-flex gap-4">
            <NavLink to="/women"   className={({isActive})=> isActive ? 'active' : ''}>Women</NavLink>
            <NavLink to="/men"     className={({isActive})=> isActive ? 'active' : ''}>Men</NavLink>
            <NavLink to="/designers" className={({isActive})=> isActive ? 'active' : ''}>Designer</NavLink>
            <NavLink to="/sale"    className={({isActive})=> isActive ? 'active' : ''}>Sale</NavLink>
          </div>

          {/* Center logo */}
          <div id="branding">
            <h3 className="m-0 text-uppercase">VIVIDARA</h3>
          </div>

          {/* Right icons */}
          <HeaderIcons />
        </div>
      </nav>
    </header>
  );
}
