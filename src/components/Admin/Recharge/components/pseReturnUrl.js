import React, { useState, useEffect, useRef } from 'react';
import Page from '../../../../helpers/Page';
import Header from '../../../../helpers/Header';
import {
  Button,
  Grid,
  ListItemText,
  Avatar,
  colors,
  ListItemAvatar,
  Box,
  List,
  ListItem,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from '@material-ui/core';
import clsx from 'clsx';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress'
import PseService from '../../../../services/PseService';
import {
  useParams
} from "react-router-dom";

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

const DocumentList = [{name: 'Selecciona tu tipo de identificacion', id: ''}, { name: 'Cedula de identidad', id: 'CC' }, { name: 'NIT', id: 'NIT' }];

const PseReturnUrl = (props) => {
  const userData = localStorage.getItem("tokens") != null ? JSON.parse(localStorage.getItem("tokens")) : null; 
  const { className, ...rest } = props;
  const { register, handleSubmit, watch, errors, control } = useForm();
  const [banks, setBanks] = useState([])
  const [bankSelected, setBankSelected] = useState('')
  const [dniType, setDniType] = useState('')
  const [isLoading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState({})
  const classes = useStyles();
  useEffect(() => {
    let pseService = new PseService();
    pseService.CheckPSEPayRequest(localStorage.getItem('TransactionID')).then((response) => {
      setTransaction({
        fee: response.data.fee,
        detail: response.data.detail,
        pocket: response.data.pocket.pocketType.name,
        reference_id: response.data.referenceId,
        status: response.data.transactionStatus.description,
      })
      setLoading(false);
    })
  }, [])

  return (
    <Page
      className={classes.root}
      title={'Recarga Empresarial - Movilplata' + ' ' + transaction.status}
    >
      <Grid
        alignItems="flex-end"
        container
        justify="space-between"
        spacing={3}
      >
        <Grid item>
          <Header mainTitle='Movilplata' subTitle='Resultado de tu recarga'/>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            onClick={() => { console.log('click') }}
          >
            Al Inicio
          </Button>
        </Grid>
      </Grid>
      <Box component="div" m={1} style={{marginTop: '2em'}}>
        <Grid container xs={12} md={6}>
          <Grid item>
            <Card
              {...rest}
              className={clsx(classes.root, className)}
            >
              <CardHeader title={`${isLoading ? ('Cargando') : transaction.detail}`} />
              <CardContent>
                {isLoading ? (
                  <CircularProgress/>
                ) : (
                  <Grid container spacing={4}
                >
                  <h3>{`Tu transaccion por un monto de ${transaction.fee} a tu bolsillo Movilpesos, con numero de identificacion #${transaction.reference_id} fue ${transaction.status}`}</h3>
                </Grid>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Page>
  )
}

export default PseReturnUrl

