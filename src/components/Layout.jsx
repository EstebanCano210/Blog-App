import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet }    from 'react-router-dom';
import NavBar from './navbars/NavBar.jsx';

export default function Layout() {
  return (
    <>
      <NavBar />
      <Container className="py-4">
        <Outlet />
      </Container>
    </>
  );
}
