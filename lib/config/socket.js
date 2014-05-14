var express = require('express'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Playlist = mongoose.model('Playlist')
    playlistCtrl = require('../controllers/playlistCtrl');

module.exports = function (io, app) {

  io.set('log level', 1); // reduce logging
  io.sockets.on('connection', function (socket) {
    //var user = socket.handshake.user;

    playlistCtrl.createPlaylist(socket);
    //chatCtrl.initUser(socket, user);
    //chatCtrl.joinRoom(socket, user);

    //socket.on('message', function(data) {
      //chatCtrl.sendMessage(socket, user, data);
    //});

    //socket.on('disconnect', function onDisconnect() {
      //chatCtrl.leaveRoom(io, socket, user);
    //});
  });
};
