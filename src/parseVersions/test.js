import parseVersions from './index'

describe('Parse Versions', () => {
  const versions = {
    '1.0.0': {},
    '1.0.1': {},
    '2.0.0': {}
  }
  test('Expect to get 3 versions', () => {
    const result = parseVersions(versions)
    expect(result).toEqual(expect.arrayContaining(['1.0.0', '1.0.1', '2.0.0']))
  })
})
