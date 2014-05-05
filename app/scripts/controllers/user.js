'use strict';

angular.module('playlisterApp')
  .controller('UserCtrl', function ($scope, $http, $cookieStore, $location) {
    // Create a new User
    $scope.createUser = function (userData) {
      $http.post('/api/users', userData)
        .success(function(data, status, headers, config) {
          $cookieStore.put('currentUser', data);
          $location.path('/playlists');
        })
        .error(function(data, status, headers, config) {
          console.log("An error occurred saving the user");
        })
    };
  });
