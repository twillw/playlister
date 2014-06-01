'use strict';

angular.module('playlisterApp')
.controller('PlayerCtrl', function ($scope, $http, $location) {
    var params = { allowScriptAccess: "always" };
    var atts = { id: "myytplayer" };
    swfobject.embedSWF("http://www.youtube.com/apiplayer?enablejsapi=1&version=3",
                       "ytSongPlayer", "355", "200", "8", null, null, params, atts);
  });
