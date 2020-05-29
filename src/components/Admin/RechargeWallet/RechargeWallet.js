import React, { useState, useEffect } from 'react';
import Page from '../../../helpers/Page';
import Header from '../../../helpers/Header';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Loader from 'react-loader-spinner';
import clsx from 'clsx';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/styles';
import CryptoJS from 'crypto-js';
import {generateToken} from '../../../helpers/functions';
import moment from 'moment';
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
  const { register, handleSubmit, watch, errors } = useForm();
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
        <Grid container xs={6}>
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
                      <TextField
                        fullWidth
                        helperText="Los campos son almacenados y manejados con total seguridad."
                        label="Numero de la tarjeta"
                        name="tdcNumber"
                        required
                        variant="outlined"
                        ref={register}
                      />
                    </Grid>
                    <Grid
                      item
                      md={12}
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        helperText="Please specify the first name"
                        label="Nombre de la tarjeta"
                        name="tdcName"
                        required
                        variant="outlined"
                        ref={register}
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
                    <TextField
                      fullWidth
                      helperText="MM/YYYY Debes cumplir este formato"
                      label="Fecha de vencimiento"
                      name="tdcExpiryDate"
                      ref={register}
                      required
                      variant="outlined"
                    />
                    </Grid>
                    <Grid
                      item
                      md={12}
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        helperText="Codigo de seguridad, ubicado en la parte posterior de la tarjeta"
                        label="Codigo de seguridad (CVC)"
                        name="tdcCVC"
                        ref={register}
                        required
                        variant="outlined"
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
