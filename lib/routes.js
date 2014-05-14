'use strict';

var playlist = require('./controllers/playlistCtrl'),
    user = require('./controllers/userCtrl'),
    index = require('./controllers');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.route('/api/users')
    .get(user.users)
    .post(user.createUser);

  app.route('/api/playlists')
    .get(playlist.playlists);

  app.route('/api/playlist')
    .get(playlist.playlist)
    .post(playlist.createPlaylist)
    .delete(playlist.deletePlaylist)
    .put(playlist.updatePlaylist);

  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);
  app.route('/*')
    .get( index.index);
};
