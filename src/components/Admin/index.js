import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, Typography, Grid, colors } from '@material-ui/core';
import Page from '../../helpers/Page'
import Header from '../../helpers/Header'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import Label from '../../helpers/Label'

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  item: {
    padding: theme.spacing(3),
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      '&:not(:last-of-type)': {
        borderRight: `1px solid ${theme.palette.divider}`
      }
    },
    [theme.breakpoints.down('sm')]: {
      '&:not(:last-of-type)': {
        borderBottom: `1px solid ${theme.palette.divider}`
      }
    }
  },
  valueContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    marginLeft: theme.spacing(1)
  }
}));

const Index = props => {
  const { className, ...rest } = props;
  const userData = typeof(props.userData) === 'string' ? JSON.parse(props.userData) : props.userData
  const classes = useStyles();
  
  return (
    <Page
      className={classes.root}
      title="Panel Administrativo - Movilplata"
    >
      <Header mainTitle='Movilplata' subTitle='Panel administrativo.'/>
      <Card
        {...rest}
        className={clsx(classes.root, className)}
        style={{marginTop: 20}}
      >
        <Grid
          alignItems="center"
          container
          justify="space-between"
        >

        {userData.userPockets.length >= 1 ? userData.userPockets.map((item, key) => 
          <Grid
            className={classes.item}
            item
            md={2}
            sm={6}
            xs={12}
          >
            <Typography
              component="h2"
              gutterBottom
              variant="overline"
            >
              {item.pocket.description}
            </Typography>
            <div className={classes.valueContainer}>
              <Typography variant="h5">$ {item.balance}</Typography>
            </div>
          </Grid>
        ) : '' }
        </Grid>
      </Card>
    </Page>
  )
}

export default Index;