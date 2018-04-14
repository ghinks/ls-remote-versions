import registryUrl from 'registry-url'
import fetchVersions from './fetchVersions'
import parseVersions from './parseVersions'
import semver from 'semver'
import { intersection } from 'lodash'

const matchVersion = (versions, range) => {
  const matches = versions.reduce((acc, curr) => {
    if (semver.satisfies(curr, range)) {
      return [...acc, curr]
    }
    return acc
  }, [])
  const ordered = matches.sort(semver.compare)
  return ordered
}

const getVersions = async (module, range, registry) => {
  const packageInfo = await fetchVersions(module, registry)
  const versions = parseVersions(packageInfo.versions)
  if (!range) return versions
  return matchVersion(versions, range)
}

const getPackageVersions = async (module, range, alternateRegistry) => {
  console.log(`${module}, ${range}, ${registryUrl()}, ${alternateRegistry}`)
  const mainRegVers = await getVersions(module, range, registryUrl())
  if (!alternateRegistry) {
    return {
      mainRegVers
    }
  }
  const altRegVers = await getVersions(module, range, alternateRegistry)
  const inBoth = intersection(mainRegVers, altRegVers)
  const mainOnly = mainRegVers.reduce((acc, cur) => {
    if (!inBoth.includes(cur)) acc.push(cur)
    return acc
  }, [])
  const altOnly = altRegVers.reduce((acc, cur) => {
    if (!inBoth.includes(cur)) acc.push(cur)
    return acc
  }, [])
  return {
    mainRegVers,
    inBoth,
    mainOnly,
    altOnly
  }
}

export default getPackageVersions
