import React, { Fragment } from 'react'

import iconBono from '../assets/icon-bono.png'
import iconGrande from '../assets/icon-grande.png'
import iconComerciante from '../assets/icon-comerciante.png'
import cel2 from '../assets/cel-2.png'
import cel3 from '../assets/cel3.png'
import googleImage from '../assets/google.png'
import appleImage from '../assets/apple.png'
import atlanticoCrea from '../assets/atlanticocrea.png'

import {
  Link
} from "react-router-dom";

export default function Content() {
  return (
    <Fragment>
      <section className="second-section" id='inicio'>
        <div className="container py-5">
          <p className="detail mt-3 mb-3">
          Fortaleciendo el tejido empresarial del Caribe y toda Colombia por medio
           de la implementación de tecnología para fomentar la inclusión y
           educación financiera...
          </p>
          <div className="mision-container">
            <div>
              <img src={iconBono} alt="" />
              <h3>BONOS DIRIGIDOS</h3>
              <p>
                Con los MOVILBONOS de transporte, alimentos, medicamentos etc. Se
                incentiva la reducción del uso de efectivo en las calles, se
                enseña a la población la forma como gastar el dinero de su
                presupuesto familiar y se provee educación financiera eficiente .
              </p>
            </div>
            <div>
              <img src={iconComerciante} alt="" />

              <h3>COMERCIANTES INDEPENDIENTES</h3>
              <p>
                Nuestra plataforma está orientada a la inclusión social y
                financiera, Tenemos una solución tecnológica eficiente y practica
                a la medida de cada sector de la economía, desde el comercio
                informal como vendedores de frutas, minutos, café etc. Hasta los
                micro comerciantes como una cafetería de una institución
                educativa, una tienda de víveres, peluquerías, barberías etc.,
                todos estos micro comercios mantienen un considerable flujo de
                dinero en efectivo que desean manejar de una forma eficiente.
              </p>
            </div>
            <div>
              <img src={iconGrande} alt="" />

              <h3>GRANDES SUPERFICIES</h3>
              <p>
                Movilplata también ofrece una solución tecnológica especializada
                para grandes comercios y cadenas de almacenes. Nuestra plataforma
                permite a los usuarios la adquisición de productos y servicios a
                través de una infraestructura abierta y soportada en un modelo de
                ecosistema tecnológico para la creación de tejido social y
                empresarial, basado en el concepto de la inversión social
                responsable y educación financiera, apoyados en el uso de
                tecnologías de información y las telecomunicaciones.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="third-section" id='servicios'>
        <div className="title">
          <h2>
            Estamos con Movilplata
          </h2>
          <p>
            Fortaleciendo el tejido empresarial del Caribe y toda Colombia por
            medio de la implementación de tecnología para fomentar la inclusión y
            educación financiera.
          </p>
          <img className="floating" src={cel2} />
        </div>
        <div className="list">
          <ul>
            <li>
              <h4>1</h4>

              <p>
                Pago fácil a través de movilbonos y movilpesos
              </p>
            </li>
            <li>
              <h4>2</h4>

              <p>
                Recargas disponible en una amplia red de puntos autorizados
              </p>
            </li>
            <li>
              <h4>3</h4>

              <p>
                Grandes beneficios acumulando MovilPuntos
              </p>
            </li>
          </ul>
        </div>
      </section>
      <section className="fourth-section" id='download'>
        <div className="text">
          <h2>
            MOVILPLATA
          </h2>
          <p>
            Descarga la aplicación de MOVILPLATA para todas las plataformas, vamos
            , descargala ahora!
          </p>
          <div className="store-container">
            <img src={googleImage} alt="google" />
            <img src={appleImage} alt="apple" />
          </div>
        </div>
        <div className="image-container">
          <img className="floating" src={cel3} style={{ height: '700px' }}/>
        </div>
      </section>
      <section className="winner-section" id='acercade'>
        <img src={atlanticoCrea} alt="pryecto ganador" />
        <div className="text">
          <h2>Desarrollamos un ecosistema tecnológico</h2>
          <p>
            de inclusión y educación financiera y el manejo eficiente del efectivo
            responsable para la construcción de tejido social y empresarial.
          </p>
        </div>
      </section>
      <section className="contactanos-section" id='contact'>
        <div>
          <a className="btn">
            Notificaciones@movilplata.com
          </a>
        </div>
      </section>
      <footer className='pt-5'>
        <div className="container">
          <div className="last">
            <p className="mt-1">
              <p  className="small mt-0 border-0">Registrandote, estas indicando que aceptas nuestros 
              <Link to='/terms'><a className="ps-hero__content__link">Terminos de uso</a></Link> y <Link to='/privacy'><a>la politica de privacidad</a></Link>.</p>
              MovilPlata 2019 | Privacy Policy | powered by CPS |
              Dirección: Vía 40#71-124
              Ciudad: Barranquilla
              | Correo de contacto: Notificaciones@movilplata.com
            </p>
          </div>
        </div>
      </footer>
    </Fragment>
  )
}
