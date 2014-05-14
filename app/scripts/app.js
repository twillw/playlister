'use strict';

angular.module('playlisterApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'btford.socket-io'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .when('/playlists', {
        templateUrl: 'partials/playlists',
        controller: 'PlaylistCtrl'
      })
      .when('/playlist/:title', {
        templateUrl: 'partials/playlist',
        controller: 'PlaylistCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
  });
