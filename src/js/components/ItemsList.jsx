import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Item from './Item'

const ItemsList = ({ items }) => (
  <div className="items_list-wrap">
    {items.length ? (
      <Fragment>
        <div className="items_list-header">
          <span className="items_list-header-heading">Name</span>
          <span className="items_list-header-heading">Size</span>
          <span className="items_list-header-heading">Cost</span>
          <span className="items_list-header-heading">Spent</span>
          <span className="items_list-header-heading">Count</span>
          <span className="items_list-header-heading">Actions</span>
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
