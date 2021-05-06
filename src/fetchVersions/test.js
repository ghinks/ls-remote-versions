import 'regenerator-runtime/runtime.js'
import npa from 'npm-package-arg'
import action from './index'
import nock from 'nock'
import util from 'util'
import fs from 'fs'
import path from 'path'

jest.mock('npm-package-arg')

const pRead = util.promisify(fs.readFile)

describe('fetch versions', () => {
  const testRegistry = 'http://registry.npmjs.org'
  const testModule = 'bluebird'
  let httpMock
  let mockData

  beforeAll(async () => {
    const testJsonStr = await pRead(`${path.dirname(__filename)}/data/bluebird.json`, 'utf8')
    mockData = JSON.parse(testJsonStr)
  })

  beforeEach(() => {
    httpMock = nock(/.*/)
      .get(/.*/)
      .reply(200, mockData)
    npa.mockReturnValue({
      escapedName: testModule
    })
  })

  afterEach(() => {
    nock.cleanAll()
  })

  test('mocking test', async () => {
    expect.assertions(1)
    const result = await action(testModule, testRegistry)
    expect(result).toBeDefined()
    httpMock.isDone()
  })
})
