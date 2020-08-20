import { 
    SET_PERSON, REMOVE_PERSON, LOAD_PERSON, CLEAR_PERSON
} from '../actions/person.action';

const initialState = [];

export default (persons = initialState, action) => {
    switch(action.type){
        case SET_PERSON:
            return [
                ...persons.filter( person => person._id != action.payload._id),
                action.payload
            ];
        case REMOVE_PERSON:
            return persons.filter( person => person._id != action.payload._id);
        case LOAD_PERSON:
            return action.payload;
        case CLEAR_PERSON:
            return [];
        default:
            return persons;
    }
};