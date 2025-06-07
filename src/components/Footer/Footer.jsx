// src/components/Footer/Footer.jsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-start gap-4">
        {/* Logo + copyright */}
        <div className="footer-brand">
          <h4 className="logo">VIVIDARA</h4>
          <p className="copyright d-none d-md-block">© 2025 VIVIDARA. All rights reserved.</p>
        </div>

        {/* Navigation Links */}
        <div className="footer-links d-flex gap-5 flex-wrap">
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
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>FAQs</li>
            <li>Sitemap</li>
          </ul>
        </div>

        {/* Social Icons */}
        <div className="footer-social">
          <p className="mb-2">Follow Us</p>
          <div className="d-flex gap-2">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/1AfP2qburx/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <IconBrandFacebook size={20} />
            </a>

            {/* Twitter (placeholder, no specific URL provided)
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <IconBrandTwitter size={20} />
            </a> */}

            {/* Instagram */}
            <a
              href="https://www.instagram.com/vividara.in?igsh=aTQzZ3Rhd3JzNGJ0"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <IconBrandInstagram size={20} />
            </a>

            {/* YouTube */}
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

        <div className="footer-brand d-block d-md-none">
          <p className="copyright">© 2024 VIVIDARA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
