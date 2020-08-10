import { 
    GET_PERSON, LIST_PERSON, 
    ASSIGN_PERSON, UPDATE_PERSON,
    DELETE_PERSON, CREATE_PERSON, 
    PERSON, LOAD_PERSON, REMOVE_PERSON,
    SET_PERSON, setPerson, setPersons,
    removePerson
} from '../actions/person.action';
import { API_ERROR, API_SUCCESS, apiRequest } from '../actions/api.action';
import { setLoader } from '../actions/ui.action';
import { setNotification } from '../actions/notification.action';


export default store => next => action => {
    next(action);
    switch(action.type){
        case LIST_PERSON:
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${store.getState().user.secretToken}` 
            };
            const url = `/api/persons/list/${store.getState().user._id}`;
            next(apiRequest({body: action.payload, method: 'GET', url: url, headers: headers, feature: PERSON, docAction: action.docAction}));
            next(setLoader({state: true, feature: PERSON}));
            break;
        case GET_PERSON:
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${store.getState().user.secretToken}` 
            };
            const url = `/api/persons/${store.getState().user._id}`;
            next(apiRequest({body: action.payload, method: 'GET', url: url, headers: headers, feature: PERSON, docAction: action.docAction}));
            next(setLoader({state: true, feature: PERSON}));
            break;
        case CREATE_PERSON:
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${store.getState().user.secretToken}` 
            };
            const url = `/api/persons/create/${store.getState().user._id}`;
            next(apiRequest({body: action.payload, method: 'POST', url: url, headers: headers, feature: PERSON, docAction: action.docAction}));
            next(setLoader({state: true, feature: PERSON}));
            break;
        case ASSIGN_PERSON:
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${store.getState().user.secretToken}` 
            };
            const url = `/api/persons/${store.getState().user._id}`;
            next(apiRequest({body: action.payload, method: 'POST', url: url, headers: headers, feature: PERSON, docAction: action.docAction}));
            next(setLoader({state: true, feature: PERSON}));
            break;

        case UPDATE_PERSON:
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${store.getState().user.secretToken}` 
            };
            const url = `/api/persons/${store.getState().user._id}`;
            next(apiRequest({body: action.payload, method: 'PUT', url: url, headers: headers, feature: PERSON, docAction: action.docAction}));
            next(setLoader({state: true, feature: PERSON}));
            break;

        case DELETE_PERSON:
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${store.getState().user.secretToken}` 
            };
            const url = `/api/persons/${store.getState().user._id}`;
            next(apiRequest({body: action.payload, method: 'DELETE', url: url, headers: headers, feature: PERSON, docAction: action.docAction}));
            next(setLoader({state: true, feature: PERSON}));
            break;

        case `${PERSON} ${API_SUCCESS}`:
            switch(action.meta.docAction){
                case SET_PERSON:
                    next(setPerson({person: action.payload, normalizeKey: null}));
                    break;
                case LOAD_PERSON:
                    next(setPersons({persons: action.payload, normalizeKey: null}));
                    break;
                case REMOVE_PERSON:
                    next(removePerson({person: action.payload, normalizeKey: null}));
                    break;
                default:
                    break;
            }
            next(setLoader({state: false, feature: PERSON}));
            break;
        case `${USER} ${API_ERROR}`:
            next(setNotification({message: action.payload, feature: PERSON}))
            next(setLoader({state: false, feature: PERSON}))
            break;
        default:
            break;
    }
}
