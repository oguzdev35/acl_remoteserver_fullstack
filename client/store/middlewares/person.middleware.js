import { 
    GET_PERSON, LIST_PERSON, 
    UPDATE_PERSON,DELETE_PERSON, CREATE_PERSON, 
    PERSON, LOAD_PERSON, REMOVE_PERSON,
    SET_PERSON, setPerson, setPersons,
    removePerson
} from '../actions/person.action';
import { API_ERROR, API_SUCCESS, apiRequest } from '../actions/api.action';
import { setLoader } from '../actions/ui.action';
import { setNotification } from '../actions/notification.action';

let headers = {};
let url = '';
let personId = '';

export default store => next => action => {
    const secretToken = store.getState().user.secretToken;
    const userId = store.getState().user._id;
    const appId = store.getState().appId;
    next(action);
    switch(action.type){
        case LIST_PERSON:
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${secretToken}`,
                'x-app-id': `${appId}`
            };
            url = `/api/persons/${action.payload.placeId}/${action.payload.userId}`;
            next(apiRequest({body: action.payload, method: 'GET', url: url, headers: headers, feature: PERSON, docAction: action.docAction}));
            next(setLoader({state: true, feature: PERSON}));
            break;
        case GET_PERSON:
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${secretToken}`,
                'x-app-id': `${appId}`
            };
            url = `/api/persons/${userId}`;
            next(apiRequest({body: action.payload, method: 'GET', url: url, headers: headers, feature: PERSON, docAction: action.docAction}));
            next(setLoader({state: true, feature: PERSON}));
            break;
        case CREATE_PERSON:
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${secretToken}`,
                'x-app-id': `${appId}`
            };
            url = `/api/persons/${action.payload.placeId}/${action.payload.userId}`;
            next(apiRequest({body: action.payload.newPerson, method: 'POST', url: url, headers: headers, feature: PERSON, docAction: action.docAction}));
            next(setLoader({state: true, feature: PERSON}));
            break;

        case UPDATE_PERSON:
            personId = action.payload.personId;
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${secretToken}`,
                'x-app-id': `${appId}`
            };
            url = `/api/persons/${action.payload.personId}/${action.payload.placeId}/${action.payload.userId}`;
            next(apiRequest({body: action.payload.updatedPerson, method: 'PUT', url: url, headers: headers, feature: PERSON, docAction: action.docAction}));
            next(setLoader({state: true, feature: PERSON}));
            break;

        case DELETE_PERSON:
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${secretToken}`,
                'x-app-id': `${appId}`
            };
            url = `/api/persons/${action.payload.personId}/${action.payload.placeId}/${action.payload.userId}`;
            next(apiRequest({body: null, method: 'DELETE', url: url, headers: headers, feature: PERSON, docAction: action.docAction}));
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
        case `${PERSON} ${API_ERROR}`:
            next(setNotification({message: action.payload, feature: PERSON}))
            next(setLoader({state: false, feature: PERSON}))
            break;
        default:
            break;
    }
}
