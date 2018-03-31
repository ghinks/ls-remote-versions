'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _fetchVersions = require('./fetchVersions');

var _fetchVersions2 = _interopRequireDefault(_fetchVersions);

var _parseVersions = require('./parseVersions');

var _parseVersions2 = _interopRequireDefault(_parseVersions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getPackageVersions = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (module, matchText) {
    const packageInfo = yield (0, _fetchVersions2.default)(module);
    const versions = (0, _parseVersions2.default)(packageInfo.versions);
    if (!matchText) return versions;
    const regex = new RegExp(matchText);
    return versions.map(function (v) {
      if (v.match(regex)) return v;
    });
  });

  return function getPackageVersions(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

exports.default = getPackageVersions;