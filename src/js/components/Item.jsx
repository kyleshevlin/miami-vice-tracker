import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { editItem } from '../actions'
import { database } from '../firebase'

class Item extends Component {
  constructor() {
    super()

    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
  }

  handleIncrement() {
    const { item: { id, count }, editItem } = this.props

    editItem(id, { count: count + 1 })
    database.ref(`items/${id}`).update({ count: count + 1 })
  }

  handleDecrement() {
    const { item: { id, count }, editItem } = this.props

    editItem(id, { count: count - 1 })
    database.ref(`items/${id}`).update({ count: count - 1 })
  }

  render() {
    const { name, size, count } = this.props.item

    return (
      <div className="item">
        <div className="item-name">{name}</div>
        <div className="item-size">{size}</div>
        <div className="item-counter">
          {count}
          <button onClick={this.handleIncrement}>+</button>
          <button onClick={this.handleDecrement}>-</button>
        </div>
      </div>
    )
  }
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
