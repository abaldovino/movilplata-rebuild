import React, { useState, useEffect } from 'react';
import Page from '../../../helpers/Page';
import Header from '../../../helpers/Header';
import clsx from 'clsx';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  CardHeader,
  Grid,
  ListItemText,
  Avatar,
  colors,
  ListItemAvatar,
  Box,
  List,
  ListItem
} from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/Inbox';
import RechargeWallet from '../RechargeWallet/index';
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
  },
  pageCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  containerList: {
    backgroundColor: theme.palette.background.paper,
    width: '100%'
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
function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}
const Recharge = props => {
  const { className, ...rest } = props;
  const [dense, setDense] = useState(false);
  const [panel, setPanel] = useState('main');
  const classes = useStyles();


  const bodyContent = panel === 'main' ? (
    <Box component="div" m={1} style={{marginTop: '2em'}}>
      <Grid container xs={12} md={6} className={classes.pageCenter}>
        <Grid item className={classes.containerList}>
          <List dense={dense}>
            <ListItem button onClick={() => {setPanel('pse')}}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="https://www.banrep.gov.co/sites/default/files/images/pse-forma.png" />
            </ListItemAvatar>
              <ListItemText primary="Pago con PSE" />
            </ListItem>
            <ListItem button onClick={() => {setPanel('tdc')}}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="https://1000logos.net/wp-content/uploads/2017/06/VISA-logo-500x203.png" />
              </ListItemAvatar>
              <ListItemText primary="Pago con tarjeta de credito" />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Box>
  ) : panel === 'tdc' ? (
    <RechargeWallet />
  ) : (
    <p>Prueba Mundo</p>
  );

  return (
    <Page
      className={classes.root}
      title="Recarga empresarial - Movilplata"
    >
      <Grid
        alignItems="flex-end"
        container
        justify="space-between"
        spacing={3}
      >
        <Grid item>
          <Header mainTitle='Movilplata' subTitle='Recarga tu cuenta principal'/>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            onClick={() => { setPanel('main') }}
          >
            Al Inicio
          </Button>
        </Grid>
      </Grid>
      {bodyContent}
    </Page>
  )
}

export default Recharge;
