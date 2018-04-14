import action, {__RewireAPI__ as actionRewireAPI} from './index'
import nock from 'nock'
import util from 'util'
import fs from 'fs'
import path from 'path'

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

  const mockNpa = () => ({
    escapedName: testModule
  })

  beforeEach(() => {
    httpMock = nock(/.*/)
      .get(/.*/)
      .reply(200, mockData)

    actionRewireAPI.__Rewire__('npa', mockNpa)
  })

  afterEach(() => {
    nock.cleanAll()
    __rewire_reset_all__()
  })

  test('mocking test', async () => {
    expect.assertions(1)
    const result = await action(testModule, testRegistry)
    expect(result).toBeDefined()
    httpMock.isDone()
  })
})
