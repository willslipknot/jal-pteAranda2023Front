import React, { Component } from 'react';
import '../assets/css/footer.css';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (

      <footer className="footer">
        <Link to="/loginAdmin" style={{ textDecoration: 'none', color: 'inherit' }}>
          <p>Chronus King Group   ©Derechos Reservados</p>
        </Link>
      </footer>
    );


  }
}

export default Footer;