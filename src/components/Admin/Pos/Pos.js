import React, { useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Container';

import IteractionPanel from './InteractionPanel'
import ModalPanel from './ModalPanel'
import Page from '../../../helpers/Page'
import Header from '../../../helpers/Header'
import { useAuth } from '../../../contexts/Auth'

import SucursalService from '../../../services/SucursalService'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Pos(props) {

  const [ userData, setUserData ] = useState();
  const [ showModalPanel, setShowPanel ] = useState();
  const [ contentPanel, setContentPanel ] = useState();
  const { authTokens } = useAuth();

  const [Sucursales, setSucursales] = useState([]);
  const userDataFull = typeof(props.userData) === 'string' ? JSON.parse(props.userData) : props.userData
  const currentComerce = userDataFull ? userDataFull.commerce : {}
  
  const toModalpanel = (content) => {
    setShowPanel(!showModalPanel)
    setContentPanel(content)
  }

  useEffect(() => {
    setUserData(authTokens)
    const sucursalService = new SucursalService()
    sucursalService.ListService(currentComerce, userDataFull).then((response) => {
      if(response.data.code === 500) {
        localStorage.removeItem("tokens");
      } else {
        setSucursales(response.data)
      }
    })
  }, []);

  const classes = useStyles();
  return (
    <Page
      className={classes.root}
      title="POS - Movilplata"
    >
      <Header mainTitle='Movilplata' subTitle='POS.'/>
      <Box component="div" m={1} style={{marginTop: '2em'}}>
        <CssBaseline />
        <Container maxWidth="lg">
          { showModalPanel ? <ModalPanel 
            handleClick={ toModalpanel } 
            content={ contentPanel } 
            userData={ userData } 
            sucursales={ Sucursales } /> : <IteractionPanel handleClick={ toModalpanel } userData={props.userData} />}
        </Container>
      </Box>
    </Page>
  )
}
