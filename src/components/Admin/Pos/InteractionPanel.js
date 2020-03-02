import React, { useContext, useState, useEffect, Fragment } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Container';

import CardPos from './helpers/CardPos'

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


export default function InteractionPanel(props) {
  const userData = props.userData ? JSON.parse(props.userData) : null
  const role = userData.userRoles.some(el => el.name === "Commerce Admin") ? 'admin' : 'user'
  const classes = useStyles();
  let masiveButton;
  let column = 4;

  if(role === 'admin'){
    column = 3
    masiveButton = <CardPos title='MOVIL Recarga masiva' subtitle="Recarga varios usuarios con solo un click" movilAction={() => props.handleClick('masive')}/>
  }

  return (
    <Box component="div" m={1}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={column}>
            <CardPos title='MOVIL Cobro' subtitle="Valor mínimo a pagar $ 1,000 COP y máximo 2'000,000 COP" movilAction={() => props.handleClick('cobro')}/>
          </Grid>
          <Grid item xs={column}>
            <CardPos title='MOVIL Retiro' subtitle="Valor mínimo a pagar $ 1,000 COP y máximo 2'000,000 COP" movilAction={() => props.handleClick('retiro')}/>
          </Grid>
          <Grid item xs={column}>
            <CardPos title='MOVIL Recarga' subtitle="Valor mínimo a pagar $ 1,000 COP y máximo 2'000,000 COP" movilAction={() => props.handleClick('recarga')}/>
          </Grid>
          { role === 'admin' ? (
            <Grid item xs={3}>
              { masiveButton }
            </Grid>
          ) : ( null ) }
        </Grid>
      </Container>
    </Box>
  )
}
