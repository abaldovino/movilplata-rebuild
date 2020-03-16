import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Page from '../../../helpers/Page'
import Header from '../../../helpers/Header'
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
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
  colors
} from '@material-ui/core';

import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import GooglePlacesAutocomplete, { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';
import SucursalService from '../../../services/SucursalService'
import GeneralService from '../../../services/GeneralService'

import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';

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
}));

const autocompleteService = { current: null };

const CreateSucursal = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const userData = props.userData ? props.userData : {}
  const { register, handleSubmit, errors, reset } = useForm()
  const [isLoading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [currentLatLang, setLangLat] = useState({});
  const [direction, setDirection] = useState('');  
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Google Maps Hooks
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);


  const fetch = React.useMemo(
    () =>
      throttle((input, callback) => {
        autocompleteService.current.getPlacePredictions(input, callback);
      }, 200),
    [],
  );

  // De forma similar a componentDidMount y componentDidUpdate
  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    let generalService = new GeneralService()
    generalService.getCities(userData).then((response) => {
      setCities(response.data)
    })
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions([]);
      return undefined;
    }

    fetch({ input: inputValue }, results => {
      if (active) {
        setOptions(results || []);
      }
    });

    return () => {
      active = false;
    };
  }, [inputValue, fetch]);

  const handleChange = event => {
    setInputValue(event.target.value);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const onSubmit = data => { 
    const formData = {
      "position": {
        "lon": currentLatLang.longitude,
        "lat": currentLatLang.latitude,
        "SRID": 4326
      },
      "city": {
        "id": data.city,
        "countryId": 472
      },  
      "name": data.name,
      "address": direction,
      "email": data.email
     }
    let sucursalService = new SucursalService();
    let UserData = JSON.parse(userData)
    sucursalService.CreateSucursalService(formData, UserData.commerce.id, UserData).then((response) => {
      if(response.description === "Success"){
          setLoading(!isLoading)
          toast.success("Sucursal Creada !");
          reset()
          props.history.push('/admin/sucursal_list')
        } else {
          reset()
          toast.error(response.description);  
        }  
     })
  }

  const getLocalization = place => {
    geocodeByPlaceId(place.place_id)
      .then(results => {
        setDirection(results[0].formatted_address)
        getLatLng(results[0])
          .then(({ lat, lng }) => {
            setLangLat({ latitude: lat, longitude: lng })
          })
      })
      .catch(error => console.error(error));
  }

  return (
    <Page
      className={classes.root}
      title="Creacion de sucursales - Movilplata"
    >
      <Header mainTitle='Movilplata' subTitle='Creacion de sucursales.'/>
      <Card
        {...rest}
        className={clsx(classes.root, className, classes.TopMargin)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader title="Completa la informacion, para crear la sucursal." />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={4}
            >
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  helperText="Por favor indica el nombre de la sucursal"
                  label="Nombre de la sucursal"
                  name="name"
                  onChange={handleChange}
                  required
                  variant="outlined"
                  inputRef={register({ required: true, maxlength: 20 })}/>
                                  {errors.name && <p className="invalid-feedback d-block">Nombre invalido</p>}
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Direccion email"
                  helperText="En caso de ser parte de eticos, debe estar registrada en la BD correspondiente"
                  name="email"
                  onChange={handleChange}
                  required
                  variant="outlined"
                  inputRef={register({ required: true, maxlength: 20 })}/>
                                  {errors.email && <p className="invalid-feedback d-block">Email invalido.</p>}
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <Autocomplete
                  id="google-map-demo"
                  getOptionLabel={option => (typeof option === 'string' ? option : option.description)}
                  filterOptions={x => x}
                  options={options}
                  autoComplete
                  includeInputInList
                  freeSolo
                  disableOpenOnFocus
                  onChange={(event, value) => getLocalization(value)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Add a location"
                      variant="outlined"
                      fullWidth
                      name='place'
                      onChange={handleChange}
                      inputRef={register({ required: true, maxlength: 20 })}
                    />
                  )}
                  renderOption={option => {
                    const matches = option.structured_formatting.main_text_matched_substrings;
                    const parts = parse(
                      option.structured_formatting.main_text,
                      matches.map(match => [match.offset, match.offset + match.length]),
                    );

                    return (
                      <Grid container alignItems="center">
                        <Grid item>
                          <LocationOnIcon className={classes.icon} />
                        </Grid>
                        <Grid item xs>
                          {parts.map((part, index) => (
                            <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                              {part.text}
                            </span>
                          ))}

                          <Typography variant="body2" color="textSecondary">
                            {option.structured_formatting.secondary_text}
                          </Typography>
                        </Grid>
                      </Grid>
                    );
                  }}
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Selecciona la ciudad"
                  name="city"
                  onChange={handleChange}
                  select
                  // eslint-disable-next-line react/jsx-sort-props
                  SelectProps={{ native: true }}
                  variant="outlined"
                  inputRef={register({ required: true })}>
                <option value='' key='0'></option>    
                {cities.map((item, key) => 
                  <option value={item.id} key={key}>{item.name}</option>
                )}
                </TextField>
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
              Save Changes
            </Button>
          </CardActions>
        </form>
      </Card>
    </Page>
  );
};

CreateSucursal.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object.isRequired
}

export default CreateSucursal
