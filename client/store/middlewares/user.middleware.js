import { USER, LOGIN_USER_BY_EMAIL, setUser, LOGIN_USER_BY_USERNAME } from '../actions/user.action';
import { API_ERROR, API_SUCCESS, apiRequest } from '../actions/api.action';
import { setLoader } from '../actions/ui.action';
import { setNotification } from '../actions/notification.action';

const LOGIN_API_URI = '/auth/signin';

export default store => next => action => {
    console.log(store.getState())
    next(action);
    switch(action.type){
        case LOGIN_USER_BY_EMAIL:
            next(apiRequest({body: action.payload, method: 'POST', url: LOGIN_API_URI, feature: USER}));
            next(setLoader({state: true, feature: USER}));
            break;
        case LOGIN_USER_BY_USERNAME:
            next(apiRequest({body: action.payload, method: 'POST', url: LOGIN_API_URI, feature: USER}));
            next(setLoader({state: true, feature: USER}));
            break;
        case `${USER} ${API_SUCCESS}`:
            next(setUser({user: action.payload.user, normalizeKey: null}));
            next(setLoader({state: false, feature: USER}));
            break;
        case `${USER} ${API_ERROR}`:
            next(setNotification({message: action.payload, feature: USER}))
            next(setLoader({state: false, feature: USER}))
            break;
        default:
            break;
    }
}
