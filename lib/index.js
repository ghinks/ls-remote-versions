"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _registryUrl = _interopRequireDefault(require("registry-url"));

var _fetchVersions = _interopRequireDefault(require("./fetchVersions"));

var _parseVersions = _interopRequireDefault(require("./parseVersions"));

var _semver = _interopRequireDefault(require("semver"));

var _lodash = require("lodash");

var matchVersion = function matchVersion(versions, range) {
  var matches = versions.reduce(function (acc, curr) {
    if (_semver.default.satisfies(curr, range)) {
      return [].concat((0, _toConsumableArray2.default)(acc), [curr]);
    }

    return acc;
  }, []);
  var ordered = matches.sort(_semver.default.compare);
  return ordered;
};

var getVersions = function getVersions(module, range, registry) {
  var packageInfo, versions;
  return _regenerator.default.async(function getVersions$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _regenerator.default.awrap((0, _fetchVersions.default)(module, registry));

        case 2:
          packageInfo = _context.sent;
          versions = (0, _parseVersions.default)(packageInfo.versions);

          if (range) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", versions.sort(_semver.default.compare));

        case 6:
          return _context.abrupt("return", matchVersion(versions, range));

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};

var getPackageVersions = function getPackageVersions(module, range, alternateRegistry) {
  var mainRegVers, altRegVers, inBoth, mainOnly, altOnly;
  return _regenerator.default.async(function getPackageVersions$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _regenerator.default.awrap(getVersions(module, range, (0, _registryUrl.default)()));

        case 2:
          mainRegVers = _context2.sent;

          if (alternateRegistry) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", {
            mainRegVers
          });

        case 5:
          _context2.next = 7;
          return _regenerator.default.awrap(getVersions(module, range, alternateRegistry));

        case 7:
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
          return _context2.abrupt("return", {
            mainRegVers,
            inBoth,
            mainOnly,
            altOnly
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var _default = getPackageVersions;
exports.default = _default;