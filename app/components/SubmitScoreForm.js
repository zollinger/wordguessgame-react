import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import {times} from 'lodash'


export default class SubmitScoreForm extends Component {
  constructor(props) {
    super(props)
    this.submitScore = this.submitScore.bind(this)
  }

  submitScore(evt) {
    this.props.submitScore(this.refs.input.value, this.props.score)
    evt.preventDefault()
  }

  renderItem(i) {
    return <span key={i} className="life"></span>
  }

  render() {
    let lifes = times(this.props.value, this.renderItem)

    return (
      <form name="scoreForm"  onSubmit={this.submitScore}>
        <div className="form-group">
          <label>Enter your name to submit your score:</label>
          <input ref="input" type="text" required id="username" ng-model="vm.userName" name="userName" className="form-control" placeholder="Your name..." />
        </div>
        <button type="submit" className="btn btn-primary">Submit score</button>
        <Link to="/play">
          <button className="btn btn-default">Skip and restart game</button>
        </Link>
      </form>
    )
  }
}

SubmitScoreForm.propTypes = {
  score: PropTypes.number.isRequired,
  submitScore: PropTypes.func.isRequired
}
