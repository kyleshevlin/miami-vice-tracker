import { connect } from 'react-redux'

const mapStateToProps = state => ({
  isAuthorized: Boolean(state.currentUser)
})

const withAuth = Component => connect(mapStateToProps)(Component)

export default withAuth
