'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _npmPackageArg = require('npm-package-arg');

var _npmPackageArg2 = _interopRequireDefault(_npmPackageArg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var action = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(packageName, registry) {
    var escapedName, url, options, data, response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            escapedName = (0, _npmPackageArg2.default)(packageName).escapedName;
            url = `${registry}${escapedName}`;
            options = { method: 'get', timeout: 20000 };
            _context.next = 5;
            return (0, _isomorphicFetch2.default)(url, options);

          case 5:
            data = _context.sent;
            _context.next = 8;
            return data.json();

          case 8:
            response = _context.sent;
            return _context.abrupt('return', response);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function action(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = action;