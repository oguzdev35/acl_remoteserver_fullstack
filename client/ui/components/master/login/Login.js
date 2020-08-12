import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import {
  TextField, Button,
  AppBar, Tabs, Tab, Box
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import { loginUserByUsername } from '../../../../store/actions/user.action';
import { setAppId } from '../../../../store/actions/appId.action';

const useStyles = makeStyles( theme => ({
  root: {
    flexGrow: 1,
    minWidth: '60vw',
    backgroundColor: theme.palette.background.paper
  },
  formElement: {
    margin: theme.spacing(1)
  }
}));

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}


export default () => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      appId: ''
    },
    onSubmit: values => {
      dispatch(loginUserByUsername({
        'username': values.username,
        'password': values.password
      }));
      dispatch(setAppId({appId: values.appId}));
      formik.setValues({
        'username': '',
        'password': '',
        'appId': ''
      })
    }
  });

  return (
    <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
      <TextField 
        label="Sisteme kayıtlı Kullanıcı adnızı giriniz."
        id="username"
        fullWidth
        variant="outlined"
        className={classes.formElement}
        onChange={formik.handleChange}
        value={formik.values.username}
      />
      <TextField 
        label="Sisteme kayıtlı şifrenizi giriniz."
        id="password"
        fullWidth
        variant="outlined"
        type="password"
        className={classes.formElement}
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <TextField 
        label="Size özel application ID'yi giriniz."
        id="appId"
        fullWidth
        variant="outlined"
        className={classes.formElement}
        onChange={formik.handleChange}
        value={formik.values.appId}
      />
      <Button 
        type="submit"
        variant="contained" color="primary"
        fullWidth
        className={classes.formElement}
      >
        Giriş yapınız
      </Button>
    </form>
  )
}

