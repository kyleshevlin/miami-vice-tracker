import { daysSinceStartOfYear, objectToArray } from '../../src/js/utils'

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

  describe('daysSinceStartOfYear', () => {
    it('should return 1 on Jan 1', () => {
      const result = daysSinceStartOfYear(new Date(2018, 0, 1))

      expect(result).toEqual(1)
    })

    it('should return 365 on Dec 31', () => {
      const result = daysSinceStartOfYear(new Date(2018, 11, 31))

      expect(result).toEqual(365)
    })
  })
})
