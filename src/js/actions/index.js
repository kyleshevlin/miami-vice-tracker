import * as types from '../constants/actionTypes'

export function updateItems(items) {
  return {
    type: types.UPDATE_ITEMS,
    items
  }
}

export function addItem(item) {
  return {
    type: types.ADD_ITEM,
    item
  }
}

export function editItem(id, update) {
  return {
    type: types.EDIT_ITEM,
    id,
    update
  }
}

export function deleteItem(id) {
  return {
    type: types.DELETE_ITEM,
    id
  }
}

export function updateCurrentUser(user) {
  return {
    type: types.UPDATE_CURRENT_USER,
    user
  }
}

export function updateCurrencySymbol(symbol) {
  return {
    type: types.UPDATE_CURRENCY_SYMBOL,
    symbol
  }
}
