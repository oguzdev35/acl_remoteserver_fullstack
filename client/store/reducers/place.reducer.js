import {
    SET_PLACE, REMOVE_PLACE,
    LOAD_PLACE, CLEAR_PLACE
} from '../actions/place.action';

const initialState = [];

export default (places = initialState, action) => {
    switch(action.type){
        case SET_PLACE:
            return [
                ...places.filter( place => place._id != action.payload._id),
                action.payload
            ];
        case REMOVE_PLACE:
            return places.filter( place => place._id != action.payload._id);
        case LOAD_PLACE:
            return action.payload;
        case CLEAR_PLACE:
            return [];
        default:
            return places;
    }
};