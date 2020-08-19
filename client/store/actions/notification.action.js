// action types
export const SET_NOTIFICATION = 'SET NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

// action creators
export const setNotification = ({message, type, feature}) => ({
    type: `${feature} ${SET_NOTIFICATION}`,
    payload: {message, type},
    meta: {feature}
});

export const removeNotification = ({notificationId, feature}) => ({
    type: `${feature} ${REMOVE_NOTIFICATION}`,
    payload: notificationId,
    meta: {feature}
});