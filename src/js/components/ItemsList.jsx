import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Item from './Item'

const ItemsList = ({ items }) => (
  <div className="items_list-wrap">
    {items.length ? (
      <Fragment>
        <div className="items_list-header">
          <span>Name</span>
          <span>Size</span>
          <span>Cost</span>
          <span>Spent</span>
          <span>Count</span>
          <span>Actions</span>
        </div>
        <ol className="items_list">
          {items.map(item => <Item key={item.id} item={item} />)}
        </ol>
      </Fragment>
    ) : (
      <p>{`There are no items. Why don't you add one?`}</p>
    )}
  </div>
)

ItemsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      size: PropTypes.string,
      count: PropTypes.number
    })
  ).isRequired
}

export default ItemsList
