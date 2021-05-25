import nock from 'nock'
import getPackageVersion from './index.js'

describe('Get Package Versions', () => {
  const testRegistry = 'https://registry.npmjs.org/'
  const versionsTestRegistry = {
    '1.0.0': {},
    '2.0.0': {},
    '3.0.0': {}
  }
  let testRegMock
  const altRegistry = 'https://altregistry.bigco.com/'
  const versionsAltRegistry = {
    '3.0.0': {},
    '4.0.0': {},
    '5.0.0': {}
  }
  let altRegMock
  beforeEach(() => {
    testRegMock = nock(testRegistry)
      .get(/.*/)
      .reply(200, { versions: versionsTestRegistry })
    altRegMock = nock(altRegistry)
      .get(/.*/)
      .reply(200, { versions: versionsAltRegistry })
  })

  afterEach(() => nock.cleanAll())

  test('Expect to get three versions', async () => {
    expect.assertions(1)
    const { mainRegVers: result } = await getPackageVersion('bluebird')
    expect(result).toEqual(expect.arrayContaining(['1.0.0', '2.0.0', '3.0.0']))
    testRegMock.isDone()
  })

  test('Expect to get one version from regex', async () => {
    expect.assertions(1)
    const { mainRegVers: result } = await getPackageVersion('bluebird', '1.0.0')
    expect(result).toEqual(expect.arrayContaining(['1.0.0']))
    testRegMock.isDone()
  })

  test('Expect to get one versions from single digit', async () => {
    expect.assertions(1)
    const { mainRegVers: result } = await getPackageVersion('bluebird', '1')
    expect(result).toEqual(expect.arrayContaining(['1.0.0']))
    testRegMock.isDone()
  })

  test('Expect to get one versions from range 1.0.0 - 2.0.0', async () => {
    expect.assertions(1)
    const { mainRegVers: result } = await getPackageVersion('bluebird', '1.0.0 - 2.0.0')
    expect(result).toEqual(expect.arrayContaining(['1.0.0']))
    testRegMock.isDone()
  })

  test('Expect to get one versions from range 1.0.0 - 2.0.0', async () => {
    expect.assertions(1)
    const { mainRegVers: result } = await getPackageVersion('bluebird', '1.0.x - 2.0.0')
    expect(result).toEqual(expect.arrayContaining(['1.0.0']))
    testRegMock.isDone()
  })

  test('Expect to get three versions from range 1.x.x - 3.x.x', async () => {
    expect.assertions(1)
    const { mainRegVers: result } = await getPackageVersion('bluebird', '1.x.x - 3.x.x')
    expect(result.length).toBe(3)
    testRegMock.isDone()
  })

  test('Expect to get three versions from range 1 - 3', async () => {
    expect.assertions(1)
    const { mainRegVers: result } = await getPackageVersion('bluebird', '1 - 3')
    expect(result.length).toBe(3)
    testRegMock.isDone()
  })

  test('Expect to get 3,1,2,2 versions in both', async () => {
    expect.assertions(4)
    const { mainRegVers, inBoth, mainOnly, altOnly } =
      await getPackageVersion('bluebird', '1 - 5', altRegistry)
    expect(mainRegVers).toEqual(expect.arrayContaining(['1.0.0', '2.0.0', '3.0.0']))
    expect(inBoth).toEqual(expect.arrayContaining(['3.0.0']))
    expect(mainOnly).toEqual(expect.arrayContaining(['1.0.0', '2.0.0']))
    expect(altOnly).toEqual(expect.arrayContaining(['4.0.0', '5.0.0']))
    altRegMock.isDone()
  })
})
