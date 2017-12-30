import * as types from '../constants/actionTypes'

export const initialState = {
  items: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.item]
      }

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
