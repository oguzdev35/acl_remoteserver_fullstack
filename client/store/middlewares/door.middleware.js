import { 
  GET_DOOR, LIST_DOOR, 
  UPDATE_DOOR,
  DELETE_DOOR, CREATE_DOOR, 
  DOOR, LOAD_DOOR, REMOVE_DOOR,
  SET_DOOR, setDoor, setDoors,
  removeDoor
} from '../actions/door.action';
import { API_ERROR, API_SUCCESS, apiRequest } from '../actions/api.action';
import { setLoader } from '../actions/ui.action';
import { setNotification } from '../actions/notification.action';

let headers = {};
let url = '';
let doorId = '';

export default store => next => action => {
  const secretToken = store.getState().user.secretToken;
  const userId = store.getState().user._id;
  const appId = store.getState().appId;
  next(action);
  switch(action.type){
      case LIST_DOOR:
          headers = {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${secretToken}`,
              'x-app-id': `${appId}`
          };
          url = `/api/doors/${action.payload.blockId}/${action.payload.placeId}/${action.payload.userId}`;
          next(apiRequest({body: action.payload, method: 'GET', url: url, headers: headers, feature: DOOR, docAction: action.docAction}));
          next(setLoader({state: true, feature: DOOR}));
          break;
      case GET_DOOR:
          headers = {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${secretToken}`,
              'x-app-id': `${appId}`
          };
          url = `/api/doors/${userId}`;
          next(apiRequest({body: action.payload, method: 'GET', url: url, headers: headers, feature: DOOR, docAction: action.docAction}));
          next(setLoader({state: true, feature: DOOR}));
          break;
      case CREATE_DOOR:
          headers = {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${secretToken}`,
              'x-app-id': `${appId}`
          };
          url = `/api/doors/${action.payload.blockId}/${action.payload.placeId}/${action.payload.userId}`;
          next(apiRequest({body: action.payload.newDoor, method: 'POST', url: url, headers: headers, feature: DOOR, docAction: action.docAction}));
          next(setLoader({state: true, feature: DOOR}));
          break;

      case UPDATE_DOOR:
          doorId = action.payload.doorId;
          headers = {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${secretToken}`,
              'x-app-id': `${appId}`
          };
          url = `/api/doors/${action.payload.doorId}/${action.payload.placeId}/${action.payload.userId}`;
          next(apiRequest({body: action.payload.updatedDoor, method: 'PUT', url: url, headers: headers, feature: DOOR, docAction: action.docAction}));
          next(setLoader({state: true, feature: DOOR}));
          break;

      case DELETE_DOOR:
          doorId = action.payload.doorId;
          headers = {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${secretToken}`,
              'x-app-id': `${appId}`
          };
          url = `/api/doors/${action.payload.doorId}/${action.payload.placeId}/${action.payload.userId}`;
          next(apiRequest({body: null, method: 'DELETE', url: url, headers: headers, feature: DOOR, docAction: action.docAction}));
          next(setLoader({state: true, feature: DOOR}));
          break;

      case `${DOOR} ${API_SUCCESS}`:
          switch(action.meta.docAction){
              case SET_DOOR:
                  next(setDoor({door: action.payload, normalizeKey: null}));
                  break;
              case LOAD_DOOR:
                  next(setDoors({doors: action.payload, normalizeKey: null}));
                  break;
              case REMOVE_DOOR:
                  next(removeDoor({door: action.payload, normalizeKey: null}));
                  break;
              default:
                  break;
          }
          next(setLoader({state: false, feature: DOOR}));
          break;
      case `${DOOR} ${API_ERROR}`:
            next(setNotification({notification: {message: action.payload.response.data.error, type: 'error'}, feature: DOOR}))
            next(setLoader({state: false, feature: DOOR}))
          break;
      default:
          break;
  }
}
