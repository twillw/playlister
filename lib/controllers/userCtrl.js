'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Playlist = mongoose.model('Playlist'),
    apikey = 'AIzaSyBg40YpjyCmSLDJLhwY57WUbH8RjITh9OU',
    https = require('https'),
    request = require('request');

exports.users = function(req, res) {
  return User.find(function (err, users) {
    if (!err) {
      return res.json(users);
    } else {
      return res.send(err);
    }
  });
};
exports.createUser = function(req, res) {
  var user = new User({ username : req.body.name });
  user.save(function (err, user) {
    if (!err) {
      return res.json(user);
    } else {
      return res.send(err);
    }
  })
};
