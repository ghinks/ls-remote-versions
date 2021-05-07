import "regenerator-runtime/runtime.js";
import fetch from 'isomorphic-fetch'
import npa from 'npm-package-arg'

const action = async (packageName, registry) => {
  const escapedName = npa(packageName).escapedName
  const url = `${registry}${escapedName}`
  const options = { method: 'get', timeout: 20000 }
  const data = await fetch(url, options)
  const response = await data.json()
  return response
}

export default action
