var express = require('express'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Playlist = mongoose.model('Playlist')
    playlistCtrl = require('../controllers/playlistCtrl');

module.exports = function (io, app) {

  io.set('log level', 1); // reduce logging
  io.sockets.on('connection', function (socket) {
    var user = socket.handshake.user;

    socket.on('songs:updated', function (data) {
      socket.broadcast.emit('songs:updated', data)
    });
  });
};
