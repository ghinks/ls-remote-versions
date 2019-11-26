"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _isomorphicFetch = _interopRequireDefault(require("isomorphic-fetch"));

var _npmPackageArg = _interopRequireDefault(require("npm-package-arg"));

var action = function action(packageName, registry) {
  var escapedName, url, options, data, response;
  return _regenerator.default.async(function action$(_context) {
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
          return _regenerator.default.awrap((0, _isomorphicFetch.default)(url, options));

        case 5:
          data = _context.sent;
          _context.next = 8;
          return _regenerator.default.awrap(data.json());

        case 8:
          response = _context.sent;
          return _context.abrupt("return", response);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
};

var _default = action;
exports.default = _default;