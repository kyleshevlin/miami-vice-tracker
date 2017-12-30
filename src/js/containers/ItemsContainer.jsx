import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ErrorBoundary from '../components/ErrorBoundary'
import ItemsList from '../components/ItemsList'

const ItemsContainer = ({ items }) => (
  <div>
    <ErrorBoundary message="There was trouble getting the items. Sorry. ¯\_(ツ)_/¯">
      <ItemsList items={items} />
    </ErrorBoundary>
  </div>
)

ItemsContainer.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      size: PropTypes.string,
      count: PropTypes.number
    })
  ).isRequired
}

const mapStateToProps = state => ({
  items: state.items
})

export default connect(mapStateToProps)(ItemsContainer)
