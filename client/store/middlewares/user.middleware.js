import { 
    USER, LOGIN_USER_BY_EMAIL, setUser, 
    LOGIN_USER_BY_USERNAME, SET_USER,
    UNSET_USER, unsetUser, LOGOUT_USER
} from '../actions/user.action';
import { API_ERROR, API_SUCCESS, apiRequest } from '../actions/api.action';
import { setLoader } from '../actions/ui.action';
import { setNotification } from '../actions/notification.action';


let headers = {};
let url = '';

export default store => next => action => {
    const secretToken = store.getState().user.secretToken;
    const userId = store.getState().user._id;

    next(action);
    switch(action.type){
        case LOGIN_USER_BY_EMAIL:
            headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };
            url = '/auth/signin';
            next(apiRequest({body: action.payload, method: 'POST', headers: headers, url: url, feature: USER, docAction: action.docAction}));
            next(setLoader({state: true, feature: USER}));
            break;
        case LOGIN_USER_BY_USERNAME:
            headers = {
                'Access': 'application/json',
                'Content-Type': 'application/json'
            };
            url = '/auth/signin';
            next(apiRequest({body: action.payload, method: 'POST', headers: headers, url: url, feature: USER, docAction: action.docAction}));
            next(setLoader({state: true, feature: USER}));
            break;
        case LOGOUT_USER:
            headers = {
                'Access': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${secretToken}` 
            };
            url = `/auth/signout/${userId}`;
            next(apiRequest({body: null, method: 'GET', headers: headers, url: url, feature: USER, docAction: action.docAction }));
            next(setLoader({state: true, feature: USER}));
            break;
        case `${USER} ${API_SUCCESS}`:
            switch(action.meta.docAction){
                case SET_USER:
                    next(setUser({user: action.payload, normalizeKey: null}));
                    break;
                case UNSET_USER:
                    next(unsetUser({user: action.payload, normalizeKey: null}));
                    break;
                default:
                    break;
            }
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
