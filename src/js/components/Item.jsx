import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { database } from '../firebase'
import { editItem, deleteItem } from '../actions'
import { confirmWithUser } from '../utils'

const confirmDelete = confirmWithUser(
  'Are you sure you wish to delete this item?'
)

class Item extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditng: false,
      localName: props.item.name,
      localSize: props.item.size
    }
  }

  componentDidMount() {
    this.bindKeyPress()
  }

  componentWillUnmount() {
    this.unbindKeyPress()
  }

  bindKeyPress() {
    document.addEventListener('keypress', this.handleKeyPress, false)
  }

  unbindKeyPress() {
    document.removeEventListener('keypress', this.handleKeyPress)
  }

  handleKeyPress = e => {
    if (this.state.isEditing && e.keyCode === 13) {
      this.handleSave(e)
    }
  }

  handleIncrement = () => {
    const { item: { id, count }, editItem } = this.props

    editItem(id, { count: count + 1 })
    database.ref(`items/${id}`).update({ count: count + 1 })
  }

  handleDecrement = () => {
    const { item: { id, count }, editItem } = this.props

    editItem(id, { count: count - 1 })
    database.ref(`items/${id}`).update({ count: count - 1 })
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  handleEdit = () => {
    this.setState({ isEditing: true })
  }

  handleDelete = () => {
    const { item: { id, userId }, deleteItem } = this.props

    if (confirmDelete()) {
      deleteItem(id)
      database.ref(`items/${id}`).remove()
      database.ref(`users/${userId}/items/${id}`).remove()
    }
  }

  handleCancel = () => {
    this.setState({
      isEditing: false,
      localName: this.props.item.name,
      localSize: this.props.item.size
    })
  }

  handleSave = e => {
    e.preventDefault()

    const { item: { id }, editItem } = this.props
    const { localName, localSize } = this.state
    const update = {
      name: localName,
      size: localSize
    }

    editItem(id, update)
    database.ref(`items/${id}`).update(update)
    this.setState({ isEditing: false })
  }

  render() {
    const { name, size, count } = this.props.item
    const { isEditing, localName, localSize } = this.state

    return (
      <div className="item">
        {isEditing ? (
          <form onSubmit={this.handleSave}>
            <label htmlFor="localName">
              Name
              <input
                type="text"
                value={localName}
                name="localName"
                onChange={this.handleChange}
              />
            </label>

            <label htmlFor="localSize">
              Size
              <input
                type="text"
                value={localSize}
                name="localSize"
                onChange={this.handleChange}
              />
            </label>
          </form>
        ) : (
          <Fragment>
            <div className="item-name">{name}</div>
            <div className="item-size">{size}</div>
          </Fragment>
        )}
        <div className="item-counter">
          {count}
          <button onClick={this.handleIncrement}>+</button>
          <button onClick={this.handleDecrement}>-</button>
        </div>
        <div className="item-actions">
          {isEditing ? (
            <Fragment>
              <button onClick={this.handleCancel}>Cancel</button>
              <button onClick={this.handleSave}>Save</button>
            </Fragment>
          ) : (
            <Fragment>
              <button onClick={this.handleEdit}>Edit</button>
              <button onClick={this.handleDelete}>Delete</button>
            </Fragment>
          )}
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
    count: PropTypes.number,
    userId: PropTypes.string
  }).isRequired,
  deleteItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  deleteItem,
  editItem
}

export default connect(null, mapDispatchToProps)(Item)
