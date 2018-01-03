import { objectToArray } from '../../src/js/utils'

describe('Utils', () => {
  describe('objectToArray', () => {
    it('should return an empty array by default', () => {
      expect(objectToArray()).toEqual([])
    })

    it('should return an empty array when given null argument', () => {
      expect(objectToArray(null)).toEqual([])
    })

    it('should return an array created from an objects keys', () => {
      const obj = {
        foo: 'bar',
        baz: 'quux'
      }
      const expected = ['bar', 'quux']

      expect(objectToArray(obj)).toEqual(expected)
    })
  })
})
