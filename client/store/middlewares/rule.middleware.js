import { 
    GET_RULE, LIST_RULE, 
    UPDATE_RULE,
    DELETE_RULE, CREATE_RULE, 
    RULE, LOAD_RULE, REMOVE_RULE,
    SET_RULE, setRule, setRules,
    removeRule
  } from '../actions/rule.action';
  import { API_ERROR, API_SUCCESS, apiRequest } from '../actions/api.action';
  import { setLoader } from '../actions/ui.action';
  import { setNotification } from '../actions/notification.action';
  
  let headers = {};
  let url = '';
  let ruleId = '';
  
  export default store => next => action => {
    const secretToken = store.getState().user.secretToken;
    const userId = store.getState().user._id;
    const appId = store.getState().appId;
    next(action);
    switch(action.type){
        case LIST_RULE:
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${secretToken}`,
                'x-app-id': `${appId}`
            };
            url = `/api/rules`;
            next(apiRequest({body: action.payload, method: 'GET', url: url, headers: headers, feature: RULE, docAction: action.docAction}));
            next(setLoader({state: true, feature: RULE}));
            break;
        case GET_RULE:
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${secretToken}`,
                'x-app-id': `${appId}`
            };
            url = `/api/rules/${userId}`;
            next(apiRequest({body: action.payload, method: 'GET', url: url, headers: headers, feature: RULE, docAction: action.docAction}));
            next(setLoader({state: true, feature: RULE}));
            break;
        case CREATE_RULE:
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${secretToken}`,
                'x-app-id': `${appId}`
            };
            url = `/api/rules`;
            next(apiRequest({body: action.payload, method: 'POST', url: url, headers: headers, feature: RULE, docAction: action.docAction}));
            next(setLoader({state: true, feature: RULE}));
            break;
  
        case UPDATE_RULE:
            ruleId = action.payload.ruleId;
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${secretToken}`,
                'x-app-id': `${appId}`
            };
            url = `/api/rules/${action.payload.ruleId}/${action.payload.placeId}/${action.payload.userId}`;
            next(apiRequest({body: action.payload.updatedRule, method: 'PUT', url: url, headers: headers, feature: RULE, docAction: action.docAction}));
            next(setLoader({state: true, feature: RULE}));
            break;
  
        case DELETE_RULE:
            ruleId = action.payload.ruleId;
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${secretToken}`,
                'x-app-id': `${appId}`
            };
            url = `/api/rules/${action.payload.ruleId}/${action.payload.placeId}/${action.payload.userId}`;
            next(apiRequest({body: null, method: 'DELETE', url: url, headers: headers, feature: RULE, docAction: action.docAction}));
            next(setLoader({state: true, feature: RULE}));
            break;
  
        case `${RULE} ${API_SUCCESS}`:
            switch(action.meta.docAction){
                case SET_RULE:
                    next(setRule({rule: action.payload, normalizeKey: null}));
                    break;
                case LOAD_RULE:
                    next(setRules({rules: action.payload, normalizeKey: null}));
                    break;
                case REMOVE_RULE:
                    next(removeRule({rule: action.payload, normalizeKey: null}));
                    break;
                default:
                    break;
            }
            next(setLoader({state: false, feature: RULE}));
            break;
        case `${RULE} ${API_ERROR}`:
            next(setNotification({message: action.payload, feature: RULE}))
            next(setLoader({state: false, feature: RULE}))
            break;
        default:
            break;
    }
  }
  