import fetchVersions from './fetchVersions'
import parseVersions from './parseVersions'
import semver from 'semver'

const matchVersion = (versions, range) => {
  const matches = versions.reduce((acc, curr) => {
    if (semver.satisfies(curr, range)) {
      return [...acc, curr]
    }
    return acc
  }, [])
  return matches
}

const getPackageVersions = async (module, range) => {
  console.log(module)
  const packageInfo = await fetchVersions(module)
  const versions = parseVersions(packageInfo.versions)
  if (!range) return versions
  return matchVersion(versions, range)
}

export default getPackageVersions
