import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
// we use browser's session storage for redux persisitence - rehydration action
import localstorage from 'redux-persist/lib/storage';    
import autoMergeLevel1  from 'redux-persist/lib/stateReconciler/autoMergeLevel1'

// import reducers
import userReducer from './reducers/user.reducer';
import personReducer from './reducers/person.reducer';
import uiReducer from './reducers/ui.reducer';
import appIdReducer from './reducers/appId.reducer';
import usersReducer from './reducers/users.reducer';
import placeReducer from './reducers/place.reducer';
import blockReducer from './reducers/block.reducer';
import notificationReducer from './reducers/notification.reducer';
import doorReducer from './reducers/door.reducer';

// import middlewares
import userMiddleware from './middlewares/user.middleware';
import personMiddleware from './middlewares/person.middleware';
import apiMiddleware from './middlewares/api.middleware';
import normalizeMiddleware from './middlewares/normalize.middleware';
import notificationMiddleware from './middlewares/notification.middleware';
import loggerMiddleware from './middlewares/logger.middleware';
import actionSplitterMiddleware from './middlewares/actionSplitter.middleware';
import usersMiddleware from './middlewares/users.middleware';
import placeMiddleware from './middlewares/place.middleware';
import blockMiddleware from './middlewares/block.middleware';
import doorMiddleware from './middlewares/door.middleware';

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
    doors: doorReducer,
    blocks: blockReducer,
    persons: personReducer,
    ui: uiReducer,
    notification: notificationReducer
});

const persistedRootReducer = persistReducer(rootPersistConfig, rootReducer);

// the feature middlewares
const featureMiddleware = [
    userMiddleware,
    placeMiddleware,
    doorMiddleware,
    blockMiddleware,
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

// persisting the store object to storage
const persistor = persistStore(store);

export default {
    store, persistor
};