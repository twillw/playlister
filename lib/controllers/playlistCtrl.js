var mongoose = require('mongoose'),
    moment = require('moment'),
    Playlist = mongoose.model('Playlist'),
    User = mongoose.model('User'),
    apikey = 'AIzaSyBg40YpjyCmSLDJLhwY57WUbH8RjITh9OU',
    request = require('request'),
    socket = require('socket.io');

exports.playlists = function(req, res) {
  return Playlist.find(function (err, playlists) {
    if (!err) {
      return res.json(playlists);
    } else {
      return res.send(err);
    }
  });
};

exports.createPlaylist = function(req, res) {
  var data = req.body;
  var date = moment();
  var playlist = new Playlist({
    title: data.title,
    createdBy: data.createdBy,
    date: date,
    songs: data.songs
  });
  playlist.save(function (err, playlist) {
    if (!err) {
      return res.json(playlist);
    } else {
      return res.send(err);
    }
  });
};
exports.deletePlaylist = function (req, res) {
  var playlistId = req.query.playlistId;
  console.log(playlistId);
  return Playlist.findByIdAndRemove(playlistId, function (err, playlist) {
    if (err){
      res.send(err);
    } else {
      res.send(playlist);
    }
  })
};
exports.updatePlaylist = function (req, res) {
  if (req.body.operation === 'delete') {
    Playlist.findById(req.body.playlistData._id, function (err, currentPlaylist) {
      if (!err) {
        currentPlaylist.songs.splice(req.body.songIndex, 1);
        currentPlaylist.save(function (err, playlist) {
          if (!err) {
            res.json(playlist);
          } else {
            res.send(err);
          }
        });
      } else {
        res.send(err);
      }
    });
  } else {
    var songUrl = req.body.songData;
    var songIdArr = songUrl.split(':');
    var youtubeId = songIdArr[3];
    var url = 'https://www.googleapis.com/youtube/v3/videos?id=' + youtubeId + '&key=' + apikey + '&fields=items(id,snippet(channelId,title,categoryId),statistics)&part=snippet,statistics';
    var date = moment();
    request(url, function (error, response, body) {
      User.findById(req.body.currentUser._id, function (err, currentUser) {
        if (err){
          res.send(err);
        } else {
          body = JSON.parse(body);
          var song = {
            songName: body.items[0].snippet.title,
            songUrl: songUrl,
            addedBy: currentUser.username,
            addedDate: date
          };
          Playlist.findById(req.body.playlistData._id, function (err, currentPlaylist) {
            if (!err){
              currentPlaylist.songs.push(song);
              currentPlaylist.save(function (err, playlist) {
                if (!err) {
                  return res.json(playlist);
                } else {
                  return res.send(err);
                }
              });
            } else {
              return res.send(err);
            }
          });
        }
      });
    });
  }
};

exports.playlist = function(req, res) {
  return Playlist.find({ title: req.query.title }, function(err, playlist) {
    if (!err) {
      return res.json(playlist);
    } else {
      return res.send(err);
    }
  })
};

