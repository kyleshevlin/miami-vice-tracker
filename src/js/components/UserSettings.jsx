import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { updateCurrencySymbol } from '../actions'
import { database } from '../firebase'
import Button from './Button'

class UserSettings extends Component {
  state = {
    isOpen: false,
    localCurrencySymbol: this.props.currencySymbol
  }

  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()

    const { currentUser, updateCurrencySymbol } = this.props
    const { isOpen, localCurrencySymbol } = this.state

    database.ref(`users/${currentUser.uid}`).update({
      currencySymbol: localCurrencySymbol
    })
    updateCurrencySymbol(localCurrencySymbol)
    this.setState({ isOpen: !isOpen })
  }

  render() {
    const { height, width } = this.props
    const { isOpen, localCurrencySymbol } = this.state

    const classes = classNames('user_settings', { 'is-open': isOpen })

    return (
      <div className={classes}>
        <button
          className="user_settings-toggle"
          onClick={this.handleClick}
        >
          <svg
            className="user_settings-toggle-arrow"
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            width={width}
          >
            <polygon
              points={`0,0 ${width},0 ${width / 2},${height}`}
            />
          </svg>
        </button>
        {isOpen && (
          <div className="user_settings-dropdown">
            <form
              className="user_settings-form"
              onSubmit={this.handleSubmit}
            >
              <div className="form_item">
                <label
                  className="form_item-label"
                  htmlFor="localCurrencySymbol"
                >
                  Currency Symbol
                </label>
                <input
                  className="form_item-input"
                  type="text"
                  value={localCurrencySymbol}
                  name="localCurrencySymbol"
                  onChange={this.handleChange}
                />
              </div>

              <Button small type="submit">
                Save
              </Button>
            </form>
          </div>
        )}
      </div>
    )
  }
}

UserSettings.propTypes = {
  currencySymbol: PropTypes.string.isRequired,
  currentUser: PropTypes.shape({
    uid: PropTypes.string
  }).isRequired,
  height: PropTypes.number,
  updateCurrencySymbol: PropTypes.func.isRequired,
  width: PropTypes.number
}

UserSettings.defaultProps = {
  height: 8,
  width: 10
}

const mapStateToProps = state => ({
  currencySymbol: state.currencySymbol,
  currentUser: state.currentUser
})

const mapDispatchToProps = {
  updateCurrencySymbol
}

export default connect(mapStateToProps, mapDispatchToProps)(
  UserSettings
)
