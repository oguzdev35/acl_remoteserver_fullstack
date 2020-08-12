import { 
  SET_APPID, UNSET_APPID
} from '../actions/appId.action';

const initialState = '';

export default (appId = initialState, action) => {
  switch(action.type){
      case SET_APPID:
          return action.payload;
      case UNSET_APPID:
          return '';
      default:
          return appId;
  }
};