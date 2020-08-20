import { SET_DOOR, REMOVE_DOOR, LOAD_DOOR, CLEAR_DOOR } from '../actions/door.action';

const initialState = [];

export default (doors = initialState, action) => {
    switch(action.type){
        case SET_DOOR:
            return [
                ...doors.filter( door => door._id != action.payload._id),
                action.payload
            ];
        case REMOVE_DOOR:
            return doors.filter( door => door._id != action.payload._id);
        case LOAD_DOOR:
            return action.payload;
        case CLEAR_DOOR:
            return [];
        default:
            return doors;
    }
};