// src/components/Layout/NavLayout/NavLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import PageHeader from '../../PageHeader/PageHeader';

export default function NavLayout() {
  return (
    <>
      <PageHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
}
