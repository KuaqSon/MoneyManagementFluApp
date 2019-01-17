var express = require('express');
var SampleMoney = require('../model/SampleMoney');
var router = express.Router();
// var bcrypt = require('bcrypt');
// var passport = require('passport');
// var authToken = require('../config/token');
// const rfToken = require('../model/refreshToken');
// const moment = require('moment')
// const User = require('../model/user');

router.get('/sample-get-v1', function (req, res) {
  res.json( {
    msg: 'test'
  })

});

router.post('/add-money', function (req, res) {
  var money = req.body.money;
  // var accountNumber = req.body.accountNumber;
  var notes = req.body.notes;
  console.log(" body ", req.body);

  const sampleMon = new SampleMoney({
    money: money,
    notes: notes
  });

  sampleMon.save(function (err) {
    if (err) {
        console.log(err);
        res.json({ msg: "err" });
    } else {
        console.log("success");
        SampleMoney.find(function (err, SampleMoney) {
            res.json({ SampleMoney: SampleMoney });
        })
    }
  })
});

module.exports = router; 