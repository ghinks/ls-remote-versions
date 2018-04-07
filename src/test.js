import getPackageVersion from './index'

describe('Get Package Versions', () => {
  beforeAll(() => {
    getPackageVersion.__Rewire__('fetchVersions', () =>
      Promise.resolve({
        versions: {
          '1.0.0': {},
          '2.0.0': {},
          '3.0.0': {}
        }
      }))
  })

  afterAll(() => __rewire_reset_all__())

  test('Expect to get three versions', async () => {
    expect.assertions(1)
    const result = await getPackageVersion('bluebird')
    expect(result).toEqual(expect.arrayContaining(['1.0.0', '2.0.0', '3.0.0']))
  })

  test('Expect to get one version from regex', async () => {
    expect.assertions(1)
    const result = await getPackageVersion('bluebird', '1.0.0')
    expect(result).toEqual(expect.arrayContaining(['1.0.0']))
  })

  test('Expect to get one versions from single digit', async () => {
    expect.assertions(1)
    const result = await getPackageVersion('bluebird', '1')
    expect(result).toEqual(expect.arrayContaining(['1.0.0']))
  })

  test('Expect to get one versions from range 1.0.0 - 2.0.0', async () => {
    expect.assertions(1)
    const result = await getPackageVersion('bluebird', '1.0.0 - 2.0.0')
    expect(result).toEqual(expect.arrayContaining(['1.0.0']))
  })

  test('Expect to get one versions from range 1.0.0 - 2.0.0', async () => {
    expect.assertions(1)
    const result = await getPackageVersion('bluebird', '1.0.x - 2.0.0')
    expect(result).toEqual(expect.arrayContaining(['1.0.0']))
  })

  test('Expect to get three versions from range 1.x.x - 3.x.x', async () => {
    expect.assertions(1)
    const result = await getPackageVersion('bluebird', '1.x.x - 3.x.x')
    expect(result.length).toBe(3)
  })

  test('Expect to get three versions from range 1 - 3', async () => {
    expect.assertions(1)
    const result = await getPackageVersion('bluebird', '1 - 3')
    expect(result.length).toBe(3)
  })
})
