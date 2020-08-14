import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
// we use browser's session storage for redux persisitence - rehydration action
import localstorage from 'redux-persist/lib/storage';    
import autoMergeLevel1  from 'redux-persist/lib/stateReconciler/autoMergeLevel1'

import userReducer from './reducers/user.reducer';
import personReducer from './reducers/person.reducer';
import userMiddleware from './middlewares/user.middleware';
import personMiddleware from './middlewares/person.middleware';
import apiMiddleware from './middlewares/api.middleware';
import normalizeMiddleware from './middlewares/normalize.middleware';
import notificationMiddleware from './middlewares/notification.middleware';
import loggerMiddleware from './middlewares/logger.middleware';
import actionSplitterMiddleware from './middlewares/actionSplitter.middleware';
import uiReducer from './reducers/ui.reducer';
import notificationReducer from './reducers/notification.reducer';
import appIdReducer from './reducers/appId.reducer';
import usersReducer from './reducers/users.reducer';
import usersMiddleware from './middlewares/users.middleware';
import placeReducer from './reducers/place.reducer';
import placeMiddleware from './middlewares/place.middleware';

// state persistance configuration
const rootPersistConfig = {
    key: 'root',
    storage: localstorage,
    whitelist: ['user', 'appId'],
    stateReconciler: autoMergeLevel1
};


// shape the state structure
const rootReducer = combineReducers({
    user: userReducer,
    users: usersReducer,
    appId: appIdReducer,
    places: placeReducer,
    persons: personReducer,
    ui: uiReducer,
    notification: notificationReducer
});

const persistedRootReducer = persistReducer(rootPersistConfig, rootReducer);

// the feature middlewares
const featureMiddleware = [
    userMiddleware,
    placeMiddleware,
    personMiddleware,
    usersMiddleware
];

//core middlewares for development
const coreMiddleware_dev = [
    actionSplitterMiddleware,
    apiMiddleware,
    normalizeMiddleware,
    notificationMiddleware,
    loggerMiddleware
];

//core middlewares for production
const coreMiddleware_prod = [
    actionSplitterMiddleware,
    apiMiddleware,
    normalizeMiddleware,
    notificationMiddleware,
    loggerMiddleware
];

let store = undefined;

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

const persistor = persistStore(store);

export default {
    store, persistor
};