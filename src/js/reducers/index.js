import * as types from '../constants/actionTypes'
import { objectToArray } from '../utils'

export const initialState = {
  items: [],
  currentUser: null,
  currencySymbol: '$',
  totalSpent: 0
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

    case types.UPDATE_CURRENT_USER: {
      const { user } = action
      const totalSpent = objectToArray(user.items)
        .reduce((acc, item) => acc + item.cost * item.count, 0)
        .toFixed(2)

      return {
        ...state,
        currentUser: user,
        totalSpent
      }
    }

    case types.UPDATE_CURRENCY_SYMBOL:
      return {
        ...state,
        currencySymbol: action.symbol
      }

    default:
      return state
  }
}

export default reducer
