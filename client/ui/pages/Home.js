import React from 'react';
import { useSelector } from 'react-redux';

import Login from '../components/home/login';
import Dashboard from '../components/home/dashboard';


export default () => {

  const isLoggedin = useSelector( state =>state.user.secretToken);
  const isMaster = useSelector( state => state.user.isMaster);

  if(isLoggedin && !isMaster){
    return <Dashboard />
  } else {
    return <Login />
  }
}