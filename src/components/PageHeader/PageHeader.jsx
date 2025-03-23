import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconSearch, IconUser, IconShoppingBag } from '@tabler/icons-react';

const HeaderIcons = () => (
    <div id='navAction'>
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

const PageHeader = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container d-flex justify-content-between align-items-center">

          {/* Left: Navigation */}
          <div id="pageNav" className="d-flex gap-4">
            <NavLink to="/women" className={({ isActive }) => isActive ? 'active' : ''}>Women</NavLink>
            <NavLink to="/men" className={({ isActive }) => isActive ? 'active' : ''}>Men</NavLink>
            <NavLink to="/designers" className={({ isActive }) => isActive ? 'active' : ''}>Designer</NavLink>
            <NavLink to="/sale" className={({ isActive }) => isActive ? 'active' : ''}>Sale</NavLink>
          </div>

          {/* Center: Logo */}
          <div id="branding">
            <h3 className="m-0 text-uppercase">VIVIDARA</h3>
          </div>

          {/* Right: Icons */}
          <HeaderIcons />
        </div>
      </nav>
    </header>
  );
};

export default PageHeader;
