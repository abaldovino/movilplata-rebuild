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
  Link
} from '@material-ui/core';

import ClearIcon from '@material-ui/icons/Clear';
import axios from 'axios';
import cobroImg from '../../../../assets/image/admin/cobro.png'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import GeneralService from '../../../../services/GeneralService'
import PosService from '../../../../services/PosService'
import SucursalService from '../../../../services/SucursalService'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import Vertx from 'vertx3-eventbus-client';

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

const MasiveRecharge = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [ isLoading, setLoading ] = useState( false );
  const { register, handleSubmit, errors, getValues } = useForm()
  const [ fileName, setFileName ] = useState('Escoger archivo…');
  const [ fileState, setFile ] = useState();
  const [ userSet, userSetted ] = useState( false )
  const [ searchingUser, setSearchUser ] = useState( false );
  const [ branchToken, setBranchToken ] = useState();
  const [ userData, setUserData ] = useState(props.userData);

  const onSubmit = async => {
    const formData = new FormData() 
    setLoading(true)
    formData.append('file', fileState)
    const encodedString = new Buffer(`${userData.username}:${userData.password}`).toString('base64');
    const basicAuth = 'Basic ' + encodedString;
    axios.post(`https://staging-movilplata.homeip.net/api/secure/payment/transaction/user/${userData.id}/transfer/multi/upload`, formData, { withCredentials: true, contentType: 'application/json',  
    headers: { 'Authorization': basicAuth }})
      .then(res => { // then print response status
        receiveNotificationSuccess(userData.username)
        console.log(res.statusText)
        console.log(res)
        if(res.statusText === 'OK'){
          toast.success("Carga Completada. !", toastSuccess); 
          setLoading(false)
        }
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.description, toastError); 
      });
  }

  const onChangeHandler = event => {
    setFileName(event.target.files[0].name)
    setFile(event.target.files[0])
    console.log(event.target.files[0])
  } 

  const receiveNotificationSuccess = (username) => {
    const eb = new Vertx("https://movilplata.com/api/notification/eventbus");
    eb.handlers = `wallet-service-address-${username}`
    eb.onopen = () => {
      const token = eb.handlers;
      eb.handlers = {}
      eb.registerHandler(token, function(error, message) {
        console.log('handler', message);
        console.log('handler', message.headers);
        switch (message.headers.action) {
          case 'confirmation_payment':
            toast.success("Pagos Realizados. !", toastSuccess);
            setLoading(false)
            eb.close()
            break
          default:
            toast.error("Error contacta al proveedor. !", toastError); 
            setLoading(false)
            eb.close()
        }
      })
    }

    eb.onerror = function(error){
      console.log(error)
    }

  }

  const preventDefault = event => event.preventDefault();
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form onSubmit={handleSubmit(onSubmit)} name='loginForm'>
        <CardHeader title="Movil Recarga Masiva" action={
          <IconButton aria-label="settings" onClick={() => props.handleClick()}>
            <ClearIcon />
          </IconButton>
          }/>
        <Divider />
        <CardContent>
        {isLoading ? (
            <CircularProgress/>
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
                    <React.Fragment>
                      <TextField
                        type="file" 
                        name="file-1[]" 
                        id="file-1" 
                        data-multiple-caption="{count} files selected" 
                        ref={register({ required: true })}
                        multiple 
                        variant="outlined"
                        onChange={onChangeHandler}
                      />
                    </React.Fragment>
                  </Grid>
                </Grid>
            </Grid>
          </Grid>
          )}
        </CardContent>
        <Divider />
        <CardActions>
          <Button className={classes.saveButton} type="submit" variant="contained" > Subir archivo </Button>
        </CardActions>
      </form>
    </Card>
  );
};

MasiveRecharge.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object.isRequired
};

export default MasiveRecharge;
