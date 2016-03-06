import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { startGame, stopGame, nextWord, wordInputChanged } from '../actions'
import { browserHistory } from 'react-router'
import ScrambledWord from '../components/ScrambledWord'
import WordInput from '../components/WordInput'
import LifeBar from '../components/LifeBar'

class PlayPage extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.startGame()
  }

  componentWillUnmount() {
    this.props.stopGame()
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.timeLeft <= 0) {
      browserHistory.push('/game-over')
    }
  }

  render() {
    const {currentWord, guessedPart, timeLeft, score, currentWordScore} = this.props;

    if(!currentWord) {
      return (
        <div>
          Loading...
        </div>
        )
    }

    return (
      <div className="word-form">
        <ScrambledWord correctPart={guessedPart} word={currentWord} />
        <div className="meta">
          <div className="form-group word-input">
            <WordInput value={guessedPart} onChange={this.props.wordInputChanged} />
          </div>
          <div className="text-center">
            <LifeBar value={currentWordScore} />
          </div>
          <p className="text-center">Time left: { timeLeft }</p>
          <p className="text-center">Your score: { score }</p>
        </div>
      </div>
    )
  }
}

PlayPage.propTypes = {
  currentWord: PropTypes.string.isRequired,
  guessedPart: PropTypes.string.isRequired,
  timeLeft: PropTypes.number.isRequired,
  currentWordScore: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired
}


function mapStateToProps(state, ownProps) {
  let {currentWord, currentWordScore, guessedPart, timeLeft, score} = state.game
  return {
    currentWord,
    currentWordScore,
    guessedPart,
    timeLeft,
    score
  }
}

export default connect(
  mapStateToProps,
  {
    startGame,
    stopGame,
    nextWord,
    wordInputChanged,
  }
  )(PlayPage)
