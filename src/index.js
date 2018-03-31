import fetchVersions from './fetchVersions'
import parseVersions from './parseVersions'

const getPackageVersions = async (module, matchText) => {
  console.log(module)
  const packageInfo = await fetchVersions(module)
  const versions = parseVersions(packageInfo.versions)
  if (!matchText) return versions
  const regex = new RegExp(matchText)
  const matches = versions.reduce((acc, cur) => {
    if (cur.match(regex)) {
      acc.push(cur)
    }
    return acc
  }, [])
  return matches
}

export default getPackageVersions
