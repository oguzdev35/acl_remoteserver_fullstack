import {
    SET_PLACE, REMOVE_PLACE,
    LOAD_PLACE
} from '../actions/place.action';
import { SET_PERSON } from '../actions/person.action';

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
        default:
            return places;
    }
};