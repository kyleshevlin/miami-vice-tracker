import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import NumericInput from 'react-numeric-input'
import { daysSinceStartOfYear, objectToArray } from '../utils'

const width = 400
const height = 225

class CostProjection extends Component {
  state = {
    budget: 1000
  }

  calculateProjectedHeight = () => {
    const spent = objectToArray(this.props.currentUser.items)
      .reduce((acc, item) => acc + item.cost * item.count, 0)
      .toFixed(2)
    const days = daysSinceStartOfYear(new Date())
    const projected = 365 * spent / days

    return height - projected * height / this.state.budget
  }

  handleNumericChange = (value, _, input) => {
    this.setState({ [input.name]: value })
  }

  render() {
    const projectedHeight = this.calculateProjectedHeight()

    return (
      <div className="cost_projection">
        <h2>Cost Projection</h2>
        <div className="form_item">
          <label
            htmlFor="annual_vice_budget"
            className="form_item-label"
          >
            Annual Vice Budget
          </label>
          <NumericInput
            id="annual_vice_budget"
            className="form_item-input"
            name="budget"
            min={0}
            value={this.state.budget}
            onChange={this.handleNumericChange}
            style={false} // eslint-disable-line react/style-prop-object
          />
        </div>
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
        >
          <line
            x1={0}
            y1={height}
            x2={width}
            y2={0}
            strokeWidth={2}
            stroke="#000"
          />
          <line
            x1={0}
            y1={height}
            x2={width}
            y2={projectedHeight}
            strokeWidth={2}
            stroke={projectedHeight < 0 ? '#f00' : '#0f0'}
          />
        </svg>
      </div>
    )
  }
}

CostProjection.propTypes = {
  currentUser: PropTypes.shape({
    items: PropTypes.shape({
      cost: PropTypes.number
    })
  }).isRequired
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
})

export default connect(mapStateToProps)(CostProjection)
