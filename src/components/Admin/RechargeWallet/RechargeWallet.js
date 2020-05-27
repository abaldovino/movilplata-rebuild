import React, { useState, useEffect } from 'react';
import Page from '../../../helpers/Page';
import Header from '../../../helpers/Header';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/styles';
import CryptoJS from 'crypto-js';
import {generateToken} from '../../../helpers/functions';
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
}));

const RechargeWallet = props => {
  const [paymentezToken, setpaymentezToken] = useState()
  useEffect(() => {
    const authToken = generateToken();
    setpaymentezToken(authToken)
  }, [])
  const classes = useStyles();
  return (
    <Page
      className={classes.root}
      title="Recarga empresarial - Movilplata"
    >
      <Header mainTitle='Movilplata' subTitle='Recarga tu cuenta principal'/>
      <Box component="div" m={1} style={{marginTop: '2em'}}>
        <Grid container xs={12} direction='row' spacing={3}>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <Typography variant="h6" component="h6">
                Actualmente no tienes tarjetas agregadas.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper} style={{textAlign: 'center'}}>
              <Typography variant="h6" component="h6">
                Agregar una tarjeta
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Page>
  )
}

export default RechargeWallet;
