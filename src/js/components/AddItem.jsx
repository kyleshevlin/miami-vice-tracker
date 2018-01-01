import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addItem } from '../actions'
import { database } from '../firebase'
import { strToFloat } from '../utils'

const initialState = {
  // prettier-ignore
  cost: '0.00',
  name: '',
  size: ''
}

class AddItem extends Component {
  state = initialState

  handleSubmit = e => {
    e.preventDefault()

    const { currentUser: { uid } } = this.props
    const { cost, name, size } = this.state

    if (cost.length && name.length && size.length) {
      // Create a new items ref, get its ID
      const { key } = database.ref('items').push()

      const item = {
        cost: strToFloat(cost),
        count: 0,
        id: key,
        name,
        size,
        userId: uid
      }

      this.props.addItem(item)

      const update = {
        [`items/${key}`]: item,
        [`users/${uid}/items/${key}`]: true
      }

      database.ref().update(update)

      this.setState(initialState)
    }
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  render() {
    const { cost, name, size } = this.state

    return (
      <div className="add_item">
        <form onSubmit={this.handleSubmit}>
          <div className="form_item">
            <label className="form_item-label" htmlFor="itemName">
              Name
            </label>
            <input
              id="itemName"
              className="form_item-input"
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </div>

          <div className="form_item">
            <label className="form_item-label" htmlFor="itemSize">
              Size
            </label>
            <input
              id="itemSize"
              className="form_item-input"
              type="text"
              name="size"
              value={size}
              onChange={this.handleChange}
            />
          </div>

          <div className="form_item">
            <label className="form_item-label" htmlFor="itemCost">
              Cost
            </label>
            <input
              id="itemCost"
              className="form_item-input"
              type="number"
              step="0.01"
              min={0}
              name="cost"
              value={cost}
              onChange={this.handleChange}
            />
          </div>

          <button
            className="btn"
            type="submit"
            disabled={!(cost.length && name.length && size.length)}
          >
            Add Item
          </button>
        </form>
      </div>
    )
  }
}

AddItem.propTypes = {
  addItem: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    uid: PropTypes.string
  }).isRequired
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
})

const mapDispatchToProps = {
  addItem
}

export default connect(mapStateToProps, mapDispatchToProps)(AddItem)
