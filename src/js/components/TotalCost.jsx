import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const TotalCost = ({ currencySymbol, totalSpent }) => (
  <div className="total_cost">
    <h2 className="total_cost-heading">Total Cost of Vices</h2>
    <div className="total_cost-total">
      {currencySymbol}
      {totalSpent}
    </div>
  </div>
)

TotalCost.propTypes = {
  currencySymbol: PropTypes.string.isRequired,
  totalSpent: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  currencySymbol: state.currencySymbol,
  totalSpent: state.totalSpent
})

export default connect(mapStateToProps)(TotalCost)
