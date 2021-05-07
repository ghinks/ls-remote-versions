function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import 'regenerator-runtime/runtime.js';
import fetch from 'isomorphic-fetch';
import npa from 'npm-package-arg';

var action = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(packageName, registry) {
    var escapedName, url, options, data, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            escapedName = npa(packageName).escapedName;
            url = "".concat(registry).concat(escapedName);
            options = {
              method: 'get',
              timeout: 20000
            };
            _context.next = 5;
            return fetch(url, options);

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

export default action;