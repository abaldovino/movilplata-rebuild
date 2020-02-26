import React from 'react';
import logoMovilPlata from './../Home/assets/logo-movilplata.svg'
const Terminos = (props) => {
  return (
    <React.Fragment>
      <header>
        <nav className='navbar navbar-default navbar-fixed-top'>
          <img src={logoMovilPlata} className="logo"/>
          <div className="links">
            
          </div>
          <div className="nav-buttons">
          </div>
          <div className="burguer-btn">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </nav>
        <div className="link-sm-container" id='container-box'>
        </div>
      </header>
      <body style={{ paddingTop: '25vh' }}>
        <div className="body">
          <section className="">
            <div className="container">
              <div className="row">
                <div className="col-md-10 offset-1">
                  <h1 className='mb-4'>TERMINOS DE USO</h1>
                </div>
              </div>
            </div>
          </section>
        </div>
      </body>
    </React.Fragment>
  )
}

export default Terminos;