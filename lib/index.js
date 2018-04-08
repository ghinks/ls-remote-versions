'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _fetchVersions = require('./fetchVersions');

var _fetchVersions2 = _interopRequireDefault(_fetchVersions);

var _parseVersions = require('./parseVersions');

var _parseVersions2 = _interopRequireDefault(_parseVersions);

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matchVersion = function matchVersion(versions, range) {
  var matches = versions.reduce(function (acc, curr) {
    if (_semver2.default.satisfies(curr, range)) {
      return [].concat((0, _toConsumableArray3.default)(acc), [curr]);
    }
    return acc;
  }, []);
  return matches;
};

var getPackageVersions = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(module, range) {
    var packageInfo, versions;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(module);
            _context.next = 3;
            return (0, _fetchVersions2.default)(module);

          case 3:
            packageInfo = _context.sent;
            versions = (0, _parseVersions2.default)(packageInfo.versions);

            if (range) {
              _context.next = 7;
              break;
            }

            return _context.abrupt('return', versions);

          case 7:
            return _context.abrupt('return', matchVersion(versions, range));

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getPackageVersions(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = getPackageVersions;