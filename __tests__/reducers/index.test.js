import reducer, { initialState } from '../../src/js/reducers'
import * as actions from '../../src/js/actions'

describe('Reducer', () => {
  it('returns state when action is unaccounted for', () => {
    expect(
      reducer(initialState, { type: 'UNACCOUNTED_ACTION' })
    ).toEqual(initialState)
  })

  it('ADD_ITEM, well, adds an item', () => {
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
})
