import React, { useState } from 'react'
import Loader from 'react-loader-spinner'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import logoImg from './assets/logo.png'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { Redirect } from 'react-router-dom'
import { useAuth } from "../../../contexts/Auth";
import LoginService from '../../../services/AuthService'

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
const FormLogin = (props) => {
  const authTokenStorage = localStorage.getItem("tokens");
  const [ isLoading, setLoading ] = useState( false );
  const [ isLoggedIn, setLoggedIn ] = useState( authTokenStorage != null ? true : false );
  const { register, handleSubmit, watch, errors } = useForm()
  const { setAuthTokens, authTokens } = useAuth();
  const { setUserData, userData } = useAuth();

  const onSubmit = data => {
    const formData = data;
    setLoading(true)
    let loginService = new LoginService();
    loginService.getAccessToken(data).then((response, data) => {
      if (response.status === 200) {
        loginService.getUserData(formData, response.data).then((response, data) => {
          if (response.status === 200) {
            setUserData(response.data.data)
            props.handleLoading(false)
            toast.success("Logueado Correctamente !");
            setLoading(false)
            setAuthTokens(response.data);
          } else {
            toast.error("Error", toastError);  
          }
        })
      } else {
        debugger
        if( response.data.commerce === null ){
          props.handleLoading(false)
          toast.error("No tienes un comercio asociado.", toastError);  
        }else{
          props.handleLoading(false)
          toast.error(response.description, toastError);  
        }
        setLoading(false)
      }
    })
  }

  if (authTokens){ return <Redirect to="/admin/home" /> } 

  const buttonText =  isLoading ? <Loader type="ThreeDots" color="#25d366" height={20} width={20}/> : 'Entrar'

  return (
    <div className="col-12 col-md-10 offset-md-1">
      <div className="auth-wrapper d-flex justify-content-center flex-column align-items-center py-5"> 
        <img src={logoImg} alt="" height='100' width='300'/>
        <div className="card my-md-5 d-flex flex-row border-0" style={{ backgroundColor: '#fff0' }}>
          <div className="col-12 py-4 px-5">
            <form onSubmit={handleSubmit(onSubmit)} name='loginForm'>
              <div className="form-group">
                 <input 
                       className={`form-control ${ errors.username && 'is-invalid' }`}  
                       placeholder="CC" 
                       name='username'
                       ref={register({ required: true, maxlength: 20 })}/>
                       {errors.username && <p className="invalid-feedback d-block">This username is invalid</p>}
              </div>
              <div className="form-group">
                 <input  type="password" 
                        className={`form-control ${ errors.password && 'is-invalid' }`} 
                        placeholder="Contrasena"
                        name='password'
                        ref={register({ required: true, minLength: 3 })}/>
                {errors.password && <p className="invalid-feedback d-block">This password is invalid</p>}
              </div>
              <div className="text-center ">
                 <button type="submit" className=" btn-auth btn-block btn-movilplata">{ buttonText }</button>
              </div>
              <div className="form-group my-2">
                <a className="btn-auth btn-block btn-dark" onClick={props.modifyState} style={{ backgroudColor: 'rgb(9, 30, 45)', borderColor: 'rgb(9, 30, 45)', color: '#fff' }}>
                  Registro para comercios
                </a>
              </div>
              <p  className="small mt-3">Registrandote, estas indicando que aceptas nuestros <a href="/terms"  className="ps-hero__content__link text-white">Terminos de uso</a> y <a href="/privacy" className='text-white'>la politica de privacidad</a>.</p>
           </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormLogin;
