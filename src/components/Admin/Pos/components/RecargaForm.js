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
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Vertx from 'vertx3-eventbus-client';
import cobroImg from '../../../../assets/image/admin/cobro.png'

import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import GeneralService from '../../../../services/GeneralService'
import PosService from '../../../../services/PosService'

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

const RecargaForm = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [ isLoading, setLoading ] = useState( false );
  const [ userPockets, setUserPockets ] = useState( [] );
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
        } else {
          toast.success("Bolsillos actualizados. !", toastSuccess);
          setUserPockets(response.data.userPockets.filter((item) => item.pocket.description === "Movilpesos"))
          setUserId(response.data.id)
          userSetted( true )
        }
      })
    }else{
      toast.error("Ingresa el usuario a buscar !", toastError); 
      setSearchUser(false)
    }
  }

  const onSubmit = data => {
    setLoading(true)
    const posService = new PosService();
    posService.RecargaService(data, props.userData.commerce.id, props.userData).then((response) => {
      if(response.description === 'success'){
        setLoading(false)
        toast.success("Recarga Realizada. !", toastSuccess); 
      }else{
        setLoading(false)
        toast.error("Recarga fallida!", toastError); 
        console.log(response)
      }
    })
  }

  const buttonText =  searchingUser ? <Loader type="ThreeDots" color="#25d366" height={20} width={20}/> : <i class="far fa-user"> Buscar Usuario </i>
  const preventDefault = event => event.preventDefault();
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form onSubmit={handleSubmit}>
        <CardHeader title="Movil recarga" action={
        <IconButton aria-label="settings">
          <Link href="/admin/home" onClick={preventDefault}>
            <ClearIcon />
          </Link>
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
            <form onSubmit={handleSubmit(onSubmit)} name='loginForm'>
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
                        <TextField fullWidth label="Ingresa el valor a recargar" name="amount" required
                          variant="outlined"  inputRef={register({ required: true, maxlength: 20 })}
                          helperText="Ingresa el valor a recargar"
                        />
                      </Grid>
                      <Grid item md={12} xs={12} >
                        <TextField fullWidth name="pocket" select
                          // eslint-disable-next-line react/jsx-sort-props
                          SelectProps={{ native: true }}
                          variant="outlined" inputRef={register({ required: true, maxlength: 20 })}
                          helperText="Selecciona el bolsillo a recargar"
                        >
                          <option value=''>Selecciona el bolsillo</option>
                          {userPockets.map((item, key) => 
                            <option key={key} value={item.pocket.id}>{item.pocket.description}</option>
                          )}
                        </TextField>
                      </Grid>
                    </React.Fragment>
                  ) : ( null )}
                </Grid>
              </form>
            </Grid>
          </Grid>
          )}
        </CardContent>
        <Divider />
        <CardActions>
        {userSet ? (
          <Button className={classes.saveButton} type="submit" variant="contained" > Recargar </Button>
        ) : (
          <Button className={classes.saveButton} type="button" variant="contained" onClick={() => handleBlur()} > { buttonText } </Button>
        ) }
        </CardActions>
      </form>
    </Card>
  );
};

RecargaForm.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object.isRequired
};

export default RecargaForm;
