import React from 'react'
import PropTypes from 'prop-types'
import withAuth from '../hocs/withAuth'
import TotalCost from './TotalCost'
import AddItem from './AddItem'
import ItemsContainer from '../containers/ItemsContainer'

const Main = ({ isAuthorized }) =>
  isAuthorized ? (
    <main className="main">
      <div className="main-upper">
        <TotalCost />
        <AddItem />
      </div>
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
