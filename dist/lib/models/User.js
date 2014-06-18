'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
/**
 * User Schema
 */
var UserSchema = new Schema({
  username: String
});

mongoose.model('User', UserSchema);
