#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2))
var getPackageVersions = require('../lib/index').default

if (argv._.length === 0) {
  console.log('no args given')
  console.log('example express')
  process.exit()
}

getPackageVersions(argv._[0], argv._[1])
  .then(versions => {
    versions.forEach(function (v) {
      console.log(v)
    })
  })
  .catch(err => console.log(err.message))
