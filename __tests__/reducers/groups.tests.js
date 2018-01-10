import reducer, { initialState } from '../../src/js/reducers/groups'
import * as actions from '../../src/js/actions/groups'

describe('Groups Reducer', () => {
  it('returns state when action is unaccounted for', () => {
    expect(
      reducer(initialState, { type: 'UNACCOUNTED_ACTION' })
    ).toEqual(initialState)
  })

  it('ADD_GROUP adds a group to the groups list', () => {
    const state = initialState
    const group = {
      id: '321cba',
      name: 'AwesomeSauce'
    }
    const action = actions.addGroup(group)
    const expected = {
      ...state,
      groups: [...state.groups, group]
    }

    expect(reducer(state, action)).toEqual(expected)
  })

  it('EDIT_GROUP edits the correct group with the correct update', () => {
    const state = {
      groups: [
        { id: '123abc', name: 'foo' },
        { id: '456def', name: 'bar' },
        { id: '789ghi', name: 'baz' }
      ]
    }
    const update = { name: 'quux' }
    const action = actions.editGroup('456def', update)
    const expected = {
      ...state,
      groups: [
        state.groups[0],
        { ...state.groups[1], ...update },
        state.groups[2]
      ]
    }

    expect(reducer(state, action)).toEqual(expected)
  })

  it('DELETE_GROUP deletes the correct item from the store', () => {
    const state = {
      groups: [
        { id: '123abc', name: 'foo' },
        { id: '456def', name: 'bar' },
        { id: '789ghi', name: 'baz' }
      ]
    }
    const action = actions.deleteGroup('456def')
    const expected = {
      ...state,
      groups: [state.groups[0], state.groups[2]]
    }

    expect(reducer(state, action)).toEqual(expected)
  })
})
