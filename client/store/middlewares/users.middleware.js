import { 
  GET_USER, LIST_USER, 
  ASSIGN_USER, UPDATE_USER,
  DELETE_USER, CREATE_USER, 
  USERS, LOAD_USER, REMOVE_USER,
  SET_USER, setUser, setUsers,
  removeUser
} from '../actions/users.action';
import { API_ERROR, API_SUCCESS, apiRequest } from '../actions/api.action';
import { setLoader } from '../actions/ui.action';
import { setNotification } from '../actions/notification.action';

let headers = {};
let url = '';

export default store => next => action => {
    const secretToken = store.getState().user.secretToken;
    const userId = store.getState().user._id;
    const appId = store.getState().appId;
    next(action);
    switch(action.type){
        case LIST_USER:
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${secretToken}`,
                'x-app-id': `${appId}`
            };
            url = `/api/users`;

            next(apiRequest({body: null, method: 'GET', url: url, headers: headers, feature: USERS, docAction: action.docAction}));
            next(setLoader({state: true, feature: USERS}));
            break;
        case GET_USER:
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${secretToken}`,
                'x-app-id': `${appId}`
            };
            url = `/api/users/${userId}`;

            next(apiRequest({body: action.payload, method: 'GET', url: url, headers: headers, feature: USERS, docAction: action.docAction}));
            next(setLoader({state: true, feature: USERS}));
            break;
        case CREATE_USER:
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${secretToken}`,
                'x-app-id': `${appId}`
            };
            url = `/api/users`;
            next(apiRequest({body: action.payload, method: 'POST', url: url, headers: headers, feature: USERS, docAction: action.docAction}));
            next(setLoader({state: true, feature: USERS}));
            break;
        case ASSIGN_USER:
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${secretToken}` 
            };
            url = `/api/persons/${userId}`;
            next(apiRequest({body: action.payload, method: 'POST', url: url, headers: headers, feature: USERS, docAction: action.docAction}));
            next(setLoader({state: true, feature: USERS}));
            break;

        case UPDATE_USER:
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${secretToken}`,
                'x-app-id': `${appId}`
            };
            url = `/api/users/${userId}`;
            next(apiRequest({body: action.payload.updatedPerson, method: 'PUT', url: url, headers: headers, feature: USERS, docAction: action.docAction}));
            next(setLoader({state: true, feature: USERS}));
            break;

        case DELETE_USER:
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${secretToken}`,
                'x-app-id': `${appId}`
            };
            url = `/api/users/${userId}`;
            next(apiRequest({body: null, method: 'DELETE', url: url, headers: headers, feature: USERS, docAction: action.docAction}));
            next(setLoader({state: true, feature: USERS}));
            break;

        case `${USERS} ${API_SUCCESS}`:
            console.log(action)
            switch(action.meta.docAction){
                case SET_USER:
                    next(setUser({user: action.payload, normalizeKey: null}));
                    break;
                case LOAD_USER:
                    next(setUsers({users: action.payload, normalizeKey: null}));
                    break;
                case REMOVE_USER:
                    next(removeUser({user: action.payload, normalizeKey: null}));
                    break;
                default:
                    break;
            }
            next(setLoader({state: false, feature: USERS}));
            break;
        case `${USERS} ${API_ERROR}`:
            console.log(action);
            next(setNotification({message: action.payload, feature: USERS}))
            next(setLoader({state: false, feature: USERS}))
            break;
        default:
            break;
    }
}
