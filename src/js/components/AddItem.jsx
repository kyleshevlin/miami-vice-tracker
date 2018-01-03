import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import NumericInput from 'react-numeric-input'
import { addItem } from '../actions'
import { database } from '../firebase'

const initialState = {
  cost: 0.0,
  name: '',
  size: ''
}

class AddItem extends Component {
  state = initialState

  handleSubmit = e => {
    e.preventDefault()

    const { currentUser: { uid } } = this.props
    const { cost, name, size } = this.state

    if (this.inputsAreValid()) {
      // Create a new items ref, get its ID
      const { key } = database.ref('items').push()

      const item = {
        cost,
        count: 0,
        id: key,
        name,
        size
      }

      this.props.addItem(item)

      const update = {
        [`users/${uid}/items/${key}`]: item
      }

      database.ref().update(update)

      this.setState(initialState)
    }
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  handleNumericChange = (value, _, input) => {
    this.setState({ [input.name]: value })
  }

  inputsAreValid = () => {
    const { cost, name, size } = this.state

    return cost >= 0 && name.length && size.length
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
            <NumericInput
              id="itemCost"
              className="form_item-input"
              name="cost"
              step={0.01}
              min={0}
              precision={2}
              value={cost}
              onChange={this.handleNumericChange}
              style={false} // eslint-disable-line react/style-prop-object
            />
          </div>

          <button
            className="btn"
            type="submit"
            disabled={!this.inputsAreValid()}
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
