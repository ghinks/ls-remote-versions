'use strict'

const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

const _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'))

const _asyncToGenerator2 = _interopRequireDefault(require('@babel/runtime/helpers/asyncToGenerator'))

const _toConsumableArray2 = _interopRequireDefault(require('@babel/runtime/helpers/toConsumableArray'))

const _registryUrl = _interopRequireDefault(require('registry-url'))

const _fetchVersions = _interopRequireDefault(require('./fetchVersions'))

const _parseVersions = _interopRequireDefault(require('./parseVersions'))

const _semver = _interopRequireDefault(require('semver'))

const _lodash = require('lodash')

const matchVersion = function matchVersion (versions, range) {
  const matches = versions.reduce(function (acc, curr) {
    if (_semver.default.satisfies(curr, range)) {
      return [].concat((0, _toConsumableArray2.default)(acc), [curr])
    }

    return acc
  }, [])
  const ordered = matches.sort(_semver.default.compare)
  return ordered
}

const getVersions = /* #__PURE__ */(function () {
  const _ref = (0, _asyncToGenerator2.default)(/* #__PURE__ */_regenerator.default.mark(function _callee (module, range, registry) {
    let packageInfo, versions
    return _regenerator.default.wrap(function _callee$ (_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2
            return (0, _fetchVersions.default)(module, registry)

          case 2:
            packageInfo = _context.sent
            versions = (0, _parseVersions.default)(packageInfo.versions)

            if (range) {
              _context.next = 6
              break
            }

            return _context.abrupt('return', versions.sort(_semver.default.compare))

          case 6:
            return _context.abrupt('return', matchVersion(versions, range))

          case 7:
          case 'end':
            return _context.stop()
        }
      }
    }, _callee)
  }))

  return function getVersions (_x, _x2, _x3) {
    return _ref.apply(this, arguments)
  }
}())

const getPackageVersions = /* #__PURE__ */(function () {
  const _ref2 = (0, _asyncToGenerator2.default)(/* #__PURE__ */_regenerator.default.mark(function _callee2 (module, range, alternateRegistry) {
    let mainRegVers, altRegVers, inBoth, mainOnly, altOnly
    return _regenerator.default.wrap(function _callee2$ (_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2
            return getVersions(module, range, (0, _registryUrl.default)())

          case 2:
            mainRegVers = _context2.sent

            if (alternateRegistry) {
              _context2.next = 5
              break
            }

            return _context2.abrupt('return', {
              mainRegVers
            })

          case 5:
            _context2.next = 7
            return getVersions(module, range, alternateRegistry)

          case 7:
            altRegVers = _context2.sent
            inBoth = (0, _lodash.intersection)(mainRegVers, altRegVers)
            mainOnly = mainRegVers.reduce(function (acc, cur) {
              if (!inBoth.includes(cur)) acc.push(cur)
              return acc
            }, [])
            altOnly = altRegVers.reduce(function (acc, cur) {
              if (!inBoth.includes(cur)) acc.push(cur)
              return acc
            }, [])
            return _context2.abrupt('return', {
              mainRegVers,
              inBoth,
              mainOnly,
              altOnly
            })

          case 12:
          case 'end':
            return _context2.stop()
        }
      }
    }, _callee2)
  }))

  return function getPackageVersions (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments)
  }
}())

const _default = getPackageVersions
exports.default = _default
