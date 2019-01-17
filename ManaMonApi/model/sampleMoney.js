var mongoose = require('mongoose');

// SampleMoney Schema
var SampleMoneySchema = mongoose.Schema({
money: {
    type: Number,
    required: false
},
note: {
    type: String,
    required: false
}

});

var SampleMoney = module.exports = mongoose.model('SampleMoney', SampleMoneySchema);