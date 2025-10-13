// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import LoginModal from './LoginModal';
// import './LoadingSpinner.css';

const ProtectedRoute = ({ children }) => {
  // const { isAuthenticated, loading } = useAuth();
  // const [showLoginModal, setShowLoginModal] = useState(false);

  // useEffect(() => {
  //   if (!loading && !isAuthenticated) {
  //     setShowLoginModal(true);
  //   }
  // }, [loading, isAuthenticated]);

  // console.log('ProtectedRoute state:', { isAuthenticated, loading, showLoginModal });

  // if (loading) {
  //   return (
  //     <div style={{
  //       position: 'fixed',
  //       top: 0,
  //       left: 0,
  //       right: 0,
  //       bottom: 0,
  //       background: 'white',
  //       display: 'flex',
  //       alignItems: 'center',
  //       justifyContent: 'center',
  //       zIndex: 9999,
  //       fontFamily: 'system-ui, sans-serif'
  //     }}>
  //       <div style={{ textAlign: 'center' }}>
  //         <h1 style={{
  //           fontSize: '36px',
  //           fontWeight: '300',
  //           letterSpacing: '8px',
  //           marginBottom: '20px',
  //           color: '#000'
  //         }}>
  //           VIVIDARA
  //         </h1>
  //         <div className="loading-spinner" style={{
  //           width: '40px',
  //           height: '40px',
  //           border: '2px solid #f3f3f3',
  //           borderTop: '2px solid #000',
  //           borderRadius: '50%',
  //           margin: '0 auto'
  //         }}></div>
  //       </div>
  //     </div>
  //   );
  // }

  // if (!isAuthenticated) {
  //   return (
  //     <LoginModal
  //       isOpen={showLoginModal}
  //     />
  //   );
  // }

  // TEMPORARILY BYPASSING LOGIN - Direct access to application
  return children;
};

export default ProtectedRoute;