'use strict';

angular.module('playlisterApp')
  .controller('PlaylistCtrl', function ($scope, $http, $cookieStore, $location, $routeParams) {
    // Set user if current user exists
    if (typeof $cookieStore.get('currentUser') !== 'undefined') {
      $scope.currentUser = $cookieStore.get('currentUser');
    }

    // Get all playlists
    $http.get('/api/playlists')
      .success(function(data) {
        $scope.playlists = data;
      })
      .error(function(data) {
        console.log("An error occurred getting the playlists");
      });

    // Create a new playlist
    $scope.createPlaylist = function(playlistData) {
      playlistData.createdBy = $scope.currentUser.username;
      playlistData.songs = [];
      $http.post('api/playlists', playlistData)
        .success(function(data) {
          // Redirect to playlist page
          $location.path('/playlist' + data.title);
        })
        .error(function(data) {
          console.log("An error has occurred creating a playlist");
        });
    }

    // Gets current playlist
    $http.get('api/playlist', $routeParams.title)
      .success(function(data) {
        // Show playlist info
        $scope.currentPlaylist = data;
      })
      .error(function(data) {
        console.log("An error has occurred getting your playlist");
      });

    // Updates current playlist
      $scope.updatePlaylist = function (playlistData) {
      };
  });
