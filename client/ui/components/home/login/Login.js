import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import {
  TextField, Button,
  AppBar, Tabs, Tab, Box
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import { 
  loginUserByUsername, loginUserByEmail
} from '../../../../store/actions/user.action';

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


const LoginWithUsername = () => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: values => {
      dispatch(loginUserByUsername({
        'username': values.username,
        'password': values.password
      }));
      formik.setValues({
        'username': '',
        'password': ''
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

const LoginWithEmail = () => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: values => {
      dispatch(loginUserByEmail({
        'email': values.email,
        'password': values.password
      }));
      formik.setValues({
        'email': '',
        'password': ''
      })
    }
  });

  return (
    <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
      <TextField 
        label="Sisteme kayıtlı emailinizi giriniz."
        id="email"
        fullWidth
        variant="outlined"
        className={classes.formElement}
        onChange={formik.handleChange}
        value={formik.values.email}
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


export default () => {

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Email ile giriş yapınız." />
          <Tab label="Kullanıcı adı ile giriş yapınız." />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <LoginWithEmail />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
           <LoginWithUsername />
        </TabPanel>
      </SwipeableViews>
    </div>
  )
}