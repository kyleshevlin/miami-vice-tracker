import React from 'react'
import PropTypes from 'prop-types'

const Button = props => {
  const {
    big,
    children,
    className,
    disabled,
    onClick,
    small,
    warning
  } = props
  const classes = ['btn']

  if (big) classes.push('is-big')
  if (small) classes.push('is-small')
  if (warning) classes.push('is-warning')
  if (className) classes.push(className)

  return (
    <button
      className={classes.join(' ')}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  big: PropTypes.bool,
  children: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  small: PropTypes.bool,
  warning: PropTypes.bool
}

Button.defaultProps = {
  big: false,
  children: null,
  className: null,
  disabled: false,
  onClick: () => {},
  small: false,
  warning: false
}

export default Button
