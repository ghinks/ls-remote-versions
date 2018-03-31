#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2))
var getPackageVersions = require('../lib')

if (argv._.length === 0) {
  console.log('no args given')
  console.log('example express')
  process.exit()
}

const versions = getPackageVersions(argv._[0], argv._[1])
console.log(versions)
