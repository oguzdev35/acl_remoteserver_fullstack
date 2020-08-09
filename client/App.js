import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { Provider as StateProvider } from 'react-redux';

import theme from './theme';
import store from './store';

import MainRouter from './MainRouter';

export default () => {
  return (
    <StateProvider store={store}>
      <ThemeProvider theme={theme}>
        <MainRouter />
      </ThemeProvider>
    </StateProvider>
  )
}
