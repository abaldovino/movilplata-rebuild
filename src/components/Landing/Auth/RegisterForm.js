import React, { useState } from 'react'
import Loader from 'react-loader-spinner'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import logoImg from './assets/logo.png'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { Route, Link, BrowserRouter as Router, Redirect, useHistory } from 'react-router-dom'
import RegisterService from '../../../services/AuthService'

const toastSuccess = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
}

const toastError = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
}

const RegisterForm = (props) => {
  const [ isLoading, setLoading ] = useState( false );
  const { register, handleSubmit, watch, errors } = useForm()

  const onSubmitRegister = data => { 
    let registerService = new RegisterService();
    props.handleLoading(true)
    registerService.register(data).then((response) => {
      console.log('Register Form', response)
      if (response.description === "Success") {
        toast.success("Registro Completado !", toastSuccess);
        props.handleLoading(false)
        props.modifyState()
      } else {  
        console.log('response:', response)
        console.log('Error en Login', response)
        toast.error(response.description, toastError);
        props.handleLoading(false)
      }
    })
  }

  const buttonText =  props.isLoading ? <Loader type="ThreeDots" color="#25d366" height={20} width={20}/> : 'Registrarse'

  return (
    <div className="col-12 col-md-6 offset-md-3">
      <div className="auth-wrapper d-flex justify-content-center flex-column align-items-center py-5">
        <img src={logoImg} alt="" height='100' width='300'/>
        <div className="card my-md-5 d-flex flex-row border-0" style={{ backgroundColor: '#fff0' }}>
          <div className="col-12 py-4 px-5">
              <form onSubmit={handleSubmit(onSubmitRegister)} name='registerForm'>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label className="auth-label">Email*</label>
                  <input  type="email" 
                          className={`form-control ${ errors.email && 'is-invalid' }`} 
                          placeholder=""
                          name='email'
                          ref={register({ required: true })}/>
                  {errors.email && <p className="invalid-feedback d-block">This email is invalid</p>}
                </div>
                <div className="form-group col-md-6">
                  <label className="auth-label">Numero de Identificacion (CC)*</label>
                  <input  type="text" 
                          className={`form-control ${ errors.username && 'is-invalid' }`} 
                          placeholder=""
                          name='username'
                          ref={register({ required: true , pattern: /^[0-9]*$/ })}/>
                  {errors.username && <p className="invalid-feedback d-block">Usuario Invalido</p>}
                </div>
              </div>
              

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label className="auth-label">Nombre*</label>
                  <input  type="text" 
                          className={`form-control ${ errors.name && 'is-invalid' }`} 
                          placeholder=""
                          name='name'
                          ref={register({ required: true })}/>
                  {errors.name && <p className="invalid-feedback d-block">Nombre requerido.</p>}
                </div>
                <div className="form-group col-md-6">
                  <label className="auth-label">Apellido*</label>
                  <input  type="text" 
                          className={`form-control ${ errors.lastname && 'is-invalid' }`} 
                          placeholder=""
                          name='lastname'
                          ref={register({ required: true })}/>
                  {errors.lastname && <p className="invalid-feedback d-block">Apellido requerido.</p>}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label className="auth-label">Contraseña</label>
                  <input  type="password" 
                          className={`form-control ${ errors.password && 'is-invalid' }`} 
                          placeholder="" 
                          name='password'
                          ref={register({ required: true, minLength: 8 })}/>
                  {errors.password && <p className="invalid-feedback d-block">Contraseña invalida</p>}
                </div>
                <div className="form-group col-md-6">
                  <label className="auth-label">Confirmación de contraseña</label>
                  <input  type="password" 
                          className={`form-control ${ errors.password_confirm && 'is-invalid' }`}
                          ref={register({validate: (value) => value === watch('password'), required: true})}
                          name='password_confirm'
                          placeholder="" />
                  {errors.password_confirm && <p className="invalid-feedback d-block">Confirmación de contraseña erronea</p>}
                </div>
              </div>
                
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label className="auth-label">Telefono*</label>
                  <input  type="text" 
                          className={`form-control ${ errors.phone && 'is-invalid' }`}
                          ref={register({required: true, minLength: 8})}
                          name='phone'
                          placeholder="" />
                  {errors.phone && <p className="invalid-feedback d-block">Telefono requerido o invalido</p>}
                </div>
              </div>
              
              <div  className="text-center ">
                 <button type="submit" className=" btn-auth btn-block btn-movilplata my-2">{ buttonText }</button>
              </div>
              <div  className="form-group">
                <a  className="btn-auth btn-block btn-dark text-white" onClick={props.modifyState}>
                  Volver al login
                </a>
              </div>
              <p  className="small mt-3">Registrandote, estas indicando que aceptas nuestros <a href="#/terms"  className="ps-hero__content__link text-white">Terminos de uso</a> y <a href="#" className='text-white'>la politica de privacidad</a>.</p>
           </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm;