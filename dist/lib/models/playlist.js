'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PlaylistSchema = new Schema({
  title: String,
  createdBy: String,
  date: { type: Date, default: Date.now },
  songs: [{
    songName: String,
    songUrl: String,
    songId: String,
    addedBy: String,
    addedDate: { type: Date, default: Date.now }
  }]
});

mongoose.model('Playlist', PlaylistSchema);
