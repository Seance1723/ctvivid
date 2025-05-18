// src/pages/Home/Home.jsx

import React, { useEffect, useRef, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import './Home.scss';

// Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Swiper modules
import { Mousewheel, Autoplay } from 'swiper/modules';
// Swiper styles
import 'swiper/css';

const Home = () => {
  
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
      <section
        className="homepage-section hero-section active"
        data-nav-style="nav-light"
      >
        <video
          className="hero-video"
          src="/pages/Home/home-hero-sec.mp4"
          muted
          loop
          autoPlay
          playsInline
        />
        <div className="section-content">{/* … */}</div>
      </section>

      {/* Intro */}
      <section className="homepage-section intro-section" data-nav-style="nav-dark">
        <div className="section-content container pt-5">
          <div className='row'>
            <div className='col-12'>
              <h1>
                Where <span>individuality</span><br />
                meets fashion-forward designs.
              </h1>
            </div>
          </div>
          <div className="intro-content row">
            <ul className="features-list col-12 col-md-4">
              {features.map((f, idx) => (
                <li
                  key={f.title}
                  className={idx === activeIndex ? 'active' : ''}
                  onClick={() => setActiveIndex(idx)}
                >
                  <strong>{f.title}</strong>
                  <p>{f.description}</p>
                </li>
              ))}
            </ul>
            <div className="intro-right col-12 col-md-8">
              <div
                className="intro-box"
                style={{ backgroundImage: `url(${features[activeIndex].introImage})`, }}
              />
              <div className="intro-text">
                <h3>{features[activeIndex].heading}</h3>
                <p>{features[activeIndex].text}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trends Slider with real images */}
      <section
        className="homepage-section trends-section"
        data-nav-style="nav-dark"
      >
        <div className="section-content p-0">
          <div className='container'>
            <div className='row'>
              <div className='col-12'>
                <h2 className='text-start'>Shop the Latest Trends</h2>
              </div>
            </div>
          </div>
          <div className='container-fluid p-0'>
            <div className='row'>
              <div className='col-12'>
                <Swiper
                  modules={[Mousewheel, Autoplay]}
                  loop
                  mousewheel={{ forceToAxis: true }}
                  autoplay={{ delay: 2500, disableOnInteraction: false }}
                  slidesPerGroup={1}
                  spaceBetween={0}
                  breakpoints={{
                    0:    { slidesPerView: 1 },
                    600:  { slidesPerView: 4 },
                    1000: { slidesPerView: 6 },
                  }}
                  className="trends-swiper"
                >
                  {trendImages.map((src, idx) => (
                    <SwiperSlide key={idx}>
                      <img
                        src={src}
                        alt={`Trend ${idx + 1}`}
                        className="trend-item-img"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
          <div className='container'>
            <div className='row'>
              <div className='col-12 text-end'>
                <h4 className='mt-3'>Bold & Beautiful: Make a Statement</h4>
                <p>Dare to stand out with bold, eye-catching designs that elevate your wardrobe.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section
        className="homepage-section details-section"
        data-nav-style="nav-dark"
      >
        <div className="container section-content">
          <div className='row'>
            <div className='col-12'>
              <h2>
                Where <span>individuality</span><br />
                meets fashion-forward designs.
              </h2>
            </div>
          </div>
          <div className='row details-content'>
            <div className='col-12 col-md-6'>
              
              <div className="details-box" style={{ backgroundImage: "url('/pages/Home/home-detail-sec.jpg')" }}></div>
            </div>
            <div className='col-12 col-md-6'>
              <div className="details-text">
                <h3 className='text-start mb-3'>Exclusive Designs: Curated by fashion experts.</h3>
                <p>
                  Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA & Footer */}
      <section
        className="homepage-section cta-section"
        data-nav-style="nav-light"
      >
        <video
          className="cta-bg-video"
          src="/pages/Home/home-footer-sec.mp4"
          muted
          loop
          autoPlay
          playsInline
        />
        <div className="container section-content">
          <h2>Stay in the Loop!</h2>
          <p>
            Sign up for exclusive offers, the latest trends, and
            behind-the-scenes content from Vividara.
          </p>
          <button className="cta-button">Sign up</button>
        </div>
        <Footer />
      </section>
    </div>
  );
};

export default Home;
