import * as types from '../constants/actionTypes'

export const initialState = {
  items: [],
  currentUser: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_ITEM:
      return {
        ...state,
        items: [action.item, ...state.items]
      }

    case types.EDIT_ITEM: {
      const index = state.items.findIndex(
        item => item.id === action.id
      )

      return {
        ...state,
        items: [
          ...state.items.slice(0, index),
          { ...state.items[index], ...action.update },
          ...state.items.slice(index + 1)
        ]
      }
    }

    case types.DELETE_ITEM: {
      const index = state.items.findIndex(
        item => item.id === action.id
      )

      return {
        ...state,
        items: [
          ...state.items.slice(0, index),
          ...state.items.slice(index + 1)
        ]
      }
    }

    case types.UPDATE_ITEMS:
      return { ...state, items: action.items }

    case types.UPDATE_CURRENT_USER:
      return {
        ...state,
        currentUser: action.user
      }

    default:
      return state
  }
}

export default reducer
