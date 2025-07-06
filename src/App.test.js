import { render } from '@testing-library/react';
import React from 'react';
import App from './App';

// Mock react-router-dom to avoid module resolution issues during tests.
jest.mock(
  'react-router-dom',
  () => ({
    HashRouter: ({ children }) => <div>{children}</div>,
    Routes: ({ children }) => <div>{children}</div>,
    Route: () => null,
  }),
  { virtual: true }
);

// Mock Swiper modules to prevent Jest from trying to resolve them during tests.
jest.mock(
  'swiper/react',
  () => ({ Swiper: ({ children }) => <div>{children}</div>, SwiperSlide: ({ children }) => <div>{children}</div> }),
  { virtual: true }
);
jest.mock('swiper/modules', () => ({}), { virtual: true });
jest.mock('swiper/css', () => {}, { virtual: true });

// Basic smoke test to ensure the App component renders without crashing.
test('renders without crashing', () => {
  render(<App />);
});