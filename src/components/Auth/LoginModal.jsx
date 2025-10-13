import React, { useState, useEffect, useRef } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../contexts/AuthContext';
import './LoginModal.scss';

const LoginModal = ({ isOpen }) => {
  const { login, signUp, signIn } = useAuth();
  const [activeTab, setActiveTab] = useState('signin');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // ResponsiveVideo component for login background
  const ResponsiveVideo = ({ desktopSrc, mobileSrc, className, poster }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(true); // Always visible in modal
    const videoRef = useRef(null);

    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth <= 767);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
      const videoSrc = isMobile ? mobileSrc : desktopSrc;
      console.log('LoginModal video source:', videoSrc);
      console.log('Is mobile:', isMobile);
      setVideoError(false); // Reset error when source changes
      setVideoLoaded(false);
    }, [isMobile, mobileSrc, desktopSrc]);

    useEffect(() => {
      const video = videoRef.current;
      if (video && !videoError) {
        console.log('Setting up video for autoplay...');
        
        const playVideo = async () => {
          try {
            console.log('Attempting to play video...');
            
            // Ensure all autoplay-friendly settings
            video.muted = true;
            video.playsInline = true;
            video.autoplay = true;
            video.defaultMuted = true;
            video.volume = 0;
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
            
            // Small delay to ensure video is ready
            await new Promise(resolve => setTimeout(resolve, 100));
            
            const playPromise = video.play();
            await playPromise;
            
            console.log('Video started playing successfully');
          } catch (error) {
            console.error('Video play failed:', error.name, error.message);
            
            // Try immediate retry without reload
            try {
              await video.play();
              console.log('Video play successful on immediate retry');
            } catch (retryError) {
              console.error('Immediate retry failed, trying with user interaction simulation');
              
              // Final attempt - simulate user interaction
              const userInteraction = () => {
                video.play().then(() => {
                  console.log('Video playing after simulated interaction');
                }).catch(finalError => {
                  console.error('All video play attempts failed:', finalError);
                  // Don't set error immediately, let user click to play
                });
              };
              
              // Try to play on next user interaction
              document.addEventListener('click', userInteraction, { once: true });
              document.addEventListener('touchstart', userInteraction, { once: true });
            }
          }
        };

        // Try to play immediately when video data is loaded
        if (videoLoaded) {
          playVideo();
        }
      }
    }, [videoLoaded, videoError]);

    if (videoError) {
      // Fallback to poster image if video fails
      return (
        <div 
          className={className}
          style={{
            backgroundImage: `url(${poster})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '100%'
          }}
        />
      );
    }

    return (
      <video
        ref={videoRef}
        className={className}
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        preload="metadata"
        controls={false}
        webkit-playsinline="true"
        style={{ 
          cursor: 'pointer',
          backgroundColor: '#000' // Ensure background while loading
        }}
        onLoadStart={() => {
          console.log('Video loading started');
          console.log('Video src:', isMobile ? mobileSrc : desktopSrc);
        }}
        onLoadedMetadata={() => {
          console.log('Video metadata loaded');
          const video = videoRef.current;
          if (video) {
            video.muted = true;
            video.play().catch(e => console.log('Metadata play failed:', e));
          }
        }}
        onLoadedData={() => {
          console.log('Video data loaded');
          setVideoLoaded(true);
        }}
        onCanPlay={() => {
          console.log('Video can play');
          const video = videoRef.current;
          if (video && video.paused) {
            video.play().catch(e => console.log('CanPlay auto-play failed:', e));
          }
        }}
        onCanPlayThrough={() => {
          console.log('Video can play through');
          const video = videoRef.current;
          if (video && video.paused) {
            video.play().catch(e => console.log('CanPlayThrough auto-play failed:', e));
          }
        }}
        onPlaying={() => console.log('Video is playing')}
        onPause={() => console.log('Video paused')}
        onError={(e) => {
          console.error('Video error:', e.target.error);
          setVideoError(true);
        }}
        onClick={async () => {
          // Manual play trigger on click
          const video = videoRef.current;
          if (video) {
            try {
              video.muted = true;
              if (video.paused) {
                await video.play();
                console.log('Manual video play successful');
              }
            } catch (err) {
              console.log('Manual video play failed:', err);
            }
          }
        }}
      >
        <source src={isMobile ? mobileSrc : desktopSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  };
  
  // Form states
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });
  
  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    acceptTerms: false
  });

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      // Decode the JWT token to get user info
      const userInfo = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
      
      const userData = {
        id: userInfo.sub,
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture,
        provider: 'google'
      };

      login(userData, credentialResponse.credential);
    } catch (error) {
      console.error('Google login error:', error);
      setError('Google login failed. Please try again.');
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn(signInData.email, signInData.password);
      if (!result.success) {
        setError(result.error || 'Sign in failed');
      }
    } catch (error) {
      setError('Sign in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!signUpData.acceptTerms) {
      setError('Please accept the Terms of Service and Privacy Policy');
      setLoading(false);
      return;
    }

    try {
      const userData = {
        name: `${signUpData.firstName} ${signUpData.lastName}`,
        firstName: signUpData.firstName,
        lastName: signUpData.lastName,
        email: signUpData.email,
        password: signUpData.password
      };

      const result = await signUp(userData);
      if (!result.success) {
        setError(result.error || 'Sign up failed');
      }
    } catch (error) {
      setError('Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForms = () => {
    setSignInData({ email: '', password: '' });
    setSignUpData({ firstName: '', lastName: '', email: '', password: '', acceptTerms: false });
    setError('');
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    resetForms();
  };

  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay">
      <div className="login-modal">
        {/* Video Background */}
        <div 
          className="login-modal__video-bg"
          onClick={(e) => {
            // Try to play video if clicked and it's not playing
            const video = e.currentTarget.querySelector('video');
            if (video) {
              video.muted = true;
              if (video.paused) {
                video.play().then(() => {
                  console.log('Video started playing from background click');
                }).catch(err => console.log('Background click play failed:', err));
              }
            }
          }}
          style={{ cursor: 'pointer' }}
        >
          <ResponsiveVideo
            className="login-modal__video"
            desktopSrc={`${process.env.PUBLIC_URL}/pages/Home/home-hero-sec.mp4`}
            mobileSrc={`${process.env.PUBLIC_URL}/pages/Home/home-mobileview.mp4`}
            poster={`${process.env.PUBLIC_URL}/pages/Home/home-hero-sec-poster.jpg`}
          />
          <div className="login-modal__video-overlay"></div>
          
          {/* Video status indicator */}
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            color: 'white',
            fontSize: '12px',
            background: 'rgba(0,0,0,0.5)',
            padding: '5px 10px',
            borderRadius: '3px',
            zIndex: 5,
            fontFamily: 'monospace'
          }}>
            Click to play video
          </div>
        </div>

        <div className="login-modal__content">
          <div className="login-modal__brand">
            <h1>VIVIDARA</h1>
            <p>Enter your world of luxury fashion</p>
          </div>

          <div className="login-modal__tabs">
            <button 
              className={`tab ${activeTab === 'signin' ? 'active' : ''}`}
              onClick={() => switchTab('signin')}
            >
              Sign In
            </button>
            <button 
              className={`tab ${activeTab === 'signup' ? 'active' : ''}`}
              onClick={() => switchTab('signup')}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="login-modal__form">
            {activeTab === 'signin' ? (
              <form className="signin-form" onSubmit={handleSignIn}>
                <h2>Welcome Back</h2>
                <p>Sign in to access your account</p>
                
                <div className="form-group">
                  <input 
                    type="email" 
                    placeholder="Email address" 
                    className="form-input"
                    value={signInData.email}
                    onChange={(e) => setSignInData({...signInData, email: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <input 
                    type="password" 
                    placeholder="Password" 
                    className="form-input"
                    value={signInData.password}
                    onChange={(e) => setSignInData({...signInData, password: e.target.value})}
                    required
                  />
                </div>

                <div className="form-options">
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    Remember me
                  </label>
                  <button type="button" className="forgot-link">Forgot password?</button>
                </div>

                <button 
                  type="submit" 
                  className="auth-button primary"
                  disabled={loading}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>
            ) : (
              <form className="signup-form" onSubmit={handleSignUp}>
                <h2>Create Account</h2>
                <p>Join VIVIDARA's exclusive community</p>
                
                <div className="form-row">
                  <div className="form-group">
                    <input 
                      type="text" 
                      placeholder="First name" 
                      className="form-input"
                      value={signUpData.firstName}
                      onChange={(e) => setSignUpData({...signUpData, firstName: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input 
                      type="text" 
                      placeholder="Last name" 
                      className="form-input"
                      value={signUpData.lastName}
                      onChange={(e) => setSignUpData({...signUpData, lastName: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <input 
                    type="email" 
                    placeholder="Email address" 
                    className="form-input"
                    value={signUpData.email}
                    onChange={(e) => setSignUpData({...signUpData, email: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <input 
                    type="password" 
                    placeholder="Create password" 
                    className="form-input"
                    value={signUpData.password}
                    onChange={(e) => setSignUpData({...signUpData, password: e.target.value})}
                    required
                    minLength="6"
                  />
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox"
                      checked={signUpData.acceptTerms}
                      onChange={(e) => setSignUpData({...signUpData, acceptTerms: e.target.checked})}
                      required
                    />
                    <span className="checkmark"></span>
                    I agree to the Terms of Service and Privacy Policy
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="auth-button primary"
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>
            )}

            <div className="divider">
              <span>or</span>
            </div>

            <div className="social-auth">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.log('Login Failed')}
                theme="outline"
                size="large"
                text={activeTab === 'signin' ? 'signin_with' : 'signup_with'}
                shape="rectangular"
                logo_alignment="left"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;