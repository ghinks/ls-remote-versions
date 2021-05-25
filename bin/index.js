#!/usr/bin/env node

import minimist from 'minimist'
const argv = minimist(process.argv.slice(2))
import getPackageVersions from '../src/index.js'
if (argv._.length === 0) {
  console.log('no args given')
  console.log('example express')
  process.exit()
}

getPackageVersions(argv._[0], argv._[1], argv.r)
  .then(versions => {
    versions.mainRegVers.forEach(function (v) {
      console.log(v)
    })
    if (versions && argv.r) {
      if (versions.mainOnly && versions.mainOnly instanceof Array && versions.mainOnly.length > 0) {
        console.log(`${Array(25).join('=')} in main reg only ${Array(25).join('=')}`)
        versions.mainOnly.forEach(v => console.log(v))
      }
      if (versions.altOnly && versions.altOnly instanceof Array && versions.altOnly.length > 0) {
        console.log(`${Array(25).join('=')} in ${argv.r} only ${Array(25).join('=')}`)
        versions.altOnly.forEach(v => console.log(v))
      }
    }
  })
  .catch(err => console.log(err.message))
