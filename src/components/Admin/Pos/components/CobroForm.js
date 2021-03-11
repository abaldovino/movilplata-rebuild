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
  Paper,
  colors,
  IconButton,
  Link,
  Box
} from '@material-ui/core';

import ClearIcon from '@material-ui/icons/Clear';

import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Vertx from 'vertx3-eventbus-client';

import cobroImg from '../../../../assets/image/admin/cobro.png'

import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import GeneralService from '../../../../services/GeneralService'
import PosService from '../../../../services/PosService'
import SucursalService from '../../../../services/SucursalService'

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

const CobroForm = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [ isLoading, setLoading ] = useState( false );
  const { register, handleSubmit, errors, getValues } = useForm()
  const [ userID, setUserId ] = useState();
  const [ userSet, userSetted ] = useState( false )
  const [ searchingUser, setSearchUser ] = useState( false );
  const [ branchToken, setBranchToken ] = useState();

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleBlur = () => {
    const values = getValues()
    console.log(values)
    setSearchUser(true)
    if(values.dni !== "") {
      const generalService = new GeneralService();
      generalService.getUserById(values.dni, props.userData).then((response) => {
        setSearchUser( false )
        if (response.description === 'user not found') {
          userSetted( false )
          toast.error("Usuario no existe !", toastError);
          setSearchUser(false) 
        } else {
          userSetted( true )
          toast.success("Usuario existe. !", toastSuccess); 
          setUserId(response.data.id)
          setSearchUser(false)
        }
      })
    }else{
      toast.error("Ingresa el usuario a buscar !", toastError); 
      setSearchUser(false)
    }
  }

  const onSubmit = async data => {
    setLoading(true)
    const token = props.sucursales.filter((sucursal) => { return sucursal.id === parseInt(data.sucursal) })[0].token
    setBranchToken(token)
    const posService = new PosService()
    posService.SendPayRequest(data, props.userData.commerce.id, userID).then( async response => {
      if(response.description === 'Success'){
        setLoading(false)
        toast.info("Esperando Pago. !", toastSuccess);
        receiveNotificationSuccess(token)
        userSetted(false)
        setSearchUser(false)
      }else{
        setLoading(false)
        toast.error("Cobro fallida!", toastError); 
        console.log(response)
        userSetted(false)
        setSearchUser(false)
      }
    })
  }
  const receiveNotificationSuccess = (branchToken) => {
    const eb = new Vertx("https://movilplata.com/api/notification/eventbus");
    eb.handlers = branchToken
    eb.onopen = () => {
      const token = eb.handlers;
      eb.handlers = {};
      eb.registerHandler(token, function(error, message) {
        console.log('handler', message);
        console.log('handler', message.headers);
        switch (message.headers.action) {
          case 'cancel_transaction':
            toast.error("Pago Cancelado. !", toastError); 
            eb.close()
            break
          case 'confirmation_payment':
            toast.success("Pago Realizado. !", toastSuccess);
            eb.close()
            break
          default:
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader title='Movil Cobro' action={
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
                        <TextField fullWidth label="Monto a cobrar" name="amount" required
                          variant="outlined"  inputRef={register({ required: true, maxlength: 20 })}
                          helperText="Monto a cobrar"
                        />
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
          <Button className={classes.saveButton} variant="contained" type='submit'> Cobrar </Button>
        ) : (
          <Button className={classes.saveButton} type="button" variant="contained" onClick={() => handleBlur()} > { buttonText } </Button>
        ) }
        </CardActions>
      </form>
    </Card>
  );
};

CobroForm.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object.isRequired
};

export default CobroForm;
