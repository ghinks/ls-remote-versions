import fetchVersions from './fetchVersions'
import parseVersions from './parseVersions'

const getPackageVersions = async (module, matchText) => {
  const packageInfo = await fetchVersions(module)
  const versions = parseVersions(packageInfo.versions)
  if (!matchText) return versions
  const regex = new RegExp(matchText)
  return versions.map(v => {
    if (v.match(regex)) return v
  })
}

export default getPackageVersions
