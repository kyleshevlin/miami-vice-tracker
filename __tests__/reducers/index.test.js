import reducer, { initialState } from '../../src/js/reducers'
import * as actions from '../../src/js/actions'

describe('Reducer', () => {
  it('returns state when action is unaccounted for', () => {
    expect(
      reducer(initialState, { type: 'UNACCOUNTED_ACTION' })
    ).toEqual(initialState)
  })

  it('ADD_ITEM adds an item to the end of the list', () => {
    const state = { ...initialState, foo: 'bar' }
    const item = {
      id: '123abc',
      name: 'baz',
      size: '1 meter',
      count: 1
    }
    const action = actions.addItem(item)
    const expected = {
      ...state,
      items: [...state.items, item]
    }

    expect(reducer(state, action)).toEqual(expected)
  })

  it('EDIT_ITEM edits the correct item with the correct update', () => {
    const state = {
      items: [
        { id: '123abc', name: 'foo' },
        { id: '456def', name: 'bar' },
        { id: '789ghi', name: 'baz' }
      ]
    }
    const update = { name: 'quux' }
    const action = actions.editItem('456def', update)
    const expected = {
      ...state,
      items: [
        state.items[0],
        { ...state.items[1], ...update },
        state.items[2]
      ]
    }

    expect(reducer(state, action)).toEqual(expected)
  })

  it('DELETE_ITEM deletes the correct item from the store', () => {
    const state = {
      items: [
        { id: '123abc', name: 'foo' },
        { id: '456def', name: 'bar' },
        { id: '789ghi', name: 'baz' }
      ]
    }
    const action = actions.deleteItem('456def')
    const expected = {
      ...state,
      items: [state.items[0], state.items[2]]
    }

    expect(reducer(state, action)).toEqual(expected)
  })
})
