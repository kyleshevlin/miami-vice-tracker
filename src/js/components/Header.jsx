import React from 'react'
import PropTypes from 'prop-types'
import withAuth from '../hocs/withAuth'
import HeaderUser from './HeaderUser'
import SignIn from './SignIn'
import SignOut from './SignOut'

const Header = ({ isAuthorized }) => (
  <header className="header">
    <h1 className="header-heading">Miami Vice Tracker</h1>

    <div className="header-secondary">
      <HeaderUser />
      {isAuthorized ? <SignOut /> : <SignIn />}
    </div>
  </header>
)

Header.propTypes = {
  isAuthorized: PropTypes.bool.isRequired
}

export default withAuth(Header)
