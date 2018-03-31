'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
import registryUrl from 'registry-url'
import npa from 'npm-package-arg'
*/

const registryUrl = () => null;
const npa = () => null;

const action = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (packageName) {
    const escapedName = npa(packageName).escapedName;
    const registry = registryUrl();
    const url = `${registry}${escapedName}`;
    const options = { method: 'get', timeout: 20000 };
    const data = yield (0, _isomorphicFetch2.default)(url, options);
    const response = yield data.json();
    return response;
  });

  return function action(_x) {
    return _ref.apply(this, arguments);
  };
})();

exports.default = action;