import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import UserSettings from './UserSettings'

const HeaderUser = ({ user }) =>
  user ? (
    <div className="header_user">
      <div className="header_user-name">{user.displayName}</div>
      <div className="header_user-img-wrap">
        <img
          className="header_user-img"
          src={user.photoURL}
          alt={`${user.displayName}'s avatar`}
        />
      </div>
      <UserSettings />
    </div>
  ) : null

HeaderUser.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    photoURL: PropTypes.string
  })
}

HeaderUser.defaultProps = {
  user: null
}

const mapStateToProps = state => ({
  user: state.currentUser
})

export default connect(mapStateToProps)(HeaderUser)
