import mongoose from 'mongoose';

const RuleSchema = new mongoose.Schema({
    department: {
          type: mongoose.Schema.ObjectId,
          ref: 'Department'
    },
    doors: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'Log'
        }
    ],
    _fromDate: String,
    _toDate: String,
    _fromClock: String,
    _toClock: String,
    daysInWeek: [
        {type: String}
    ],
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