const {assert} = require('chai')
const SQ = require('..')

describe('bool', () => {
  it('default undefined', () => {
    const sq = new SQ()
    sq.use((key, status) => {
      if (key === 'key1') {
        status = 1
      }
      return status
    })
    assert.equal(sq.get('key1'), 1)
    assert.equal(sq.get('nonExistKey'), undefined)
  })
  it('set default true', () => {
    const sq = new SQ(true)
    sq.use((key, status) => {
      if (key === 'key1') {
        status = false
      }
      return status
    })
    assert.equal(sq.get('key1'), false)
    assert.equal(sq.get('nonExistKey'), true)
  })
  it('get last status', () => {
    const sq = new SQ()
    sq.use((key, status) => {
      if (key === 'key1') {
        status = true
      }
      return status
    })
    sq.use((key, status) => {
      if (key === 'key1') {
        assert.equal(status, true)
        status = false
      }
      return status
    })
    assert.equal(sq.get('key1'), false)
    assert.equal(sq.get('nonExistKey'), undefined)
  })
  it('props', () => {
    const sq = new SQ()
    sq.bind({a: 1, b: 2})
    sq.use((key, status) => {
      const props = this.props
      assert.deepEqual(props, {a: 1, b: 2})
      return status
    })
  })
})
