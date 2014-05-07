'use strict';

var mongoose = require('mongoose'),
    time = require('time'),
    User = mongoose.model('User'),
    Playlist = mongoose.model('Playlist');

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

exports.playlists = function(req, res) {
  return Playlist.find(function (err, playlists) {
    if (!err) {
      return res.json(playlists);
    } else {
      return res.send(err);
    }
  });
};

exports.createPlaylist = function(req, res) {
  var data = req.body;
  var date = new time.Date();
  date.setTimezone('Canada/Toronto');
  var playlist = new Playlist({
    title: data.title,
    createdBy: data.createdBy,
    date: date,
    songs: data.songs
  });
  playlist.save(function (err, playlist) {
    if (!err) {
      return res.json(playlist);
    } else {
      return res.send(err);
    }
  });
};
exports.deletePlaylist = function (req, res) {
  var playlistId = req.body._id;
  return Playlist.findByIdAndRemove(playlistId, function (err, playlist) {
    if (err){
      res.send(err);
    }
  })
};

exports.playlist = function(req, res) {

  return Playlist.find({ title: req.query.title }, function(err, playlist) {
    if (!err) {
      return res.json(playlist);
    } else {
      return res.send(err);
    }
  })
};

