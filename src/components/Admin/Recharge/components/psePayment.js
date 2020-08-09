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
import GeneralService from '../../../../services/GeneralService';

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
const PsePayment = (props) => {
  const { className, ...rest } = props;
  const { register, handleSubmit, watch, errors, control } = useForm();
  const [banks, setBanks] = useState([])
  const [bankSelected, setBankSelected] = useState('')
  const classes = useStyles();
  useEffect(() => {
    let generalService = new GeneralService();
    generalService.getbanks(props.userData).then((response) => {
      console.log(response.data.banks);
      setBanks(response.data.banks);
    })
  }, [])
  const onSubmit = async data => {
    console.log(data);
  }
  const handleChange = event => {
    console.log(event.target.name);
    setBankSelected(event.target.value);
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
                      <Grid item md={12} xs={12}>
                      <TextField
                        fullWidth
                        label={bankSelected !== '' ? 'Selecciona tu banco' : bankSelected}
                        name="state"
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
                      </Grid>
                    </Grid>
                  </CardContent>
                </form>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  )
}

export default PsePayment

