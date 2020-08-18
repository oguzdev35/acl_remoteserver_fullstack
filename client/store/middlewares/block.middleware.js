import { 
    GET_BLOCK, LIST_BLOCK, 
    UPDATE_BLOCK,
    DELETE_BLOCK, CREATE_BLOCK, 
    BLOCK, LOAD_BLOCK, REMOVE_BLOCK,
    SET_BLOCK, setBlock, setBlocks,
    removeBlock
} from '../actions/block.action';
import { API_ERROR, API_SUCCESS, apiRequest } from '../actions/api.action';
import { setLoader } from '../actions/ui.action';
import { setNotification } from '../actions/notification.action';

let headers = {};
let url = '';
let blockId = '';

export default store => next => action => {
    const secretToken = store.getState().user.secretToken;
    const userId = store.getState().user._id;
    const appId = store.getState().appId;
    next(action);
    switch(action.type){
        case LIST_BLOCK:
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${secretToken}`,
                'x-app-id': `${appId}`
            };
            url = `/api/blocks/${action.payload.placeId || ''}/${action.payload.userId}`;
            next(apiRequest({body: action.payload, method: 'GET', url: url, headers: headers, feature: BLOCK, docAction: action.docAction}));
            next(setLoader({state: true, feature: BLOCK}));
            break;
        case GET_BLOCK:
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${secretToken}`,
                'x-app-id': `${appId}` 
            };
            url = `/api/blocks/${userId}`;
            next(apiRequest({body: action.payload, method: 'GET', url: url, headers: headers, feature: BLOCK, docAction: action.docAction}));
            next(setLoader({state: true, feature: BLOCK}));
            break;
        case CREATE_BLOCK:
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${secretToken}`,
                'x-app-id': `${appId}`
            };
            url = `/api/blocks/${action.payload.placeId}/${action.payload.userId}`;
            console.log(url)
            next(apiRequest({body: action.payload.newBlock, method: 'POST', url: url, headers: headers, feature: BLOCK, docAction: action.docAction}));
            next(setLoader({state: true, feature: BLOCK}));
            break;

        case UPDATE_BLOCK:
            blockId = action.payload.blockId;
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${secretToken}`,
                'x-app-id': `${appId}`
            };
            url = `/api/blocks/${action.payload.blockId}/${action.payload.placeId}/${action.payload.userId}`;
            next(apiRequest({body: action.payload.updatedBlock, method: 'PUT', url: url, headers: headers, feature: BLOCK, docAction: action.docAction}));
            next(setLoader({state: true, feature: BLOCK}));
            break;

        case DELETE_BLOCK:
            blockId = action.payload.blockId;
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${secretToken}`,
                'x-app-id': `${appId}`
            };
            url = `/api/blocks/${action.payload.blockId}/${action.payload.placeId}/${action.payload.userId}`;
            next(apiRequest({body: null, method: 'DELETE', url: url, headers: headers, feature: BLOCK, docAction: action.docAction}));
            next(setLoader({state: true, feature: BLOCK}));
            break;

        case `${BLOCK} ${API_SUCCESS}`:
            switch(action.meta.docAction){
                case SET_BLOCK:
                    next(setBlock({block: action.payload, normalizeKey: null}));
                    break;
                case LOAD_BLOCK:
                    next(setBlocks({blocks: action.payload, normalizeKey: null}));
                    break;
                case REMOVE_BLOCK:
                    next(removeBlock({block: action.payload, normalizeKey: null}));
                    break;
                default:
                    break;
            }
            next(setLoader({state: false, feature: BLOCK}));
            break;
        case `${BLOCK} ${API_ERROR}`:
            next(setNotification({message: action.payload, feature: BLOCK}))
            next(setLoader({state: false, feature: BLOCK}))
            break;
        default:
            break;
    }
}
