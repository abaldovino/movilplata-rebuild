import React from 'react'
import {
  Link
} from "react-router-dom";

export default function SlideShow() {
  return (
    <section className="landing">
      <div className="container">
        <h1>Paga de manera fácil y segura</h1>
        <Link to='/login' className='btn'>Bienvenidos</Link>
      </div>
      
    </section>
  )
}
