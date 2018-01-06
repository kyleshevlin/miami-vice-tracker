import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { objectToArray } from '../utils'

const TotalCost = ({ currencySymbol, currentUser }) => (
  <div className="total_cost">
    <h2 className="total_cost-heading">Total Cost of Vices</h2>
    <div className="total_cost-total">
      {currencySymbol}
      {objectToArray(currentUser.items)
        .reduce((acc, item) => acc + item.cost * item.count, 0)
        .toFixed(2)}
    </div>
  </div>
)

TotalCost.propTypes = {
  currencySymbol: PropTypes.string.isRequired,
  currentUser: PropTypes.shape({
    items: PropTypes.shape({
      cost: PropTypes.number,
      count: PropTypes.number
    })
  }).isRequired
}

const mapStateToProps = state => ({
  currencySymbol: state.currencySymbol,
  currentUser: state.currentUser
})

export default connect(mapStateToProps)(TotalCost)
