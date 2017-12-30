import React from 'react'
import { auth, googleAuthProvider } from '../firebase'

const SignIn = () => (
  <button
    onClick={() => {
      auth.signInWithRedirect(googleAuthProvider)
    }}
  >
    Sign In
  </button>
)

export default SignIn
