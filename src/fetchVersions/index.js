import request from 'request-promise'
import npa from 'npm-package-arg'

const action = async (packageName, registry) => {
  const escapedName = npa(packageName).escapedName
  const url = `${registry}${escapedName}`
  const response = await request(url)
  return response
}

export default action
