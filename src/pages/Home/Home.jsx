// src/pages/Home/Home.jsx

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Footer from '../../components/Footer/Footer';
import './Home.scss';

// Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Swiper modules
import { Mousewheel, Autoplay } from 'swiper/modules';
// Swiper styles
import 'swiper/css';

const Home = () => {
    const location = useLocation();
    const ResponsiveVideo = ({ desktopSrc, mobileSrc, className, poster }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 767);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <video
      className={className}
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
      preload="auto"
      webkit-playsinline="true"
    >
      <source src={isMobile ? mobileSrc : desktopSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};


  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100); // small delay to ensure DOM is ready
      }
    }
  }, [location]);

  
  const containerRef = useRef(null);

  // Tab data for Intro
  const features = [
    {
      title: 'Lorem Ipsum A',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat',
      boxColor: '#FFC107',
      introImage: `${process.env.PUBLIC_URL}/pages/Home/home-intro-sec-01.jpg`,
      heading: 'Exclusive Designs: Curated by fashion experts.',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      title: 'Lorem Ipsum B',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat',
      boxColor: '#03A9F4',
      introImage: `${process.env.PUBLIC_URL}/pages/Home/home-intro-sec-01.jpg`,
      heading: 'Exclusive Designs: Curated by fashion experts.',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      title: 'Lorem Ipsum C',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat',
      boxColor: '#8BC34A',
      introImage: `${process.env.PUBLIC_URL}/pages/Home/home-intro-sec-01.jpg`,
      heading: 'Exclusive Designs: Curated by fashion experts.',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      title: 'Lorem Ipsum D',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat',
      boxColor: '#E91E63',
      introImage: `${process.env.PUBLIC_URL}/pages/Home/home-intro-sec-01.jpg`,
      heading: 'Exclusive Designs: Curated by fashion experts.',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // your IntersectionObserver for section activation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const sections = container.querySelectorAll('.homepage-section');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          entry.target.classList.toggle(
            'active',
            entry.intersectionRatio >= 0.5
          );
        });
      },
      { root: container, threshold: 0.5 }
    );
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // <-- NEW: just swap in your real image URLs here -->
  const trendImages = [
    `${process.env.PUBLIC_URL}/pages/Home/trending/lt-01.png`,
    `${process.env.PUBLIC_URL}/pages/Home/trending/lt-02.png`,
    `${process.env.PUBLIC_URL}/pages/Home/trending/lt-03.png`,
    `${process.env.PUBLIC_URL}/pages/Home/trending/lt-04.png`,
    `${process.env.PUBLIC_URL}/pages/Home/trending/lt-05.png`,
    `${process.env.PUBLIC_URL}/pages/Home/trending/lt-06.png`,
    `${process.env.PUBLIC_URL}/pages/Home/trending/lt-07.png`,
    `${process.env.PUBLIC_URL}/pages/Home/trending/lt-08.png`,
    `${process.env.PUBLIC_URL}/pages/Home/trending/lt-09.png`,
  ];

  return (
    <div className="homepage-container" ref={containerRef}>
      {/* Hero Section */}
      <section className="homepage-section hero-section active" data-nav-style="logo-only-light" >
        {/* <video
          className="hero-video"
          src="/pages/Home/home-hero-sec.mp4"
          poster="/pages/Home/home-hero-sec-poster.jpg"
          preload="auto"
          muted
          loop
          autoPlay
          playsInline
          webkit-playsinline
        /> */}

        {/* <video className="hero-video" autoPlay muted loop playsInline>
         <source src="/pages/Home/home-hero-sec.mp4" media="(min-width: 768px)" />
         <source src="/pages/Home/home-mobileview.mp4"  media="(max-width: 767px)" />
        </video> */}
        <ResponsiveVideo
  className="hero-video"
  desktopSrc={`${process.env.PUBLIC_URL}/pages/Home/home-hero-sec.mp4`}
  mobileSrc={`${process.env.PUBLIC_URL}/pages/Home/home-mobileview.mp4`}
  poster={`${process.env.PUBLIC_URL}/pages/Home/home-hero-sec-poster.jpg`}
/>


        <div className="section-content container" style={{ top: '80%' }}>
          <div className="row d-flex justify-content-between align-items-center">
            <div className="col-md-7 hero-text text-start">
              <h2 className='text-white'>The Light, The Abyss.</h2>
              <p className='text-white'>Presenting Vakra's Poochandi, Asuri: An exploration of the allure of the unknown.</p>
            </div>
            <div className="col-md-5 hero-button text-end">
              <Link
                to="/designers#productInfo"
                className="cta cta-text text-white p-0"
              >Shop Now</Link>
            </div>
          </div>
        </div>

      </section>

      {/* New products */}
      <section
        className="homepage-section newproduct-section"
        data-nav-style="logo-only-dark"
      >
        {/* ──────────────── MOBILE IMAGE GRID ──────────────── */}
        <div className="d-flex d-md-none w-100 h-100 mobile-product-grid">
          <Link to="/designers" className="product-grid-item">
            <img src={`${process.env.PUBLIC_URL}/pages/Home/products/IMG_2713_3.jpg`} alt="Asuri" />
            <span className="grid-tooltip">Asuri</span>
          </Link>
          <Link to="/daisydrama" className="product-grid-item">
            <img src={`${process.env.PUBLIC_URL}/pages/Home/products/IMG_2713_2.jpg`} alt="Daisy Drama" />
            <span className="grid-tooltip">Daisy Drama</span>
          </Link>
          <Link to="/trishna" className="product-grid-item">
            <img src={`${process.env.PUBLIC_URL}/pages/Home/products/IMG_2713_9.jpg`} alt="Trishna" />
            <span className="grid-tooltip">Trishna</span>
          </Link>
          <Link to="/daisydrama" className="product-grid-item">
            <img src={`${process.env.PUBLIC_URL}/pages/Home/products/IMG_2713_4.jpg`} alt="Daisy Drama" />
            <span className="grid-tooltip">Coming Soon</span>
          </Link>
          <Link to="/designers" className="product-grid-item">
            <img src={`${process.env.PUBLIC_URL}/pages/Home/products/IMG_2713_1.jpg`} alt="Asuri" />
            <span className="grid-tooltip">Coming Soon</span>
          </Link>
          <Link to="/trishna" className="product-grid-item">
            <img src={`${process.env.PUBLIC_URL}/pages/Home/products/IMG_2713_13.jpg`} alt="Trishna" style={{ objectPosition: 'left center' }} />
            <span className="grid-tooltip">Coming Soon</span>
          </Link>
          <Link to="/trishna" className="product-grid-item">
            <img src={`${process.env.PUBLIC_URL}/pages/Home/products/IMG_2713_13.jpg`} alt="Trishna" style={{ objectPosition: 'center center' }} />
            <span className="grid-tooltip">Coming Soon</span>
          </Link>
          <Link to="/trishna" className="product-grid-item">
            <img src={`${process.env.PUBLIC_URL}/pages/Home/products/IMG_2713_13.jpg`} alt="Trishna" style={{ objectPosition: 'right center' }} />
            <span className="grid-tooltip">Coming Soon</span>
          </Link>
        </div>

        {/* ──────────────── DESKTOP IMAGE GRID ──────────────── */}
        <div className="d-none d-md-flex w-100 h-100" style={{ flexDirection: 'column', background: '#1a1a1a', padding: '16px', gap: '10px', overflow: 'hidden' }}>
          {/* Top Row - 4 images */}
          <div style={{ display: 'flex', flex: 1, gap: '10px', minHeight: 0 }}>
            <Link to="/designers" className="product-grid-item" style={{ flex: 1, borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
              <img src={`${process.env.PUBLIC_URL}/pages/Home/products/IMG_2713_3.jpg`} alt="Asuri" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <span className="grid-tooltip">Asuri</span>
            </Link>
            <Link to="/daisydrama" className="product-grid-item" style={{ flex: 1, borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
              <img src={`${process.env.PUBLIC_URL}/pages/Home/products/IMG_2713_2.jpg`} alt="Daisy Drama" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <span className="grid-tooltip">Daisy Drama</span>
            </Link>
            <Link to="/trishna" className="product-grid-item" style={{ flex: 1, borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
              <img src={`${process.env.PUBLIC_URL}/pages/Home/products/IMG_2713_9.jpg`} alt="Trishna" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <span className="grid-tooltip">Trishna</span>
            </Link>
            <Link to="/daisydrama" className="product-grid-item" style={{ flex: 1, borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
              <img src={`${process.env.PUBLIC_URL}/pages/Home/products/IMG_2713_4.jpg`} alt="Daisy Drama" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <span className="grid-tooltip">Coming Soon</span>
            </Link>
          </div>
          {/* Bottom Row - 4 images */}
          <div style={{ display: 'flex', flex: 1, gap: '10px', minHeight: 0 }}>
            <Link to="/designers" className="product-grid-item" style={{ flex: 1, borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
              <img src={`${process.env.PUBLIC_URL}/pages/Home/products/IMG_2713_1.jpg`} alt="Asuri" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <span className="grid-tooltip">Coming Soon</span>
            </Link>
            <Link to="/trishna" className="product-grid-item" style={{ flex: 1, borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
              <img src={`${process.env.PUBLIC_URL}/pages/Home/products/IMG_2713_13.jpg`} alt="Trishna" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left center', display: 'block' }} />
              <span className="grid-tooltip">Coming Soon</span>
            </Link>
            <Link to="/trishna" className="product-grid-item" style={{ flex: 1, borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
              <img src={`${process.env.PUBLIC_URL}/pages/Home/products/IMG_2713_13.jpg`} alt="Trishna" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block' }} />
              <span className="grid-tooltip">Coming Soon</span>
            </Link>
            <Link to="/trishna" className="product-grid-item" style={{ flex: 1, borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
              <img src={`${process.env.PUBLIC_URL}/pages/Home/products/IMG_2713_13.jpg`} alt="Trishna" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right center', display: 'block' }} />
              <span className="grid-tooltip">Coming Soon</span>
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section*/}
      <section  id="about-us" className="homepage-section aboutus-section" data-nav-style="logo-only-dark">
        <div className="section-content container pt-5">
          <div className='row'>
            <div className='col-12 col-md-8'>
              <div className='about-left'>
                <h2 className='sec-title mb-4'>About us</h2>
                <p className='sec-content mb-3'>Hey! We are <strong>VIVIDARA.</strong></p>
                <p className='sec-content mb-3'>We're <strong>curators of the wearable stories.</strong> Each piece in our care comes with its own biography, the hands that shaped it, the ideas that formed it, the life it's meant to live (NOT IN YOUR SHELF).</p>
                <p className='sec-content mb-3'>Here, we - <strong>the creators, the wearers, the admirers</strong> - are all part of the dialogue.</p>
                <p className='sec-content mb-3'>We're <strong>building a living archive</strong> where every visitor becomes a contributor to the conversation cause we love to talk.</p>
                <p className='sec-content mb-3'>Join us in this careful, joyful work of sartorial interpretation. Bring your perspective to our ever-evolving collection. For those who see their wardrobe as a curated collection (and their closet as a gallery).</p>
              </div>
            </div>
            <div className='col-12 col-md-4'>
              <div className='about-right'>
                <img src={`${process.env.PUBLIC_URL}/pages/Home/home-about-sec.png`} alt="About Us" className='img-fluid' />
              </div>    
            </div>
          </div>
        </div>
      </section>

      {/* CTA & Footer */}
      <section  id="collaborate" className="homepage-section cta-section" data-nav-style="full-light" >
        {/* <video
          className="cta-bg-video"
          src="/pages/Home/home-footer-sec.mp4"
          poster="/pages/Home/home-footer-sec-poster.png"
          preload="auto"
          muted
          loop
          autoPlay
          playsInline
          webkit-playsinline
        /> */}
        {/* <video className="cta-bg-video" autoPlay muted loop playsInline>
          <source src="/pages/Home/home-footer-sec.mp4" media="(min-width: 768px)" />
          <source src="/pages/Home/footer-mobileview.mp4" media="(max-width: 767px)" />
        </video> */}
        <ResponsiveVideo
  className="cta-bg-video"
  desktopSrc={`${process.env.PUBLIC_URL}/pages/Home/home-footer-sec.mp4`}
  mobileSrc={`${process.env.PUBLIC_URL}/pages/Home/footer-mobileview.mp4`}
/>

        <div className="container section-content">
          <div className='footer-content'>
            <h2>We're all ears!</h2>
            <p>
              Interested in partnering or connecting as a <br />
              customer? Drop us your mail ID.
            </p>
            <form className='newsletter-form'>
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control"
                required
              />
              <button type="submit" className="cta cta-primary" >Continue</button>
            </form>
          </div>
        </div>
        <Footer />
      </section>
    </div>
  );
};

export default Home;
