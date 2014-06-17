'use strict';

angular.module('playlisterApp')
.controller('PlayerCtrl', function ($scope, $window) {
    var params = { allowScriptAccess: "always" };
    var atts = { id: "ytSongPlayer" };
    $scope.currentPlayer = {};
    swfobject.embedSWF("http://www.youtube.com/apiplayer?enablejsapi=1&version=3",
                       "ytSongPlayer", "355", "200", "8", null, null, params, atts);
    $scope.initPlayer = function (currentSong) {
      var songs  = $scope.currentPlaylist.songs;
      console.log(songs[currentSong]['songId']);
      console.log($scope.videoEl);
      $scope.videoEl.loadVideoById(songs[currentSong]['songId']);
    };
    $window.onYouTubePlayerReady = function() {
      $scope.videoEl = document.getElementById('ytSongPlayer');
      $scope.initPlayer(0);
    };
    $scope.currentPlayer.play = function () {
      $scope.videoEl.playVideo();
    };
    $scope.currentPlayer.pause = function () {
      $scope.videoEl.pauseVideo();
    };
  });
