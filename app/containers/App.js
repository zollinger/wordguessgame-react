import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import NavBar from '../components/NavBar'

class App extends Component {

  render() {
    const { children } = this.props
    return (
      <div className="app-wrapper">
        <NavBar />
        <div className="container">
          {children}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node
}

export default connect()(App)
