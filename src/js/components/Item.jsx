import React from 'react'
import PropTypes from 'prop-types'

const Item = ({ item }) => {
  const { name, size, count } = item

  return (
    <div className="item">
      {name} - {size} - {count}
    </div>
  )
}

Item.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    size: PropTypes.string,
    count: PropTypes.number
  }).isRequired
}

export default Item
