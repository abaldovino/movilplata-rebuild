import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
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
  Container,
  FormControl,
  FormHelperText,
  OutlinedInput,
  InputLabel,
  Box,
  CssBaseline,
  InputAdornment
} from '@material-ui/core';

import Page from '../../../helpers/Page'
import Header from '../../../helpers/Header'
import ClearIcon from '@material-ui/icons/Clear';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Vertx from 'vertx3-eventbus-client';
import { toast } from 'react-toastify';
import SucursalService from '../../../services/SucursalService'

const useStyles = makeStyles(theme => ({
  root: {},
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width:'50%',
  },
}));
export default function DailyReport(props) {

  const classes = useStyles();
  const { className, ...rest } = props;
  const userData = typeof(props.userData) === 'string' ? JSON.parse(props.userData) : props.userData
  const currentComerce = userData ? userData.commerce : {}

  const [ type, setType ] = useState( 2 );
  const [ startDate, setStartDate ] = useState( '2019-09-13' );
  const [ endDate, setEndDate ] = useState( '2019-09-13' );
  const [ sucursal, setSucursal ] = useState( 0 )
  const [ sucursales, setSucursales] = useState( [] );
  const [ isLoading, setLoading ] = useState( true );

  useEffect(() => {
    const sucursalService = new SucursalService();
    sucursalService.ListService(currentComerce, userData).then((response) => {
      if(response.data.code === 500) {
        localStorage.removeItem("tokens");
      } else {
        console.log('componentDidMountList', response.data)
        setSucursales(response.data)
        setLoading(false)
      }
    })
  }, [ ])

  const downloadReport = () => {
    const encodedString = new Buffer(`:`).toString('base64');
    const basicAuth = 'Basic ' + encodedString;
    setLoading(true)
    Axios.get(`http://104.198.149.31:18083/api/secure/report/transactions?type=${type}&sd=${startDate}&ed=${endDate}&commerce_id=${currentComerce.id}&branch_id=${sucursal}`,
    { withCredentials: true, contentType: 'application/json',  headers: { 'Authorization': basicAuth }, responseType: 'blob'})
    .then(function (response) {
      // handle success
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      //link.setAttribute('download', 'file.pdf');
      link.setAttribute('target', '_blank');
      document.body.appendChild(link);
      link.click();
      setLoading(false)
    })
    .catch(function (error) {
      // handle error
      console.log(error)
      setLoading(false)
    })
  }
  const buttonText =  isLoading ? <Loader type="ThreeDots" color="#25d366" height={20} width={20}/> : <i class="far fa-user"> Descargar </i>
  return (
    <Page
      className={classes.root}
      title="POS - Movilplata"
    >
      <Header mainTitle='Movilplata' subTitle='POS.'/>
      <Box component="div" m={1} style={{marginTop: '2em'}}>
        <CssBaseline />
        <Grid container spacing={3} justify='center'>
          <Grid item xs={12} md={6}>
            <Card
              {...rest}
              className={clsx(classes.root, className, classes.TopMargin)}
              style={{marginTop:'20px'}}
            >
              <CardHeader title="Completa la informacion, para descargar el reporte." />
              <Divider />
              <CardContent>
              {isLoading ? (
                  <CircularProgress/>
                ) : ( 
                  <Grid
                    container
                    spacing={4}
                    justify="center"
                  >
                    <Grid item md={12} xs={12} >
                      <OutlinedInput
                        id="standard-adornment-weight"
                        type='date'
                        onChange={e => setStartDate(e.target.value)}
                        endAdornment={<InputAdornment position="end">Fecha Inicio</InputAdornment>}
                        aria-describedby="standard-weight-helper-text"
                        inputProps={{
                          'aria-label': 'weight',
                        }}
                        style={{width: '100%'}}
                      />
                    </Grid>
                    <Grid item md={12} xs={12} >
                    <OutlinedInput
                        id="standard-adornment-weight"
                        type='date'
                        onChange={e => setEndDate(e.target.value)}
                        endAdornment={<InputAdornment position="end">Fecha Fin</InputAdornment>}
                        aria-describedby="standard-weight-helper-text"
                        inputProps={{
                          'aria-label': 'weight',
                        }}
                        style={{width: '100%'}}
                      />
                    </Grid>
                    <Grid item md={12} xs={12} >
                      <TextField fullWidth name="sucursal" select
                        // eslint-disable-next-line react/jsx-sort-props
                        SelectProps={{ native: true }}
                        variant="outlined"
                        helperText="Selecciona la sucursal que hace el pago."
                        name='pocket' onChange={e => setType(e.target.value)}
                      >
                        <option value=''>Selecciona la sucursal</option>
                        <option value='' selected>Selecciona el tipo de reporte</option>
                        <option value='1' >Pagos</option>
                        <option value='2' >Recarga</option>
                        <option value='3' >Transferencias enviadas</option>
                        <option value='4'>Transferencias recibidas</option>
                        <option value='5'>Retiros</option>
                      </TextField>
                    </Grid>
                    <Grid item md={12} xs={12} >
                      <TextField fullWidth name="pocket" select
                        // eslint-disable-next-line react/jsx-sort-props
                        SelectProps={{ native: true }}
                        variant="outlined"
                        helperText="Selecciona la sucursal que hace el pago."
                        onChange={e => setSucursal(e.target.value)} 
                      >
                        <option value=''>Selecciona la sucursal</option>
                        {sucursales.map((item, key) => 
                          <option key={key} value={item.id}>{item.name}</option>
                        )}
                      </TextField>
                    </Grid>
                  </Grid>
                )}
              </CardContent>
              <Divider />
              <CardActions>
                <Button className={classes.saveButton} type="button" variant="contained" onClick={() => downloadReport()} > { buttonText } </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
  </Page>
  )
}
