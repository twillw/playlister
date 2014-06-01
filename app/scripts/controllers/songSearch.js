'use strict';

angular.module('playlisterApp')
  .controller('SongSearchCtrl', function ($scope, $http, $location) {
    $scope.searchSong = function (songQuery) {
      var songQueryEncoded = songQuery.split(' ').join('+');
      var youtubeQueryParams = {
        'q': songQueryEncoded,
        'orderby': 'relevance',
        'start-index': '1',
        'max-results': '15',
        'format': '5',
        'v': '2',
        'alt': 'json'
      };
      $http.get('https://gdata.youtube.com/feeds/api/videos?', { params : youtubeQueryParams })
        .success(function(data) {
          console.log(data);
          $scope.searchResults = data.feed.entry;
        })
        .error(function(data) {
          console.log("An error has occurred getting your playlist");
        });
    };
  });
