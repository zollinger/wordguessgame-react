import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchScores } from '../actions'

class ScoresPage extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchScores()
  }

  renderItem(score, idx) {
    return (
      <tr key={idx}>
        <td>
          <span className="user-name">{ score.user }</span>
        </td>
        <td>{ score.score }</td>
      </tr>
    )
  }

  render() {
    const {scores} = this.props;

    return (
      <div className="scores">
        <h2>Highscores</h2>

        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {scores.map(this.renderItem)}
          </tbody>
       </table>
     </div>
    )
  }
}


function mapStateToProps(state, ownProps) {
  return {
    scores: state.scores
  }
}


export default connect(
  mapStateToProps,
  {
    fetchScores
  }
  )(ScoresPage)
