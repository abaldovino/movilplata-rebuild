import React, { useState, useEffect } from 'react';
import Page from '../../../helpers/Page';
import Header from '../../../helpers/Header';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Loader from 'react-loader-spinner';
import clsx from 'clsx';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/styles';
import CryptoJS from 'crypto-js';
import {generateToken} from '../../../helpers/functions';
import moment from 'moment';
import InputMask from "react-input-mask";
import {add_card, card_list} from '../../../services/PaymentezService';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Divider,
  Switch,
  TextField,
  Typography,
  colors,
  Paper,
  Box
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  saveButton: {
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  },
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  TopMargin: {
    marginTop: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    marginBottom: 10,
  },
  dateField: {
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  }
}));

const RechargeWallet = props => {
  const { className, ...rest } = props;
  const [paymentezToken, setpaymentezToken] = useState();
  const [formState, setformState] = useState('list_cards');
  const [buttonText, setButtonText] = useState('Agregar tarjeta')
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { register, handleSubmit, watch, errors, control } = useForm();

  /* TODO Agregar el usuario logueado */
  /* TODO Traer las tarjetas y hacer render */
  /* TODO Conectar con el add card */
  /* TODO A;adir funcionalidad para eliminar la tarjeta */

  const classes = useStyles();
  useEffect(() => {
    const authToken = generateToken();
    setpaymentezToken(authToken)
  }, [])
  const changeState = () => {
    if (formState === 'list_cards') {
      setformState('add_card');
      setButtonText('Listar Tarjetas')
    } else {
      setformState('list_cards');
      setButtonText('Agregar Tarjeta')
    }
  }
  const onSubmit = data => console.log(data);
  const bodyContent = formState === 'list_cards' ? 
    ( 
      <Box component="div" m={1} style={{marginTop: '2em'}}>
        <Grid container xs={12} direction='row' spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <Typography variant="h6" component="h6">
                Actualmente no tienes tarjetas agregadas.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    ) :
    (
      <Box component="div" m={1} style={{marginTop: '2em'}}>
        <Grid container xs={12} md={6}>
          <Grid item>
            <Card
              {...rest}
              className={clsx(classes.root, className)}
            >
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardHeader title="Completa los campos, con los datos de tu tarjeta de credito." />
                <Divider />
                <CardContent>
                  <Grid
                    container
                    spacing={4}
                  >
                    <Grid
                      item
                      md={12}
                      xs={12}
                    >
                      <Controller
                        as={
                          <InputMask mask="9999 9999 9999 9999" value={props.value} onChange={props.onChange}>
                            {() => <TextField variant="outlined" fullWidth
                              helperText="Los datos de la tarjeta, son encriptados. antes de enviar"
                              label="Numero de la tarjeta"
                              name="tdcNumber"
                              required
                            />}
                          </InputMask>
                        }
                        control={control}
                        mask="9999 9999 9999 9999"
                        name="tdcNumber"
                        id="tdcNumber"
                        type="text"
                        placeholder="0000 0000 0000 0000"
                      >
                      </Controller>
                    </Grid>
                    <Grid
                      item
                      md={12}
                      xs={12}
                    >
                    <Controller 
                        as={
                          <TextField
                            fullWidth
                            helperText="Nombre del propietario de la tarjeta"
                            label="Nombre de la tarjeta"
                            name="tdcName"
                            required
                            variant="outlined"
                          />
                        }
                        name="tdcName"
                        id="name"
                        rules={{required: true}}
                        control={control}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={4}
                  >
                    <Grid
                      item
                      md={12}
                      xs={12}
                    >
                    <Controller
                        as={
                          <InputMask mask="99/9999" value={props.value} onChange={props.onChange}>
                            {() => <TextField variant="outlined" fullWidth
                              helperText="Fecha de vencimiento de la tarjeta."
                              label="MM/YYYY"
                              required
                            />}
                          </InputMask>
                        }
                        rules={{required: true}}
                        control={control}
                        mask="99/9999"
                        id="expirydate"
                        type="text"
                        name="tdcExpiryDate"
                      />
                    </Grid>
                    <Grid
                      item
                      md={12}
                      xs={12}
                    >
                      <Controller 
                        as={
                          <TextField
                            fullWidth
                            helperText="Codigo de seguridad, ubicado en la parte posterior de la tarjeta"
                            label="Codigo de seguridad (CVC)"
                            name="tdcCVC"
                            required
                            variant="outlined"
                          />
                        }
                        label="Codigo de seguridad (CVC)"
                        name="tdcCvc"
                        maxLength='3'
                        id="name"
                        rules={{required: true, minLength: {
                          value:3,
                          message:'Tres digitos maximo',
                        }}}
                        control={control}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button
                    className={classes.saveButton}
                    type="submit"
                    variant="contained"
                  >
                    Guardar tarjeta
                  </Button>
                </CardActions>
              </form>
            </Card>
          </Grid>
        </Grid>
      </Box>
    )

  return (
    <Page
      className={classes.root}
      title="Recarga empresarial - Movilplata"
    >
      <Grid
        alignItems="flex-end"
        container
        justify="space-between"
        spacing={3}
      >
        <Grid item>
          <Header mainTitle='Movilplata' subTitle='Recarga tu cuenta principal'/>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            onClick={() => changeState()}
          >
            {buttonText}
          </Button>
        </Grid>
      </Grid>
      {bodyContent}
    </Page>
  )
}

export default RechargeWallet;
