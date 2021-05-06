"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _registryUrl = _interopRequireDefault(require("registry-url"));

var _fetchVersions = _interopRequireDefault(require("./fetchVersions"));

var _parseVersions = _interopRequireDefault(require("./parseVersions"));

var _semver = _interopRequireDefault(require("semver"));

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var matchVersion = function matchVersion(versions, range) {
  var matches = versions.reduce(function (acc, curr) {
    if (_semver.default.satisfies(curr, range)) {
      return [].concat(_toConsumableArray(acc), [curr]);
    }

    return acc;
  }, []);
  var ordered = matches.sort(_semver.default.compare);
  return ordered;
};

var getVersions = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(module, range, registry) {
    var packageInfo, versions;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _fetchVersions.default)(module, registry);

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
    }, _callee);
  }));

  return function getVersions(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getPackageVersions = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(module, range, alternateRegistry) {
    var mainRegVers, altRegVers, inBoth, mainOnly, altOnly;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getVersions(module, range, (0, _registryUrl.default)());

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
            return getVersions(module, range, alternateRegistry);

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
    }, _callee2);
  }));

  return function getPackageVersions(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = getPackageVersions;
exports.default = _default;