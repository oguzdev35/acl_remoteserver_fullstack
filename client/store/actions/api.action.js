// action types
export const API_REQUEST = 'API_REQUEST';
export const API_SUCCESS = 'API_SUCCESS';
export const API_ERROR = 'API_ERROR';

// action creators
export const apiRequest = ({body, method, headers, url, feature, docAction}) => ({
    type: `${feature} ${API_REQUEST}`,
    payload: body,
    meta: {method, url, headers, docAction, feature}
});

export const apiSuccess = ({response, feature, docAction}) => ({
    type: `${feature} ${API_SUCCESS}`,
    payload: response,
    meta: {feature, docAction}
});

export const apiError = ({error, feature, docAction}) => ({
    type: `${feature} ${API_ERROR}`,
    payload: error,
    meta: {feature}
});