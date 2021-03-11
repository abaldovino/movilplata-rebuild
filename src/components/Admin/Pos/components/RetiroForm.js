import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Divider,
  TextField,
  CircularProgress,
  Box,
  colors,
  IconButton,
  Link
} from '@material-ui/core';

import ClearIcon from '@material-ui/icons/Clear';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Vertx from 'vertx3-eventbus-client';

import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import GeneralService from '../../../../services/GeneralService'
import PosService from '../../../../services/PosService'
import SweetAlert from 'sweetalert2-react';
import cobroImg from '../../../../assets/image/admin/cobro.png'


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

const useStyles = makeStyles(theme => ({
  root: {},
  saveButton: {
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  }
}));

const RetiroForm = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [ isLoading, setLoading ] = useState( false );
  const [ userPockets, setUserPockets ] = useState( [] );
  const [ userID, setUserId ] = useState();
  const { register, handleSubmit, errors, getValues } = useForm()
  const [ userSet, userSetted ] = useState( false )
  const [ searchingUser, setSearchUser ] = useState( false ); 
  const [ branchToken, setBranchToken ] = useState();
  const [ alertShow, setShowAlert ] = useState( false );
  const [ refId, setRefId ] = useState();
  const [ sucursalSelected, setSucursalSelected ] = useState();
  const [ formData, setData ] = useState();
  
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleBlur = () => {
    const values = getValues()
    setUserPockets([])
    setSearchUser( true )
    if(values.name !== ""){
      setUserPockets([])
      const generalService = new GeneralService();
      generalService.getUserById(values.dni, props.userData).then((response) => {
        setSearchUser( false )
        if (response.description === 'user not found') {
          userSetted( false )
          toast.error("Usuario no existe !", toastError); 
        } else {
          toast.success("Bolsillos actualizados. !", toastSuccess);
          userSetted( true )
          setUserPockets(response.data.userPockets.filter((item) => item.pocket.description == "Movilpesos"))
          setUserId(response.data.id)
        }
      })
    }else{
      toast.error("Ingrese el identificador del usuario!", toastError); 
    }
  }

  const onSubmit = data => {
    setLoading(true)
    const token = props.sucursales.filter((sucursal) => { return sucursal.id === parseInt(data.sucursal) })[0].token
    setBranchToken(token)
    setData(data)
    let posService = new PosService()
    posService.SendPaymentRequest(data, props.userData.commerce.id, userID).then( async response => {
      if(response.description === 'Success'){
        setLoading(false)
        toast.info("Retiro esperando aprobacion. !", toastSuccess);
        console.log(token)
        setRefId(response.data.idTransactionReference)
        receiveConfirmation(token)
        userSetted(false)
        setSearchUser(false)
      }else{
        switch (response.statusCode) {
          case 1414:
            toast.error("Bolsillo no tiene suficiente dinero !", toastError); 
            break
          default:
            toast.error("Error contacta al proveedor. !", toastError); 
        }
        setLoading(false)
        toast.error("Retiro fallida!", toastError); 
        console.log(response)
        userSetted(false)
        setSearchUser(false)
      }
    })
  }

  const confirmWithdraw = (refId) => {
    console.log('Retiro')
    console.log(formData)
    console.log(props)
    let posService = new PosService()
    posService.SendConfirmationPaymentRequest(formData, props.userData.commerce.id, refId, userID).then( async response => {
      console.log('RetiroConfirmadoService', response)
    })

  }

  const receiveConfirmation = (branchToken) => {
    const eb = new Vertx("https://movilplata.com/api/notification/eventbus");
    eb.handlers = `wallet-service-address-${Date.now()}`
    eb.onopen = () => {
      const token = eb.handlers;
      console.log('receiveConfirmation', token)
      eb.handlers = {};
      eb.registerHandler(token, function(error, message) {
        debugger
        console.log('Errpr', error);
        console.log('handler', message);
        console.log('handler', message.headers);
        switch (message.headers.action) {
          case 'cancel_transaction':
            toast.error("Pago Cancelado. !", toastError); 
            eb.close()
            break
          case 'withdraw_confirmation':
            toast.success("Retiro Completado. !", toastSuccess);
            eb.close()
            break
          default:
            debugger
            toast.error("Error contacta al proveedor. !", toastError); 
            eb.close()
        }
      })
    }

    eb.onerror = function(error){
      console.log(error)
    }

  }

  const buttonText =  searchingUser ? <Loader type="ThreeDots" color="#25d366" height={20} width={20}/> : <i class="far fa-user"> Buscar Usuario </i>
  const preventDefault = event => event.preventDefault();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form onSubmit={handleSubmit(onSubmit)} name='loginForm'>
      <CardHeader title="Movil Retiro" action={
        <IconButton aria-label="settings" onClick={() => props.handleClick()}>
          <ClearIcon />
        </IconButton>
        }/>
        <Divider />
        <CardContent>
        {isLoading ? (
            <Box component="span" style={{ display:'flex', justifyContent:'center', alignContent:'center' }}>
              <CircularProgress/>
            </Box>
          ) : (
            <Grid
            container
            spacing={4}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <img src={cobroImg} alt="recarga-masive" style={{ padding: '0 100px', width: '90%' }}/>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
            
              <Grid 
                container
                spacing={2}
              >
                  <Grid item md={12}>
                    <TextField
                      fullWidth
                      helperText="Introduce el DNI del usuario a cobrar."
                      label="DNI del usuario"
                      placeholder='1002333655 DNI'
                      name='dni'
                      inputRef={register({ required: true, maxlength: 20 })}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  {userSet ? (
                    <React.Fragment>
                      <Grid item md={12} xs={12} >
                        <TextField fullWidth label="Ingresa el valor a retirar" name="amount" required
                          variant="outlined"  inputRef={register({ required: true, maxlength: 20 })}
                          helperText="Ingresa el valor a retirar"
                        />
                      </Grid>
                      <Grid item md={12} xs={12} >
                        <TextField fullWidth name="pocket" select
                          // eslint-disable-next-line react/jsx-sort-props
                          SelectProps={{ native: true }}
                          variant="outlined" inputRef={register({ required: true, maxlength: 20 })}
                          helperText="Selecciona el bolsillo del cual retirar"
                        >
                          <option value=''>Selecciona el bolsillo</option>
                          {userPockets.map((item, key) => 
                            <option key={key} value={item.pocket.id}>{item.pocket.description}</option>
                          )}
                        </TextField>
                      </Grid>
                      <Grid item md={12} xs={12} >
                        <TextField fullWidth label="Detalle del pago" name="detail"
                          required
                          variant="outlined" inputRef={register({ required: true, maxlength: 20 })}
                          helperText="Referencia del pago"
                        />
                      </Grid>
                      <Grid item md={12} xs={12} >
                        <TextField fullWidth name="sucursal" select
                          // eslint-disable-next-line react/jsx-sort-props
                          SelectProps={{ native: true }}
                          variant="outlined" inputRef={register({ required: true, maxlength: 20 })}
                          helperText="Selecciona la sucursal que hace el pago."
                        >
                          <option value=''>Selecciona la sucursal</option>
                          {props.sucursales.map((item, key) => 
                            <option key={key} value={item.id}>{item.name}</option>
                          )}
                        </TextField>
                      </Grid>
                    </React.Fragment>
                  ) : ( null )}
                </Grid>
            </Grid>
          </Grid>
          )}
        </CardContent>
        <Divider />
        <CardActions>
        {userSet ? (
          <Button className={classes.saveButton} type="submit" variant="contained" > Retiro </Button>
        ) : (
          <Button className={classes.saveButton} type="button" variant="contained" onClick={() => handleBlur()} > { buttonText } </Button>
        ) }
        </CardActions>
      </form>
        { alertShow ? <SweetAlert
          show={alertShow}
          title="Confirmacion de retiro"
          text="Desea continuar con el proceso?"
          showCancelButton
          onConfirm={() => confirmWithdraw(refId)}
          onCancel={() => {
            console.log('cancel');
            setShowAlert(!alertShow);
          }}
          onEscapeKey={() => setShowAlert(!alertShow)}
          onOutsideClick={() => setShowAlert(!alertShow)}
        /> : null }
    </Card>
  );
};

RetiroForm.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object.isRequired
};

export default RetiroForm;
