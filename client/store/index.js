import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
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



// shape the state structure
const rootReducer = combineReducers({
    user: userReducer,
    persons: personReducer,
    ui: uiReducer,
    notification: notificationReducer
});

// the feature middlewares
const featureMiddleware = [
    userMiddleware,
    personMiddleware
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
        rootReducer, 
        composeWithDevTools(applyMiddleware(...featureMiddleware, ...coreMiddleware_dev))
    )
} else {
    store = createStore(
        rootReducer,
        compose(applyMiddleware(...featureMiddleware, ...coreMiddleware_prod))
    );
}

export default store;