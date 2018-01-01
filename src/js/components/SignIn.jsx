import React from 'react'
import { auth, googleAuthProvider } from '../firebase'
import Button from './Button'

const SignIn = () => (
  <Button
    onClick={() => {
      auth.signInWithRedirect(googleAuthProvider)
    }}
    small
  >
    Sign In
  </Button>
)

export default SignIn
