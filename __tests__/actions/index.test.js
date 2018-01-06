import * as actions from '../../src/js/actions'

describe('Actions', () => {
  it('addItem returns a POJO with the right type and item', () => {
    const item = {
      id: '123abc',
      name: 'foo',
      size: '1 meter',
      count: 1
    }
    const expected = { type: 'ADD_ITEM', item }

    expect(actions.addItem(item)).toEqual(expected)
  })

  it('editItem returns a POJO with the right type and update', () => {
    const id = '123abc'
    const update = { count: 4 }
    const expected = { type: 'EDIT_ITEM', id, update }

    expect(actions.editItem(id, update)).toEqual(expected)
  })

  it('deleteItem returns a POJO with the correct type and id', () => {
    const id = '123abc'
    const expected = { type: 'DELETE_ITEM', id }

    expect(actions.deleteItem(id)).toEqual(expected)
  })

  it('updateCurrencySymbol returns a POJO with the correct type and character', () => {
    const symbol = '£'
    const expected = { type: 'UPDATE_CURRENCY_SYMBOL', symbol }

    expect(actions.updateCurrencySymbol(symbol)).toEqual(expected)
  })
})
