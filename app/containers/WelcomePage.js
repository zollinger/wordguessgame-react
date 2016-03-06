import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'


class WelcomePage extends Component {

  render() {
    return (
      <div>
        <h1>Hello there!</h1>
        <p>
          In this game you will be presented with a random scrambled word. <br/>
          Your task is to guess the word by typing the characters in the correct order. You have 40 seconds to complete as many words as you can.
        </p>
        <p>
          <Link to="/play">
            <button className="btn btn-primary" >Let's play!</button><br />
          </Link>
        </p>
      </div>
    )
  }
}


export default connect()(WelcomePage)
