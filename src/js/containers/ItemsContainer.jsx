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

      // TODO: There's probably a better way to store the data as this is a
      // 0(n) filtering. This isn't a problem while the amount of items is small
      // but would require filtering _all_ items at the moment. Would be better to only
      // take the item keys from the user.items prop and only get those ones, but the
      // queries don't make much sense to me right now.
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
