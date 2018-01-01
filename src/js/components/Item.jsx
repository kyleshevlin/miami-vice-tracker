import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { database } from '../firebase'
import { editItem, deleteItem } from '../actions'
import { confirmWithUser } from '../utils'
import Button from './Button'

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
          <Fragment>
            <div className="form_item">
              <label className="form_item-label" htmlFor="localName">
                Name
              </label>
              <input
                className="form_item-input"
                type="text"
                value={localName}
                name="localName"
                onChange={this.handleChange}
              />
            </div>

            <div className="form_item">
              <label className="form_item-label" htmlFor="localSize">
                Size
              </label>
              <input
                className="form_item-input"
                type="text"
                value={localSize}
                name="localSize"
                onChange={this.handleChange}
              />
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="item-name">{name}</div>
            <div className="item-size">{size}</div>
          </Fragment>
        )}
        <div className="item-counter">
          <span className="item-counter-count">{count}</span>
          <Button
            className="btn"
            onClick={this.handleIncrement}
            small
          >
            +
          </Button>
          <Button
            className="btn"
            onClick={this.handleDecrement}
            small
            disabled={count <= 0}
          >
            -
          </Button>
        </div>
        <div className="item-actions">
          {isEditing ? (
            <Fragment>
              <Button
                className="btn"
                onClick={this.handleCancel}
                warning
              >
                Cancel
              </Button>
              <Button className="btn" onClick={this.handleSave}>
                Save
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Button className="btn" onClick={this.handleEdit}>
                Edit
              </Button>
              <Button
                className="btn"
                onClick={this.handleDelete}
                warning
              >
                Delete
              </Button>
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
