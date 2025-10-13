// src/components/Footer/Footer.jsx

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandYoutube,
} from '@tabler/icons-react';

const Footer = ({ className = '' }) => {
  const { pathname } = useLocation();
  // add 'home-footer' only on the homepage
  const isHome = pathname === '/';
  //   const navigate = useNavigate();

  // const handleAboutClick = (e) => {
  //   e.preventDefault();
  //   if (pathname !== '/') {
  //     navigate('/', { state: { scrollTo: 'about-us' } });
  //   } else {
  //     const el = document.getElementById('about-us');
  //     if (el) {
  //       el.scrollIntoView({ behavior: 'smooth' });
  //     }
  //   }
  // };

  const navigate = useNavigate();

const handleAboutClick = (e) => {
  e.preventDefault();
  navigate('/', { state: { scrollTo: 'about-us' } });
};

const handleCollaborateClick = (e) => {
  e.preventDefault();
  navigate('/', { state: { scrollTo: 'collaborate' } });
};


  const footerClasses = [
    'site-footer',
    'py-5',
    className,
    isHome ? 'home-footer' : ''
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <footer className={footerClasses}>
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-start gap-0 gap-md-4">
        {/* Logo + copyright */}
        <div className="footer-brand">
          <h4 className="logo">VIVIDARA</h4>
          <p className="copyright d-none d-md-block">© 2025 VIVIDARA. All rights reserved.</p>
        </div>

        {/* Navigation Links */}
         {/* commenting for now  */}
        {/* <div className="footer-links d-flex gap-5 flex-wrap">
          <ul>
            <li>About Us</li>
            <li><Link to="/designers">Designers</Link></li>
            <li className='d-none d-md-block'>Shop Collections</li>
            <li className='d-none d-md-block'>V-Edits</li>
          </ul>
          <ul className='d-none d-md-block'>
            <li>Sustainability</li>
            <li>Contact Us</li>
            <li>Collaborate with Us</li>
            <li>Returns</li>
          </ul>
            <ul className='d-none d-md-block'>
            <li>Collaborate with Us</li>
           </ul>
          <ul className='d-none d-md-block'>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>FAQs</li>
            <li>Sitemap</li>
          </ul>
        </div> */}

        {/* Having only About us and Collaborate with us in the footer */}
           {/* <div className="footer-links d-flex gap-5 flex-wrap">
          <ul>
            <li>
          
                 <a href="/#about-us" onClick={handleAboutClick}>About Us</a>
            </li>
            <li>
                    <a href="/#collaborate" onClick={handleCollaborateClick}>Collaborate with Us</a>

            </li>
          </ul>
        </div> */}
        <div className="footer-links d-none d-sm-flex gap-5 flex-wrap">
  <ul>
    <li>
      {/* <Link to="/#about-us">About Us</Link> */}
      <a href="/#about-us" onClick={handleAboutClick}>About Us</a>
    </li>
    <li>
      <a href="/#collaborate" onClick={handleCollaborateClick}>Collaborate with Us</a>
    </li>
  </ul>
</div>


        {/* Social Icons */}
<div className="footer-social">
  {/* Desktop View (default) */}
  <div className="d-none d-sm-block">
    <p className="mb-2">Follow Us</p>
    <div className="d-flex gap-2">
      <a
        href="https://www.facebook.com/share/1AfP2qburx/"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon"
      >
        <IconBrandFacebook size={20} />
      </a>
      <a
        href="https://www.instagram.com/vividara.in?igsh=aTQzZ3Rhd3JzNGJ0"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon"
      >
        <IconBrandInstagram size={20} />
      </a>
      <a
        href="https://youtube.com/@vividara.narrative?si=vyxOh2Dw0DbbFpaW"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon"
      >
        <IconBrandYoutube size={20} />
      </a>
    </div>
  </div>

  {/* Mobile View (icons beside text) */}
  
  {/* <div className="d-flex d-sm-none align-items-center gap-2">
    <p className="mb-0">Follow Us</p>
    <div className="d-flex gap-2">
      <a
        href="https://www.facebook.com/share/1AfP2qburx/"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon"
      >
        <IconBrandFacebook size={20} />
      </a>
      <a
        href="https://www.instagram.com/vividara.in?igsh=aTQzZ3Rhd3JzNGJ0"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon"
      >
        <IconBrandInstagram size={20} />
      </a>
      <a
        href="https://youtube.com/@vividara.narrative?si=vyxOh2Dw0DbbFpaW"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon"
      >
        <IconBrandYoutube size={20} />
      </a>
    </div>
  </div> */}
{/* Mobile View (only visible on small screens) */}
{/* <div className="d-sm-none">
  <div className="row">

    <div className="col-6">
      <p className="mb-1">About Us</p>
      <p className="mb-0">Collaborate with Us</p>
    </div>


    <div className="col-6 d-flex flex-column align-items-end">
      <div className="d-flex align-items-center mb-1">
        <p className="mb-0 me-2">Follow Us</p>
        <div className="d-flex gap-2">
          <a
            href="https://www.facebook.com/share/1AfP2qburx/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <IconBrandFacebook size={20} />
          </a>
          <a
            href="https://www.instagram.com/vividara.in?igsh=aTQzZ3Rhd3JzNGJ0"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <IconBrandInstagram size={20} />
          </a>
          <a
            href="https://youtube.com/@vividara.narrative?si=vyxOh2Dw0DbbFpaW"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <IconBrandYoutube size={20} />
          </a>
        </div>
      </div>
    </div>
  </div>
</div> */}
<div className="d-sm-none">
 <div className="d-flex flex-column px-3" style={{ paddingTop: '0px', paddingBottom: '0px',fontSize:'11px' }}>

    <p className="mb-1">About Us</p>
    <p className="mb-2">Collaborate with Us</p>

    {/* Follow Us aligned right */}
    <div className="d-flex justify-content-end align-items-center mb-2">
      <p className="mb-0 me-2">Follow Us</p>
      <div className="d-flex gap-2">
        <a
          href="https://www.facebook.com/share/1AfP2qburx/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <IconBrandFacebook size={20} />
        </a>
        <a
          href="https://www.instagram.com/vividara.in?igsh=aTQzZ3Rhd3JzNGJ0"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <IconBrandInstagram size={20} />
        </a>
        <a
          href="https://youtube.com/@vividara.narrative?si=vyxOh2Dw0DbbFpaW"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <IconBrandYoutube size={20} />
        </a>
      </div>
    </div>

   
  </div>
</div>
</div>
        <div className="footer-brand d-block d-md-none" style={{ paddingLeft: '1rem' }}>
          <p className="copyright">© 2025 VIVIDARA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
