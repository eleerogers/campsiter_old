import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';


function Footer() {
  const {
    location: {
      pathname
    }
  } = useHistory();

  return pathname === '/' ? null : (
  <Navbar bg="dark" variant="light" sticky="bottom">
    <Container className="footer-copyright text-center pb-1 pt-1 footer">
      <Link
        className="text-muted font-size-14 mr-auto underline-hover"
        to="/contact"
      >
        Contact Us
      </Link>
      <div className="text-muted font-size-14 ml-auto">
        © {new Date().getFullYear()} CampSiter
      </div>
    </Container>
  </Navbar>
  );
}

export default Footer;
