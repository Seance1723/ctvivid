// src/components/PageHeader/PageHeader.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { IconUser, IconLogout } from '@tabler/icons-react';
import { useAuth } from '../../contexts/AuthContext';
import LoginModal from '../Auth/LoginModal';
import './PageHeader.scss';

const HeaderIcons = ({ headerMode }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Dynamic color based on header mode
  const isDarkBackground = headerMode?.includes('light') || headerMode?.includes('logo-only-light');
  const textColor = isDarkBackground ? 'white' : '#000';
  const buttonBg = isDarkBackground ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const buttonBorder = isDarkBackground ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';
  const buttonHoverBg = isDarkBackground ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)';
  
  console.log('HeaderIcons rendering:', { isAuthenticated, user: user?.name, headerMode, textColor });

  return (
    <>
      {/* Desktop Navigation - Fixed to right side */}
      <div id="authNavDesktop" style={{
        position: 'absolute',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 10
      }}>
        <div className="d-flex align-items-center gap-3">
          {isAuthenticated ? (
            <div className="d-flex align-items-center gap-3">
              {/* User greeting with profile picture */}
              <div className="d-flex align-items-center gap-2">
                {user?.picture && (
                  <img 
                    src={user.picture} 
                    alt={user.name}
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%'
                    }}
                  />
                )}
                <span style={{ fontSize: '14px', fontWeight: '500', color: textColor }}>
                  Hi, {user?.name?.split(' ')[0]}
                </span>
              </div>
              
              {/* Sign out button */}
              <div 
                className="d-flex align-items-center gap-1 cursor-pointer"
                onClick={logout}
                style={{ 
                  cursor: 'pointer',
                  padding: '6px 10px',
                  borderRadius: '4px',
                  transition: 'background-color 0.2s',
                  fontSize: '13px',
                  backgroundColor: buttonBg,
                  border: `1px solid ${buttonBorder}`,
                  color: textColor
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverBg}
                onMouseLeave={(e) => e.target.style.backgroundColor = buttonBg}
              >
                <IconLogout size={16} />
                <span>Sign Out</span>
              </div>
            </div>
          ) : (
            // SIGN IN BUTTON COMMENTED OUT - Login disabled
            null
            // <div
            //   className="d-flex align-items-center gap-1 cursor-pointer"
            //   onClick={() => setShowLoginModal(true)}
            //   style={{
            //     cursor: 'pointer',
            //     padding: '8px 12px',
            //     borderRadius: '4px',
            //     transition: 'background-color 0.2s',
            //     fontSize: '14px',
            //     color: textColor
            //   }}
            //   onMouseEnter={(e) => e.target.style.backgroundColor = isDarkBackground ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
            //   onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            // >
            //   <IconUser size={18} />
            //   <span>Sign In</span>
            // </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation - Fixed to right side */}
      <div id="authNavMobile" style={{
        position: 'absolute',
        right: '15px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 10
      }}>
        <div className="d-flex align-items-center gap-2">
          {isAuthenticated ? (
            <div className="d-flex align-items-center gap-2">
              {/* User greeting with profile picture - mobile */}
              <div className="d-flex align-items-center gap-1">
                {user?.picture && (
                  <img 
                    src={user.picture} 
                    alt={user.name}
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%'
                    }}
                  />
                )}
                <span style={{ fontSize: '12px', fontWeight: '500', color: textColor }}>
                  Hi, {user?.name?.split(' ')[0]}
                </span>
              </div>
              
              {/* Sign out button - mobile */}
              <div 
                onClick={logout}
                style={{ 
                  cursor: 'pointer', 
                  padding: '6px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: buttonBg,
                  border: `1px solid ${buttonBorder}`,
                  color: textColor
                }}
              >
                <IconLogout size={16} />
              </div>
            </div>
          ) : (
            // SIGN IN BUTTON COMMENTED OUT - Login disabled
            null
            // <div
            //   onClick={() => setShowLoginModal(true)}
            //   style={{
            //     cursor: 'pointer',
            //     padding: '8px',
            //     borderRadius: '4px',
            //     display: 'flex',
            //     alignItems: 'center',
            //     justifyContent: 'center',
            //     color: textColor
            //   }}
            // >
            //   <IconUser size={20} />
            // </div>
          )}
        </div>
      </div>
      
      <LoginModal 
        isOpen={showLoginModal} 
      />
    </>
  );
};

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
        <div className="container nav-inner" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          {/* Left nav */}
          {/* <div id="pageNav" className="d-none d-md-flex gap-4" >
            <NavLink to="/women"     className={({isActive})=> isActive ? 'active' : ''}>Women</NavLink>
            <NavLink to="/men"       className={({isActive})=> isActive ? 'active' : ''}>Men</NavLink>
            <NavLink to="/designers" className={({isActive})=> isActive ? 'active' : ''}>Designer</NavLink>
            <NavLink to="/sale"      className={({isActive})=> isActive ? 'active' : ''}>Sale</NavLink>
          </div> */}

          {/* Center text-logo */}
          <div id="branding">
            <NavLink to="/" className="branding-link">
              <h3 className="m-0 text-uppercase">VIVIDARA</h3>
            </NavLink>
          </div>

          {/* Right icons */}
          <HeaderIcons headerMode={navClasses.join(' ')} />

        </div>
      </nav>
    </header>
  );
}
