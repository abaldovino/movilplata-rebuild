import React, { useState, useEffect, useRef } from 'react';
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
  InputLabel,
  colors,
  FormControl,
  Box,
  Select,
  MenuItem
} from '@material-ui/core';
import clsx from 'clsx';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress'
import GeneralService from '../../../../services/GeneralService';
import PseService from '../../../../services/PseService';

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

const PsePayment = (props) => {
  const userData = localStorage.getItem("tokens") != null ? JSON.parse(localStorage.getItem("tokens")) : null; 

  const { className, ...rest } = props;
  const { register, handleSubmit, watch, errors, control } = useForm();
  const [banks, setBanks] = useState([])
  const [bankSelected, setBankSelected] = useState('')
  const [dniType, setDniType] = useState('')
  const [isLoading, setLoading] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    let generalService = new GeneralService();
    generalService.getbanks(props.userData).then((response) => {
      console.log(response.data.banks);
      setBanks(response.data.banks);
    })
  }, [])
  const onSubmit = async data => {
    setLoading(true);
    let pseService = new PseService();
    pseService.PayPSERequest(userData, data).then((response) => {
      console.log(response);
    })
    window.open('https://www.google.com', '_blank');
  }
  const handleChange = event => {
    console.log(event.target.name);
    setBankSelected(event.target.value);
  };
  const handleChangeDni = event => {
    console.log(event.target.value);
    setDniType(event.target.value);
  };
  return (
    <React.Fragment>
      <Grid
        alignItems="flex-end"
        container
        justify="space-between"
        spacing={3}
      >
      </Grid>
      <Box component="div" m={1} style={{marginTop: '2em'}}>
      <Grid container xs={12} md={6}>
          <Grid item>
            <Card
              {...rest}
              className={clsx(classes.root, className)}
            >
              {isLoading ? (
                <CircularProgress/>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                <CardHeader title="Completa los campos, para continuar con a operación." />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={4}
                    >
                      <Grid item md={12} xs={12}>
                        <Controller
                          as={
                            <TextField
                              fullWidth
                              helperText="Nombre del titular"
                              label="Nombre Completo"
                              name="name"
                              required
                              variant="outlined"
                            />
                          }
                          name="name"
                          id="name"
                          rules={{required: true}}
                          control={control}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <Controller
                            as={
                              <TextField
                                fullWidth
                                label={dniType !== '' ? 'Selecciona tu tipo de identificacion' : dniType}
                                name="dnitype"
                                onChange={handleChangeDni}
                                select
                                // eslint-disable-next-line react/jsx-sort-props
                                SelectProps={{ native: true }}
                                value={dniType}
                                variant="outlined"
                              >
                                {DocumentList.map(state => (
                                  <option
                                    key={state}
                                    value={state.id}
                                  >
                                    {state.name}
                                  </option>
                                ))}
                              </TextField>
                            }
                            name="dnitype"
                            id="dnitype"
                            rules={{required: true}}
                            control={control}
                          />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <Controller
                          as={
                            <TextField
                              fullWidth
                              helperText="Numero de identificacion"
                              label="Numero de identificacion"
                              name="dni"
                              required
                              variant="outlined"
                            />
                          }
                          name="dni"
                          id="dni"
                          rules={{required: true}}
                          control={control}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <Controller
                          as={
                            <TextField
                              fullWidth
                              label={bankSelected !== '' ? 'Selecciona tu banco' : bankSelected}
                              name="bank"
                              onChange={handleChange}
                              select
                              // eslint-disable-next-line react/jsx-sort-props
                              SelectProps={{ native: true }}
                              value={bankSelected}
                              variant="outlined"
                            >
                              {banks.map(state => (
                                <option
                                  key={state}
                                  value={state.code}
                                >
                                  {state.name}
                                </option>
                              ))}
                            </TextField>
                          }
                          name="bank"
                          id="bank"
                          rules={{required: true}}
                          control={control}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <Controller
                          as={
                            <TextField
                              fullWidth
                              helperText="Monto a recargar"
                              label="Ingresa el monto a recargar"
                              name="ammount"
                              required
                              variant="outlined"
                            />
                          }
                          name="ammount"
                          id="dni"
                          rules={{required: true}}
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
                      Iniciar Transaccion.
                    </Button>
                  </CardActions>
                </form>
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  )
}

export default PsePayment

