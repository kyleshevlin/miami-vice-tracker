import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { database } from '../firebase'
import { updateItems } from '../actions'
import { objectToArray } from '../utils'
import ErrorBoundary from '../components/ErrorBoundary'
import ItemsList from '../components/ItemsList'

class ItemsContainer extends Component {
  componentDidMount() {
    const { currentUser, updateItems } = this.props

    database.ref('items').on('value', snapshot => {
      const items = objectToArray(snapshot.val())

      const filteredItems = items.filter(
        item => item.userId === currentUser.uid
      )

      updateItems(filteredItems)
    })
  }

  render() {
    return (
      <div>
        <ErrorBoundary message="There was trouble getting the items. Sorry. ¯\_(ツ)_/¯">
          <ItemsList items={this.props.items} />
        </ErrorBoundary>
      </div>
    )
  }
}

ItemsContainer.propTypes = {
  currentUser: PropTypes.shape({
    uid: PropTypes.string.isRequired
  }).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired
    })
  ).isRequired,
  updateItems: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  items: state.items
})

const mapDispatchToProps = {
  updateItems
}

export default connect(mapStateToProps, mapDispatchToProps)(
  ItemsContainer
)
