import React, { Component } from 'react'; 
import '../assets/css/footer.css'; 
import { Link } from 'react-router-dom';

class Footer extends Component {
    render() {
        return (

  <footer className="footer">
    <Link to="/loginAdmin"><p>Chronus</p></Link><p>King Group   ©Derechos Reservados</p><p></p>
  </footer>
);
  

}}

export default Footer;