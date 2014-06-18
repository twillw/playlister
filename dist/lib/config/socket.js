var express = require('express'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Playlist = mongoose.model('Playlist'),
    playlistCtrl = require('../controllers/playlistCtrl');

module.exports = function (io, app) {

  io.sockets.on('connection', function (socket) {
    var user = socket.handshake.user;
    console.log("??? SOCKET CONNECTED");

    socket.on('songs:updated', function (data) {
      socket.broadcast.emit('songs:updated', data);
    });
  });
};
