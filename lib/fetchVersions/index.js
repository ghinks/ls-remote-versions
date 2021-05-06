"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isomorphicFetch = _interopRequireDefault(require("isomorphic-fetch"));

var _npmPackageArg = _interopRequireDefault(require("npm-package-arg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var action = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(packageName, registry) {
    var escapedName, url, options, data, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            escapedName = (0, _npmPackageArg.default)(packageName).escapedName;
            url = `${registry}${escapedName}`;
            options = {
              method: 'get',
              timeout: 20000
            };
            _context.next = 5;
            return (0, _isomorphicFetch.default)(url, options);

          case 5:
            data = _context.sent;
            _context.next = 8;
            return data.json();

          case 8:
            response = _context.sent;
            return _context.abrupt("return", response);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function action(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = action;
exports.default = _default;