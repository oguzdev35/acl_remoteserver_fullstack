import { 
    GET_PLACE, LIST_PLACE, 
    ASSIGN_PLACE, UPDATE_PLACE,
    DELETE_PLACE, CREATE_PLACE, 
    PLACE, LOAD_PLACE, REMOVE_PLACE,
    SET_PLACE, setPlace, setPlaces,
    removePlace
} from '../actions/place.action';
import { API_ERROR, API_SUCCESS, apiRequest } from '../actions/api.action';
import { setLoader } from '../actions/ui.action';
import { setNotification } from '../actions/notification.action';

let headers = {};
let url = '';
let placeId = '';

export default store => next => action => {
    const secretToken = store.getState().user.secretToken;
    const userId = store.getState().user._id;
    const appId = store.getState().appId;
    next(action);
    switch(action.type){
        case LIST_PLACE:
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${secretToken}`,
                'x-app-id': `${appId}`
            };
            url = `/api/places/${userId}`;
            next(apiRequest({body: action.payload, method: 'GET', url: url, headers: headers, feature: PLACE, docAction: action.docAction}));
            next(setLoader({state: true, feature: PLACE}));
            break;
        case GET_PLACE:
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${secretToken}`,
                'x-app-id': `${appId}` 
            };
            url = `/api/places/${userId}`;
            next(apiRequest({body: action.payload, method: 'GET', url: url, headers: headers, feature: PLACE, docAction: action.docAction}));
            next(setLoader({state: true, feature: PLACE}));
            break;
        case CREATE_PLACE:
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${secretToken}`,
                'x-app-id': `${appId}`
            };
            url = `/api/places/${userId}`;
            next(apiRequest({body: action.payload, method: 'POST', url: url, headers: headers, feature: PLACE, docAction: action.docAction}));
            next(setLoader({state: true, feature: PLACE}));
            break;
        case ASSIGN_PLACE:
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${secretToken}`,
                'x-app-id': `${appId}`
            };
            url = `/api/places/${userId}`;
            next(apiRequest({body: action.payload, method: 'POST', url: url, headers: headers, feature: PLACE, docAction: action.docAction}));
            next(setLoader({state: true, feature: PLACE}));
            break;

        case UPDATE_PLACE:
            placeId = action.payload.placeId;
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${secretToken}`,
                'x-app-id': `${appId}`
            };
            url = `/api/places/${placeId}/${userId}`;
            next(apiRequest({body: action.payload.updatedPlace, method: 'PUT', url: url, headers: headers, feature: PLACE, docAction: action.docAction}));
            next(setLoader({state: true, feature: PLACE}));
            break;

        case DELETE_PLACE:
            placeId = action.payload.placeId;
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${secretToken}`,
                'x-app-id': `${appId}`
            };
            url = `/api/places/${placeId}/${userId}`;
            next(apiRequest({body: null, method: 'DELETE', url: url, headers: headers, feature: PLACE, docAction: action.docAction}));
            next(setLoader({state: true, feature: PLACE}));
            break;

        case `${PLACE} ${API_SUCCESS}`:
            switch(action.meta.docAction){
                case SET_PLACE:
                    next(setPlace({place: action.payload, normalizeKey: null}));
                    break;
                case LOAD_PLACE:
                    next(setPlaces({places: action.payload, normalizeKey: null}));
                    break;
                case REMOVE_PLACE:
                    next(removePlace({place: action.payload, normalizeKey: null}));
                    break;
                default:
                    break;
            }
            next(setLoader({state: false, feature: PLACE}));
            break;
        case `${PLACE} ${API_ERROR}`:
            next(setNotification({message: action.payload, feature: PLACE}))
            next(setLoader({state: false, feature: PLACE}))
            break;
        default:
            break;
    }
}
