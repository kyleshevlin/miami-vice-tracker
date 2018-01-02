import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { database } from '../firebase'
import { editItem, deleteItem } from '../actions'
import { confirmWithUser, strToFloat } from '../utils'
import Button from './Button'

const confirmDelete = confirmWithUser(
  'Are you sure you wish to delete this item?'
)

class Item extends Component {
  constructor(props) {
    super(props)

    const { currentUser, item } = props

    this.state = {
      isEditng: false,
      localCost: strToFloat(item.cost),
      localName: item.name,
      localSize: item.size
    }

    this.itemRef = database.ref(
      `users/${currentUser.uid}/items/${item.id}`
    )
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
    this.itemRef.update({ count: count + 1 })
  }

  handleDecrement = () => {
    const { item: { id, count }, editItem } = this.props

    editItem(id, { count: count - 1 })
    this.itemRef.update({ count: count - 1 })
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  handleEdit = () => {
    this.setState({ isEditing: true })
  }

  handleDelete = () => {
    const { item: { id }, deleteItem } = this.props

    if (confirmDelete()) {
      deleteItem(id)
      this.itemRef.remove()
    }
  }

  handleCancel = () => {
    this.setState({
      isEditing: false,
      localCost: strToFloat(this.props.item.cost),
      localName: this.props.item.name,
      localSize: this.props.item.size
    })
  }

  handleSave = e => {
    e.preventDefault()

    const { item: { id }, editItem } = this.props
    const { localCost, localName, localSize } = this.state
    const update = {
      cost: strToFloat(localCost),
      name: localName,
      size: localSize
    }

    editItem(id, update)
    this.itemRef.update(update)
    this.setState({ isEditing: false })
  }

  render() {
    const { cost, count, name, size } = this.props.item
    const { isEditing, localCost, localName, localSize } = this.state

    return (
      <div className={`item ${isEditing && 'is-editing'}`}>
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

            <div className="form_item">
              <label className="form_item-label" htmlFor="localCost">
                Cost
              </label>
              <input
                className="form_item-input"
                type="number"
                step="0.01"
                min={0}
                value={localCost}
                name="localCost"
                onChange={this.handleChange}
              />
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="item-name">{name}</div>
            <div className="item-size">
              <span className="item-heading">Size: </span>
              {size}
            </div>
            {/* TODO: make this currency more internationally friendly */}
            <div className="item-cost">
              <span className="item-heading">Cost: </span>
              ${cost}
            </div>
          </Fragment>
        )}

        <div className="item-spent">
          <span className="item-heading">Total Spent: </span>
          ${Math.round(cost * count * 100) / 100}
        </div>
        <div className="item-counter">
          <span className="item-heading">Count: </span>
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
  currentUser: PropTypes.shape({
    uid: PropTypes.string
  }).isRequired,
  deleteItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  item: PropTypes.shape({
    cost: PropTypes.number,
    count: PropTypes.number,
    id: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.string,
    userId: PropTypes.string
  }).isRequired
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
})

const mapDispatchToProps = {
  deleteItem,
  editItem
}

export default connect(mapStateToProps, mapDispatchToProps)(Item)
