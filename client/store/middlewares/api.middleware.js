import Axios from 'axios';
import { API_REQUEST, apiError, apiSuccess } from '../actions/api.action';


export default ({dispatch}) => next => action => {
    next(action);

    if(action.type.includes(API_REQUEST)){
        const { url, method, headers, feature, docAction } = action.meta;
        console.log(action)
        Axios({url, method, headers, data: action.payload})
            .then( ({data}) => data)
            .then( response => dispatch(apiSuccess({response, feature, docAction})))
            .catch( error => {
                dispatch(apiError({error, feature}))
            })
    }
};