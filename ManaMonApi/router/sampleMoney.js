var express = require('express');
var SampleMoney = require('../model/SampleMoney');
var router = express.Router();
// var bcrypt = require('bcrypt');
// var passport = require('passport');
// var authToken = require('../config/token');
// const rfToken = require('../model/refreshToken');
// const moment = require('moment')
// const User = require('../model/user');

router.get('/moneys', function (req, res) {
  SampleMoney.find(function (err, sampleMoney) {
    res.json({ sampleMoney: sampleMoney });
  })
});

router.post('/add-update-money', function (req, res) {
  var id = req.body.id;
  var money = req.body.money;
  // var accountNumber = req.body.accountNumber;
  var notes = req.body.notes;
  console.log(" body ", req.body);

  if(!id) {
    const sampleMon = new SampleMoney({
      money: money,
      notes: notes
    });

    sampleMon.save(function (err) {
      if (err) {
          console.log(err);
          res.json({ msg: "err" });
      } else {
          console.log("add new success");
          SampleMoney.find(function (err, SampleMoney) {
              res.json({ SampleMoney: SampleMoney });
          })
      }
    })
  } else {
    SampleMoney.findById(id, function (err, sampleMoney) {
      if (err) {
        return res.json({
          resp: null,
          isError: true,
          msg: null
        });
      }
      if (sampleMoney) {
        sampleMoney.money = money;
        sampleMoney.notes = notes;
        sampleMoney.save(function (err) {
          if (err)
            return res.json({
              resp: null,
              isError: true,
              msg: null
            });
          return res.json({
            resp: { sampleMoney: sampleMoney },
            isError: false,
            msg: null
          });
        })
      }
    })
  }
});

module.exports = router; 