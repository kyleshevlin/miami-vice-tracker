import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import App from './components/App'
import '../scss/app.scss'

ReactGA.initialize(process.env.GA_ID)
ReactDOM.render(<App />, document.getElementById('app'))
