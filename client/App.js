import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { Provider as StateProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import theme from './theme';
import storeFile from './store';

import MainRouter from './MainRouter';

export default () => {
  return (
    <StateProvider store={storeFile.store}>
      <ThemeProvider theme={theme}>
        <PersistGate loading={null} persistor={storeFile.persistor}>
          <MainRouter />
        </PersistGate>
      </ThemeProvider>
    </StateProvider>
  )
}
