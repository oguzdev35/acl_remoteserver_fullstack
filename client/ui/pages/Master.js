import React from 'react';
import { useSelector } from 'react-redux';

import Login from '../components/master/login';
import Dashboard from '../components/master/dashboard';



export default () => {

  const isLoggedin = useSelector( state =>state.user.secretToken);
  const isMaster = useSelector( state => state.user.isMaster);

  if(isLoggedin && isMaster){
    return <Dashboard />
  } else {
    return <Login />
  }
}
