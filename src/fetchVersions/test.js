import action from './index'
import nock from 'nock'
import util from 'util'
import fs from 'fs'

const pRead = util.promisify(fs.readFile)

describe('fetch versions', () => {
  const testRegistry = 'http://registry.npmjs.org'
  const testModule = 'bluebird'
  let httpMock
  let mockData

  beforeAll(async () => {
    const testJsonStr = await pRead(new URL('./data/bluebird.json', import.meta.url), 'utf8')
    mockData = JSON.parse(testJsonStr)
  })
  beforeEach(() => {
    httpMock = nock(/.*/)
      .get(/.*/)
      .reply(200, mockData)
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
