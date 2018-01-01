import React from 'react'
import { auth } from '../firebase'
import Button from './Button'

const SignOut = () => (
  <Button
    onClick={() => {
      auth.signOut()
    }}
    small
    warning
  >
    Sign Out
  </Button>
)

export default SignOut
