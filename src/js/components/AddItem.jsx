import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addItem } from '../actions'
import { database } from '../firebase'

const initialState = {
  name: '',
  size: '',
  count: 0
}

class AddItem extends Component {
  state = initialState

  handleSubmit = e => {
    e.preventDefault()

    const { currentUser: { uid } } = this.props
    const { name, size, count } = this.state
    const integer = parseInt(count, 10)

    if (name.length && size.length && integer >= 0) {
      // Create a new items ref, get its ID
      const { key } = database.ref('items').push()

      const item = {
        id: key,
        name,
        size,
        count: integer,
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
    return (
      <div className="add_item">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="itemName">
            Name
            <input
              id="itemName"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>

          <label htmlFor="itemSize">
            Size
            <input
              id="itemSize"
              type="text"
              name="size"
              value={this.state.size}
              onChange={this.handleChange}
            />
          </label>

          <label htmlFor="itemCount">
            Count
            <input
              id="itemCount"
              type="number"
              name="count"
              min={0}
              value={this.state.count}
              onChange={this.handleChange}
            />
          </label>

          <button type="submit">Add Item</button>
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
