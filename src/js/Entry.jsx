import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import App from './components/App'
import '../scss/app.scss'

ReactGA.initialize(process.env.GA_ID)
ReactGA.pageview(window.location.pathname + window.location.search)

ReactDOM.render(<App />, document.getElementById('app'))
