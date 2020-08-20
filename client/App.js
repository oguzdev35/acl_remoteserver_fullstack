import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { Provider as StateProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import theme from './theme';
import storeFile from './store';

import MainRouter from './MainRouter';
import LoadStatus from './ui/components/info/LoadStatus';
import Notification from './ui/components/info/Notification';

import { SnackbarProvider } from 'notistack';

export default () => {  
  return (
    <StateProvider store={storeFile.store}>
      <ThemeProvider theme={theme}>
        <PersistGate loading={null} persistor={storeFile.persistor}>
          <SnackbarProvider maxSnack={3}>
            <MainRouter />
              {process.env.NODE_ENV === 'production' && <LoadStatus />}
              <Notification />
            </SnackbarProvider>
        </PersistGate>
      </ThemeProvider>
    </StateProvider>
  )
}
