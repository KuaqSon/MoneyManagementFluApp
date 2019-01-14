var express = require('express');
var sampleMoney = require('../model/SampleMoney');
var router = express.Router();
var bcrypt = require('bcrypt');
var passport = require('passport');
var authToken = require('../config/token');
const rfToken = require('../model/refreshToken');
const moment = require('moment')
// const User = require('../model/user');

router.post('/sample-money', function (req, res) {
  res.json( {
    msg: 'test'
  })

});


module.exports = router; 