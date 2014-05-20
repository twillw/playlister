'use strict';

angular.module('playlisterApp')
  .filter('formatTime', function () {
    return function (input) {
      if (typeof input !== 'undefined' ) {
        var separatedDateTime = input.split("T");
        var separatedTime = separatedDateTime[1].split('.');
        var time =  separatedDateTime[0] + ' at ' + separatedTime[0];
        return time;
      }
    }
  });
