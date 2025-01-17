"use strict";

var debug = require("debug")("keti");
var mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

exports.isValidationError = function (err) {
  return err && err.message && /ValidationError/.test(err.message);
};

exports.isDuplicateKeyError = function (err) {
  return err && err.message && /duplicate key/.test(err.message);
};

exports.connect = function (config, cb) {
  var url =
    "mongodb://" +
    config.mongo.host +
    ":" +
    config.mongo.port +
    "/" +
    config.mongo.database;
  var options = {
    user: config.mongo.user,
    pass: config.mongo.password,
    useMongoClient: true,
  };

  cb =
    cb ||
    function (err) {
      if (err) {
        debug("database connection failure: \n" + err.stack);
        process.exit(1);
      }
    };

  mongoose.connect(url, options, cb);
};
