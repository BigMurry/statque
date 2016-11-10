const {assert} = require('chai')
const SQ = require('..')

describe('object', () => {
  it('set default obj', () => {
    const sq = new SQ({a: 1, b: {bb: 2}})
    sq.use((key, status) => {
      if (key === 'key1') {
        status = {aa: 2}
      }
      return status
    })
    assert.deepEqual(sq.get('key1'), {aa: 2})
    assert.deepEqual(sq.get('nonExistKey'), {a: 1, b: {bb: 2}})
  })
  it('single use set multi obj', () => {
    const sq = new SQ()
    sq.use((key, status) => {
      switch (key) {
        case 'key1':
          status = {a: 1}
          break
        case 'key2':
          status = {b: 2}
      }
      return status
    })
    assert.deepEqual(sq.get('key1'), {a: 1})
    assert.deepEqual(sq.get('key2'), {b: 2})
    assert.equal(sq.get('nonExistKey'), undefined)
  })
})
