import { 
    GET_DEPARTMENT, LIST_DEPARTMENT, 
    UPDATE_DEPARTMENT,DELETE_DEPARTMENT, CREATE_DEPARTMENT, 
    DEPARTMENT, LOAD_DEPARTMENT, REMOVE_DEPARTMENT,
    SET_DEPARTMENT, setDepartment, setDepartments,
    removeDepartment
} from '../actions/department.action';
import { API_ERROR, API_SUCCESS, apiRequest } from '../actions/api.action';
import { setLoader } from '../actions/ui.action';
import { setNotification } from '../actions/notification.action';

let headers = {};
let url = '';
let departmentId = '';

export default store => next => action => {
    const secretToken = store.getState().user.secretToken;
    const userId = store.getState().user._id;
    const appId = store.getState().appId;
    next(action);
    switch(action.type){
        case LIST_DEPARTMENT:
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${secretToken}`,
                'x-app-id': `${appId}`
            };
            url = `/api/departments/${action.payload.placeId}/${action.payload.userId}`;
            next(apiRequest({body: action.payload, method: 'GET', url: url, headers: headers, feature: DEPARTMENT, docAction: action.docAction}));
            next(setLoader({state: true, feature: DEPARTMENT}));
            break;
        case GET_DEPARTMENT:
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${secretToken}`,
                'x-app-id': `${appId}`
            };
            url = `/api/departments/${userId}`;
            next(apiRequest({body: action.payload, method: 'GET', url: url, headers: headers, feature: DEPARTMENT, docAction: action.docAction}));
            next(setLoader({state: true, feature: DEPARTMENT}));
            break;
        case CREATE_DEPARTMENT:
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${secretToken}`,
                'x-app-id': `${appId}`
            };
            url = `/api/departments/${action.payload.placeId}/${action.payload.userId}`;
            next(apiRequest({body: action.payload.newDepartment, method: 'POST', url: url, headers: headers, feature: DEPARTMENT, docAction: action.docAction}));
            next(setLoader({state: true, feature: DEPARTMENT}));
            break;

        case UPDATE_DEPARTMENT:
            departmentId = action.payload.departmentId;
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${secretToken}`,
                'x-app-id': `${appId}`
            };
            url = `/api/departments/${action.payload.departmentId}/${action.payload.placeId}/${action.payload.userId}`;
            next(apiRequest({body: action.payload.updatedDepartment, method: 'PUT', url: url, headers: headers, feature: DEPARTMENT, docAction: action.docAction}));
            next(setLoader({state: true, feature: DEPARTMENT}));
            break;

        case DELETE_DEPARTMENT:
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${secretToken}`,
                'x-app-id': `${appId}`
            };
            url = `/api/departments/${action.payload.departmentId}/${action.payload.placeId}/${action.payload.userId}`;
            next(apiRequest({body: null, method: 'DELETE', url: url, headers: headers, feature: DEPARTMENT, docAction: action.docAction}));
            next(setLoader({state: true, feature: DEPARTMENT}));
            break;

        case `${DEPARTMENT} ${API_SUCCESS}`:
            switch(action.meta.docAction){
                case SET_DEPARTMENT:
                    next(setDepartment({department: action.payload, normalizeKey: null}));
                    break;
                case LOAD_DEPARTMENT:
                    next(setDepartments({departments: action.payload, normalizeKey: null}));
                    break;
                case REMOVE_DEPARTMENT:
                    next(removeDepartment({department: action.payload, normalizeKey: null}));
                    break;
                default:
                    break;
            }
            next(setLoader({state: false, feature: DEPARTMENT}));
            break;
        case `${DEPARTMENT} ${API_ERROR}`:
            next(setNotification({message: action.payload, feature: DEPARTMENT}))
            next(setLoader({state: false, feature: DEPARTMENT}))
            break;
        default:
            break;
    }
}
