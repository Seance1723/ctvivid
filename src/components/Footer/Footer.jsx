// src/components/Footer/Footer.jsx

import React from 'react';
import { useLocation } from 'react-router-dom';
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
          <p className="copyright">© 2024 VIVIDARA. All rights reserved.</p>
        </div>

        {/* Navigation Links */}
        <div className="footer-links d-flex gap-5 flex-wrap">
          <ul>
            <li>About Us</li>
            <li>Designers</li>
            <li>Shop Collections</li>
            <li>V-Edits</li>
          </ul>
          <ul>
            <li>Sustainability</li>
            <li>Contact Us</li>
            <li>Collaborate with Us</li>
            <li>Returns</li>
          </ul>
          <ul>
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
            <div className="social-icon"><IconBrandFacebook size={20} /></div>
            <div className="social-icon"><IconBrandTwitter size={20} /></div>
            <div className="social-icon"><IconBrandInstagram size={20} /></div>
            <div className="social-icon"><IconBrandYoutube size={20} /></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
