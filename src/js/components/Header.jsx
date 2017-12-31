import React from 'react'
import PropTypes from 'prop-types'
import withAuth from '../hocs/withAuth'
import HeaderUser from './HeaderUser'
import SignIn from './SignIn'
import SignOut from './SignOut'

const Header = ({ isAuthorized }) => (
  <header>
    <h1>Miami Vice Tracker</h1>
    <HeaderUser />
    {isAuthorized ? <SignOut /> : <SignIn />}
  </header>
)

Header.propTypes = {
  isAuthorized: PropTypes.bool.isRequired
}

export default withAuth(Header)
