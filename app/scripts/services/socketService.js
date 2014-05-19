'use strict';

angular.module('playlisterApp')
  .factory('songSocket', function (socketFactory) {
    return socketFactory();
  });
