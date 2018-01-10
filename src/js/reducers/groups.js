import * as types from '../constants/actionTypes'

export const initialState = {
  groups: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_GROUP:
      return {
        ...state,
        groups: [action.group, ...state.groups]
      }

    case types.EDIT_GROUP: {
      const index = state.groups.findIndex(
        group => group.id === action.id
      )

      return {
        ...state,
        groups: [
          ...state.groups.slice(0, index),
          { ...state.groups[index], ...action.update },
          ...state.groups.slice(index + 1)
        ]
      }
    }

    case types.DELETE_GROUP: {
      const index = state.groups.findIndex(
        group => group.id === action.id
      )

      return {
        ...state,
        groups: [
          ...state.groups.slice(0, index),
          ...state.groups.slice(index + 1)
        ]
      }
    }

    default:
      return state
  }
}

export default reducer
