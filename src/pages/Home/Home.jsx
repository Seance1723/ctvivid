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
      introImage: '/pages/Home/home-intro-sec-01.jpg',
      heading: 'Exclusive Designs: Curated by fashion experts.',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      title: 'Lorem Ipsum B',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat',
      boxColor: '#03A9F4',
      introImage: '/pages/Home/home-intro-sec-01.jpg',
      heading: 'Exclusive Designs: Curated by fashion experts.',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      title: 'Lorem Ipsum C',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat',
      boxColor: '#8BC34A',
      introImage: '/pages/Home/home-intro-sec-01.jpg',
      heading: 'Exclusive Designs: Curated by fashion experts.',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      title: 'Lorem Ipsum D',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat',
      boxColor: '#E91E63',
      introImage: '/pages/Home/home-intro-sec-01.jpg',
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
    '/pages/Home/trending/lt-01.png',
    '/pages/Home/trending/lt-02.png',
    '/pages/Home/trending/lt-03.png',
    '/pages/Home/trending/lt-04.png',
    '/pages/Home/trending/lt-05.png',
    '/pages/Home/trending/lt-06.png',
    '/pages/Home/trending/lt-07.png',
    '/pages/Home/trending/lt-08.png',
    '/pages/Home/trending/lt-09.png',
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

        <video className="hero-video" autoPlay muted loop playsInline>
         <source src="/pages/Home/home-hero-sec.mp4" media="(min-width: 768px)" />
         <source src="/pages/Home/home-mobileview.mp4"  media="(max-width: 767px)" />
        </video>

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
        {/* ──────────────── MOBILE CAROUSEL ──────────────── */}
        <div
          id="newProductCarousel"
          className="carousel slide d-block d-md-none h-100"
          data-bs-interval="false"
        >
          {/* Indicators */}
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#newProductCarousel"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#newProductCarousel"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
          </div>

          {/* Inner slides */}
          <div className="carousel-inner h-100">
            {/* Slide 1 */}
            <div className="carousel-item active h-100">
              <div
                className="product-left w-100 h-100"
                style={{
                  backgroundImage: "url('/pages/Home/home-product-left.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: '200px'
                }}
              >
                <div className="action-area">
                  <h4 className="product-name">Asuri</h4>
                  <Link to="/designers" className="cta cta-text p-0" style={{ top: '135%' ,width:'40vw'}}>Shop Now</Link>
                </div>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="carousel-item h-100">
              <div
                className="product-right w-100 h-100"
                style={{
                  backgroundImage: "url('/pages/Home/home-product-right.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: '200px'
                }}
              >
                <div className="action-area">
                  <h4 className="product-name">MAKDI RANI</h4>
                  <a
                    href="#"
                    className="link-disabled"
                    aria-disabled="true"
                    tabIndex={-1}
                  >
                    COMING SOON
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          {/* <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#newProductCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#newProductCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button> */}
        </div>

        {/* ──────────────── DESKTOP LAYOUT ──────────────── */}
        <div className="container-fluid w-100 h-100 d-none d-md-block">
          <div className='row h-100'>
            <div className='col-12 col-md-6 p-0 h-100'>
              <div className='product-left w-100 h-100' style={{ backgroundImage: "url('/pages/Home/home-product-left.png')" }}>
                <div className='action-area'>
                  <h4 className='product-name'>Asuri</h4>
                  <Link to="/designers" className="cta cta-text p-0" style={{ top: '135%' }}>Shop Now</Link>
                </div>
              </div>
            </div>
            <div className='col-12 col-md-6 h-100 p-0'>
              <div className='product-right w-100 h-100' style={{ backgroundImage: "url('/pages/Home/home-product-right.png')" }}>
                <div className='action-area'>
                  <h4 className='product-name'>MAKDI RANI</h4>
                  <a href='#' className='link-disabled' aria-disabled="true" tabindex="-1">COMING SOON</a>
                </div>
              </div>    
            </div>
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
                <img src="/pages/Home/home-about-sec.png" alt="About Us" className='img-fluid' />
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
        <video className="cta-bg-video" autoPlay muted loop playsInline>
          <source src="/pages/Home/home-footer-sec.mp4" media="(min-width: 768px)" />
          <source src="/pages/Home/footer-mobileview.mp4" media="(max-width: 767px)" />
        </video>
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
              <button type="submit" className="cta cta-primary" style={{ width: '100%' }}
>Continue</button>
            </form>
          </div>
        </div>
        <Footer />
      </section>
    </div>
  );
};

export default Home;
