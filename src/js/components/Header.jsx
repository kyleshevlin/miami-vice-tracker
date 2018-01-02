import React from 'react'
import PropTypes from 'prop-types'
import withAuth from '../hocs/withAuth'
import HeaderUser from './HeaderUser'
import SignIn from './SignIn'
import SignOut from './SignOut'
import title from '../../assets/Title.png'

const Header = ({ isAuthorized }) => (
  <header className="header">
    <h1 className="header-heading">
      <img src={title} alt="Miami Vice Tracker" />
      Miami Vice Tracker
    </h1>

    <div className="header-secondary">
      <HeaderUser />
      {isAuthorized ? <SignOut /> : <SignIn small />}
    </div>
  </header>
)

Header.propTypes = {
  isAuthorized: PropTypes.bool.isRequired
}

export default withAuth(Header)
