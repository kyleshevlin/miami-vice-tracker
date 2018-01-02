import React from 'react'
import SignIn from './SignIn'

const Greeting = () => (
  <div className="greeting">
    <h2 className="greeting-heading">¡Bienvenidos!</h2>
    <div className="greeting-content">
      <p>Sign in to start tracking your vices.</p>
    </div>
    <SignIn big />
  </div>
)

export default Greeting
