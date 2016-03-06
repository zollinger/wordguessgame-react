import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'

class NavBar extends Component {

  constructor(props) {
    super(props)
    this.state = {swapped: false}
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      swapped: !this.state.swapped
    })
  }

  render() {
    return (
       <nav className="navbar ">
        <div className="container">
          <div className="navbar-header pull-left">
            <Link to="/"
                onMouseOver={this.toggle}
                onMouseOut={this.toggle}
                className="navbar-brand">
              { this.state.swapped ? 'Guess the word' : 'Suegs teh rowd.' }
            </Link>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="/play">Play</Link></li>
            <li><Link to="/scores">Scores</Link></li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default NavBar
