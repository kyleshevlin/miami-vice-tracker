import React from 'react'
import PropTypes from 'prop-types'
import withAuth from '../hocs/withAuth'
import AddItem from './AddItem'
import ItemsContainer from '../containers/ItemsContainer'

const Main = ({ isAuthorized }) =>
  isAuthorized ? (
    <main className="main">
      <AddItem />
      <ItemsContainer />
    </main>
  ) : null

Main.propTypes = {
  isAuthorized: PropTypes.bool
}

Main.defaultProps = {
  isAuthorized: false
}

export default withAuth(Main)
