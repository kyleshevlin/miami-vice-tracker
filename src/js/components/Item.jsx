import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { editItem } from '../actions'

const Item = ({ item, editItem }) => {
  const { id, name, size, count } = item

  return (
    <div className="item">
      <div className="item-name">{name}</div>
      <div className="item-size">{size}</div>
      <div className="item-counter">
        {count}
        <button
          onClick={() => {
            editItem(id, { count: count + 1 })
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            editItem(id, { count: count - 1 })
          }}
        >
          -
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.string,
    count: PropTypes.number
  }).isRequired,
  editItem: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  editItem
}

export default connect(null, mapDispatchToProps)(Item)
