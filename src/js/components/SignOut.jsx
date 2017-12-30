import React from 'react'
import { auth } from '../firebase'

const SignOut = () => (
  <button
    onClick={() => {
      auth.signOut()
    }}
  >
    Sign Out
  </button>
)

export default SignOut
