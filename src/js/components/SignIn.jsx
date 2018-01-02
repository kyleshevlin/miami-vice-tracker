import React from 'react'
import PropTypes from 'prop-types'
import { auth, googleAuthProvider } from '../firebase'
import Button from './Button'

const SignIn = ({ big, small }) => (
  <Button
    onClick={() => {
      auth.signInWithRedirect(googleAuthProvider)
    }}
    big={big}
    small={small}
  >
    Sign In
  </Button>
)

SignIn.propTypes = {
  big: PropTypes.bool,
  small: PropTypes.bool
}

SignIn.defaultProps = {
  big: false,
  small: false
}

export default SignIn
