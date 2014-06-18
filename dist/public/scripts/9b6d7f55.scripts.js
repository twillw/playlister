"use strict";angular.module("playlisterApp",["ngCookies","ngResource","ngSanitize","ngRoute","btford.socket-io"]).config(["$routeProvider","$locationProvider",function(a,b){a.when("/",{templateUrl:"partials/main",controller:"MainCtrl"}).when("/playlists",{templateUrl:"partials/playlists",controller:"PlaylistCtrl"}).when("/playlist/:title",{templateUrl:"partials/playlist",controller:"PlaylistCtrl"}).otherwise({redirectTo:"/"}),b.html5Mode(!0)}]),angular.module("playlisterApp").filter("formatTime",function(){return function(a){if("undefined"!=typeof a){var b=a.split("T"),c=b[1].split("."),d=b[0]+" at "+c[0];return d}}}),angular.module("playlisterApp").directive("song-picker",function(){}),angular.module("playlisterApp").factory("songSocket",["socketFactory",function(a){return a()}]),angular.module("playlisterApp").controller("MainCtrl",["$scope","$http",function(){}]),angular.module("playlisterApp").controller("PlayerCtrl",["$scope","$window",function(a,b){var c={allowScriptAccess:"always"},d={id:"ytSongPlayer"};a.currentPlayer={},swfobject.embedSWF("http://www.youtube.com/apiplayer?enablejsapi=1&version=3","ytSongPlayer","355","200","8",null,null,c,d),a.initPlayer=function(b){var c=a.currentPlaylist.songs;console.log(c[b].songId),console.log(a.videoEl),a.videoEl.loadVideoById(c[b].songId)},b.onYouTubePlayerReady=function(){a.videoEl=document.getElementById("ytSongPlayer"),a.initPlayer(0)},a.currentPlayer.play=function(){a.videoEl.playVideo()},a.currentPlayer.pause=function(){a.videoEl.pauseVideo()}}]),angular.module("playlisterApp").controller("SongSearchCtrl",["$scope","$http","$location",function(a,b){a.searchSong=function(c){var d=c.split(" ").join("+"),e={q:d,orderby:"relevance","start-index":"1","max-results":"15",format:"5",v:"2",alt:"json"};b.get("https://gdata.youtube.com/feeds/api/videos?",{params:e}).success(function(b){console.log(b),a.searchResults=b.feed.entry}).error(function(){console.log("An error has occurred getting your playlist")})}}]),angular.module("playlisterApp").controller("NavbarCtrl",["$scope","$location",function(a,b){a.menu=[{title:"Home",link:"/"}],a.isActive=function(a){return a===b.path()}}]),angular.module("playlisterApp").controller("UserCtrl",["$scope","$http","$cookieStore","$location",function(a,b,c,d){a.createUser=function(a){b.post("/api/users",a).success(function(a){c.put("currentUser",a),d.path("/playlists")}).error(function(){console.log("An error occurred saving the user")})}}]),angular.module("playlisterApp").controller("PlaylistCtrl",["$scope","$http","$cookieStore","$location","$routeParams","songSocket",function(a,b,c,d,e,f){f.on("songs:updated",function(b){b.title===a.currentPlaylist.title&&(a.currentPlaylist=b)}),"undefined"!=typeof c.get("currentUser")&&(a.currentUser=c.get("currentUser")),b.get("/api/playlists").success(function(b){a.playlists=b}).error(function(){console.log("An error occurred getting the playlists")});var g=e.title;b.get("api/playlist",{params:{title:g}}).success(function(b){a.currentPlaylist=b[0]}).error(function(){console.log("An error has occurred getting your playlist")}),a.createPlaylist=function(c){c.createdBy=a.currentUser.username,c.songs=[],b.post("api/playlist",c).success(function(a){d.path("/playlist/"+a.title)}).error(function(){console.log("An error has occurred creating a playlist")})},a.deletePlaylist=function(c,d){b.delete("api/playlist",{params:{playlistId:c._id}}).success(function(){a.playlists.splice(d,1)}).error(function(){console.log("An error occurred deleting the playlist")})},a.updatePlaylist=function(c,d,e,g){a.isUpdatingPlaylist=!0;var h={songData:c,playlistData:d,currentUser:a.currentUser,operation:e,songIndex:g};b.put("api/playlist",h).success(function(b){a.currentPlaylist=b,a.isUpdatingPlaylist=!1,f.emit("songs:updated",a.currentPlaylist)})}}]);