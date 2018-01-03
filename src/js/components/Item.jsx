import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import NumericInput from 'react-numeric-input'
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

    const { currentUser, item } = props

    this.state = {
      isEditng: false,
      localCost: item.cost,
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

  handleNumericChange = (value, _, input) => {
    this.setState({ [input.name]: value })
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
    const { item: { cost, name, size } } = this.props

    this.setState({
      isEditing: false,
      localCost: cost,
      localName: name,
      localSize: size
    })
  }

  handleSave = e => {
    e.preventDefault()

    const { item: { id }, editItem } = this.props
    const { localCost, localName, localSize } = this.state
    const update = {
      cost: localCost,
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
    const classes = classNames('item', { isEditing: 'is-editing' })

    return (
      <div className={classes}>
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
              <NumericInput
                className="form_item-input"
                name="localCost"
                step={0.01}
                min={0}
                precision={2}
                value={localCost}
                onChange={this.handleNumericChange}
                style={false} // eslint-disable-line react/style-prop-object
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
          <div className="item-counter-actions">
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
