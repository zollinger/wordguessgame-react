import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { submitScore } from '../actions'
import SubmitScoreForm from '../components/SubmitScoreForm'


class GameOverPage extends Component {
  render() {
    return (
      <div>
        <h2>Game Over</h2>
        <h3>Your final score is { this.props.score }.</h3>

        {this.props.score > 0 ? this.renderForm() : this.renderRetry() }

      </div>
    )
  }

  renderForm() {
    return <SubmitScoreForm score={this.props.score} submitScore={this.props.submitScore} />
  }

  renderRetry() {
    return (
      <Link to="/play">
        <button className="btn btn-default">Try again!</button>
      </Link>
    )
  }
}

function mapStateToProps(state, ownProps) {
  let {score} = state.game

  return {
    score
  }
}

export default connect(
  mapStateToProps,
  {
    submitScore
  })(GameOverPage)
