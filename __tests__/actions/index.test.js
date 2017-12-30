import * as actions from '../../src/js/actions'
import * as types from '../../src/js/constants/actionTypes'

describe('Actions', () => {
  it('addItem returns a POJO with the right type and item', () => {
    const item = {
      id: '123abc',
      name: 'foo',
      size: '1 meter',
      count: 1
    }
    const expected = { type: types.ADD_ITEM, item }

    expect(actions.addItem(item)).toEqual(expected)
  })
})
