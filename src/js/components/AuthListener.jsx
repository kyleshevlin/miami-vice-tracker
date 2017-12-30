import { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { database, auth } from '../firebase'
import { updateCurrentUser } from '../actions'

class AuthListener extends Component {
  componentDidMount() {
    const { updateCurrentUser } = this.props

    auth.onAuthStateChanged(response => {
      if (response) {
        const { displayName, uid, email, photoURL } = response
        const endpoint = `/users/${uid}`

        database.ref(endpoint).on('value', snapshot => {
          const user = snapshot.val()

          if (user) {
            updateCurrentUser(user)
          } else {
            database.ref(endpoint).set({
              displayName,
              uid,
              email,
              photoURL
            })
          }
        })
      } else {
        updateCurrentUser(response)
      }
    })
  }

  render() {
    return null
  }
}

AuthListener.propTypes = {
  updateCurrentUser: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  updateCurrentUser
}

export default connect(null, mapDispatchToProps)(AuthListener)
