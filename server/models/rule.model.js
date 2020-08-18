import mongoose from 'mongoose';

const RuleSchema = new mongoose.Schema({
    personTagId: {
        type: String,
        trim: true,
        required: 'Person ID is required',
    },
    doorTagId: {
        type: String,
        trim: true,
        required: 'Door ID is required',         
    },
    _fromDate: String,
    _toDate: String,
    _fromClock: String,
    _toClock: String,
    daysInWeek: [
        {type: String}
    ],
    allow: {
        type: Boolean,
        required: 'Allow field is required'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
});

RuleSchema
    .virtual('dateInterval')
    .set(function({from, to}){
        this._fromDate = from;
        this._toDate = to;
    })
    .get(function(){
        return {
            from: this._fromDate,
            to: this._toDate
        }
    });

RuleSchema
    .virtual('clockInterval')
    .set(function({from, to}){
        this._fromClock = from;
        this._toClock = to;
    })
    .get(function(){
        return {
            from: this._fromClock,
            to: this._toClock
        }
    });

RuleSchema
    .set('toObject', {getters: true})

export default mongoose.model('Rule', RuleSchema);