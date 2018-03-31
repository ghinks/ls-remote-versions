import fetch from 'isomorphic-fetch'
import registryUrl from 'registry-url'
import npa from 'npm-package-arg'

const action = async (packageName) => {
  const escapedName = npa(packageName).escapedName
  const registry = registryUrl()
  const url = `${registry}${escapedName}`
  const options = { method: 'get', timeout: 20000 }
  const data = await fetch(url, options)
  const response = await data.json()
  return response
}

export default action
