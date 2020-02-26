import React from 'react'
import logoMovilPlata from '../assets/logo-movilplata.svg'
import AnchorLink from 'react-anchor-link-smooth-scroll';
import {
  Link
} from "react-router-dom";

const showTab = () => {
  const x = document.getElementById('container-box')
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

export default function Navbar() {
  return (
    <header>
      <nav>
        <img src={logoMovilPlata} className="logo" width='200' alt='movilplata-logo'/>
        <div className="links">
          <AnchorLink href='#inicio' offset='70'>INICIO</AnchorLink>
          <AnchorLink href='#acercade' offset='70'>ACERCA DE</AnchorLink>
          <AnchorLink href='#servicios' offset='70'>SERVICIOS</AnchorLink>
          <AnchorLink href='#download' offset='-70'>DESCARGAR APP</AnchorLink>
          <AnchorLink href='#contact' offset='70'>CONTACTANOS</AnchorLink>
        </div>
        <div className="nav-buttons">
          <Link to='/auth' className='nav-btn'>Entrar</Link>
        </div>
        <div className="burguer-btn" onClick={ () => showTab() }>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </nav>

      <div className="link-sm-container" id='container-box'>
        <AnchorLink href='#inicio' offset='70'>INICIO</AnchorLink>
        <AnchorLink href='#acercade' offset='70'>ACERCA DE</AnchorLink>
        <AnchorLink href='#servicios' offset='70'>SERVICIOS</AnchorLink>
        <AnchorLink href='#download' offset='-70'>DESCARGAR APP</AnchorLink>
        <AnchorLink href='#contact' offset='70'>CONTACTANOS</AnchorLink>

        <Link to='/auth' className='nav-btn'>Entrar</Link>
      </div>
    </header>
  )
}
