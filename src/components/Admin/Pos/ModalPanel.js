import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CobroForm from './components/CobroForm'
import RecargaForm from './components/RecargaForm'
import RetiroForm from './components/RetiroForm'
import MasiveRecharge from './components/MasiveRecharge'

import Page from '../../../helpers/Page'
import Header from '../../../helpers/Header'

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

const ModalPanel = (props) => {
  const classes = useStyles();
  const [Sucursales, setSucursales] = useState(props.sucursales);
  const userData = typeof(props.userData) === 'string' ? JSON.parse(props.userData) : props.userData
  return (
      <React.Fragment>
        {props.content === 'cobro' ? <CobroForm userData={userData} sucursales={props.sucursales} handleClick={() => props.handleClick()}/>
          : props.content === 'retiro' ? <RetiroForm sucursales={props.sucursales} userData={userData} handleClick={() => props.handleClick()}/>
          : props.content === 'recarga' ? <RecargaForm userData={userData} handleClick={() => props.handleClick()}/> 
          : <MasiveRecharge userData={userData} handleClick={() => props.handleClick()}/>
        }
      </React.Fragment>
  )
}

export default ModalPanel;