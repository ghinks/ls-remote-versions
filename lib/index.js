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

var _registryUrl = require('registry-url');

var _registryUrl2 = _interopRequireDefault(_registryUrl);

var _fetchVersions = require('./fetchVersions');

var _fetchVersions2 = _interopRequireDefault(_fetchVersions);

var _parseVersions = require('./parseVersions');

var _parseVersions2 = _interopRequireDefault(_parseVersions);

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matchVersion = function matchVersion(versions, range) {
  var matches = versions.reduce(function (acc, curr) {
    if (_semver2.default.satisfies(curr, range)) {
      return [].concat((0, _toConsumableArray3.default)(acc), [curr]);
    }
    return acc;
  }, []);
  var ordered = matches.sort(_semver2.default.compare);
  return ordered;
};

var getVersions = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(module, range, registry) {
    var packageInfo, versions;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _fetchVersions2.default)(module, registry);

          case 2:
            packageInfo = _context.sent;
            versions = (0, _parseVersions2.default)(packageInfo.versions);

            if (range) {
              _context.next = 6;
              break;
            }

            return _context.abrupt('return', versions);

          case 6:
            return _context.abrupt('return', matchVersion(versions, range));

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getVersions(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getPackageVersions = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(module, range, alternateRegistry) {
    var mainRegVers, altRegVers, inBoth, mainOnly, altOnly;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log(`${module}, ${range}, ${(0, _registryUrl2.default)()}, ${alternateRegistry}`);
            _context2.next = 3;
            return getVersions(module, range, (0, _registryUrl2.default)());

          case 3:
            mainRegVers = _context2.sent;

            if (alternateRegistry) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt('return', {
              mainRegVers
            });

          case 6:
            _context2.next = 8;
            return getVersions(module, range, alternateRegistry);

          case 8:
            altRegVers = _context2.sent;
            inBoth = (0, _lodash.intersection)(mainRegVers, altRegVers);
            mainOnly = mainRegVers.reduce(function (acc, cur) {
              if (!inBoth.includes(cur)) acc.push(cur);
              return acc;
            }, []);
            altOnly = altRegVers.reduce(function (acc, cur) {
              if (!inBoth.includes(cur)) acc.push(cur);
              return acc;
            }, []);
            return _context2.abrupt('return', {
              mainRegVers,
              inBoth,
              mainOnly,
              altOnly
            });

          case 13:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getPackageVersions(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = getPackageVersions;