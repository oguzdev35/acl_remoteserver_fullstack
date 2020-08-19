import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { Provider as StateProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import theme from './theme';
import storeFile from './store';

import MainRouter from './MainRouter';
import LoadStatus from './ui/components/info/LoadStatus';
if(process.env.NODE_ENV === 'development'){
  store = createStore(
      persistedRootReducer, 
      composeWithDevTools(applyMiddleware(...featureMiddleware, ...coreMiddleware_dev))
  );
} else {
  store = createStore(
      persistedRootReducer,
      compose(applyMiddleware(...featureMiddleware, ...coreMiddleware_prod))
  );

}
export default () => {  
  return (
    <StateProvider store={storeFile.store}>
      <ThemeProvider theme={theme}>
        <PersistGate loading={null} persistor={storeFile.persistor}>
          <MainRouter />
          {process.env.NODE_ENV === 'production' && <LoadStatus />}
        </PersistGate>
      </ThemeProvider>
    </StateProvider>
  )
}
