"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pg = require("pg");

var _dotenv = require("dotenv");

(0, _dotenv.config)();
var pool = new _pg.Pool({
  connectionString: process.env.DATABASE_URL
});
var _default = {
  query: function query(_query, params) {
    return new Promise(function (resolve, reject) {
      pool.query(_query, params).then(function (result) {
        return resolve(result);
      }).catch(function (error) {
        return reject(error);
      });
    });
  }
};
exports.default = _default;
//# sourceMappingURL=index.js.map