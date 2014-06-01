'use strict';

angular.module('playlisterApp')
  .controller('PlaylistCtrl', function ($scope, $http, $cookieStore, $location, $routeParams, songSocket) {
    // Socket Listeners
    songSocket.on('songs:updated', function (data) {
      if (data.title === $scope.currentPlaylist.title) {
        $scope.currentPlaylist = data;
      }
    });

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
    // Gets current playlist
    var currentTitle = $routeParams.title;
    $http.get('api/playlist', { params : { title: currentTitle }})
      .success(function(data) {
        // Show playlist info
        $scope.currentPlaylist = data[0];
      })
      .error(function(data) {
        console.log("An error has occurred getting your playlist");
      });

    // Create a new playlist
    $scope.createPlaylist = function(playlistData) {
      playlistData.createdBy = $scope.currentUser.username;
      playlistData.songs = [];
      $http.post('api/playlist', playlistData)
        .success(function(data) {
          // Redirect to playlist page
          $location.path('/playlist/' + data.title);
        })
        .error(function(data) {
          console.log("An error has occurred creating a playlist");
        });
    }

    // Deletes playlist
    $scope.deletePlaylist = function (playlistData, index) {
      $http.delete('api/playlist', { params : { playlistId: playlistData._id }})
        .success(function (data) {
          $scope.playlists.splice(index, 1);
        })
        .error(function (data) {
          console.log("An error occurred deleting the playlist");
        });
    };

    // Updates current playlist
      $scope.updatePlaylist = function (songData, playlistData, operation, index) {
        $scope.isUpdatingPlaylist = true;
        var updateData = {
          songData: songData,
          playlistData: playlistData,
          currentUser: $scope.currentUser,
          operation: operation,
          songIndex: index
        };
        $http.put('api/playlist', updateData)
          .success(function (data) {
            $scope.currentPlaylist = data;
            $scope.isUpdatingPlaylist = false;
            songSocket.emit('songs:updated', $scope.currentPlaylist);
          });
      };
  });
