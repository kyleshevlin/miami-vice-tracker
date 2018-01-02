import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import withAuth from '../hocs/withAuth'
import TotalCost from './TotalCost'
import AddItem from './AddItem'
import ItemsContainer from '../containers/ItemsContainer'
import Greeting from './Greeting'

const Main = ({ isAuthorized }) => (
  <main className="main">
    {isAuthorized ? (
      <Fragment>
        <div className="main-upper">
          <TotalCost />
          <AddItem />
        </div>
        <ItemsContainer />
      </Fragment>
    ) : (
      <Greeting />
    )}
  </main>
)

Main.propTypes = {
  isAuthorized: PropTypes.bool
}

Main.defaultProps = {
  isAuthorized: false
}

export default withAuth(Main)
