import { Schema, model } from 'mongoose';

// SampleMoney Schema
var SampleMoneySchema = Schema({
money: {
    type: number,
    required: false
},
note: {
    type: string,
    required: false
}

});

module.exports = model('SampleMoney', SampleMoneySchema);