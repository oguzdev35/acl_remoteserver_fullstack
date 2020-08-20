import { SET_NOTIFICATION, REMOVE_NOTIFICATION } from '../actions/notification.action';

const initialState = [];

export default (notifications = initialState, action) => {
    switch(true){
        case action.type.includes(SET_NOTIFICATION):
            return [...notifications, action.payload];
        case action.type.includes(REMOVE_NOTIFICATION):
            return notifications.filter(notification => notification.id != action.payload);
        default:
            return notifications;
    }
}