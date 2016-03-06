import * as ActionTypes from '../actions'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

const GAME_TIME = 40
const GAME_INITIAL_STATE = {
  wordList: [],
  currentWord: '',
  currentWordIdx: -1,
  guessedPart:'',
  score: 0,
  currentWordScore: 0,
  timeLeft: GAME_TIME,
  startTime: Date.now()
}

function game(state = GAME_INITIAL_STATE, action ) {
  let newState = state

  if(action.type === ActionTypes.COUNTDOWN_START) {
    newState = {...newState}
    newState.timeLeft = GAME_TIME
    newState.startTime = Date.now()
    return nextWord(newState)
  }

  if(action.type === ActionTypes.COUNTDOWN_TICK) {
    let timeLeft = Math.round(GAME_TIME - ((Date.now() - state.startTime) / 1000))
    if(timeLeft !== state.timeLeft) {
      newState =  {...state, timeLeft}
    }
  }

  if (action.type === ActionTypes.WORDS_FETCHED) {
    newState =  {...newState, wordList: action.words }
  }

  if(action.type === ActionTypes.NEXT_WORD) {
    return nextWord(newState)
  }

  if(action.type === ActionTypes.WORD_INPUT_CHANGED) {
    let match = state.currentAnagrams.find((word) => word.indexOf(action.newWord) === 0)

    newState = {...newState}

    if (match) {
      if(action.newWord.length < newState.guessedPart.length) {
        // Add penalty for backspace
        newState.currentWordScore -= 1
      }

      newState.guessedPart = action.newWord
      if(match.length === action.newWord.length) {
        // Finished a word
        newState = {...newState, ...nextWord(state) }
        newState.score = state.score + newState.currentWordScore
      }
    } else {
      // Add penalty
      newState.currentWordScore -= 1

      if(newState.currentWordScore <= 0) {
        return nextWord(newState)
      }
    }
  }

  return newState
}

function nextWord(state) {
  let nextIdx = state.currentWordIdx+1
  if(state.wordList[nextIdx]) {
    let nextWord = state.wordList[nextIdx][0] || ''

    return Object.assign({}, state, {
      currentWord: nextWord,
      currentAnagrams: state.wordList[nextIdx] || [],
      currentWordIdx: nextIdx,
      currentWordScore: Math.floor( Math.pow(1.95, nextWord.length / 3) ),
      guessedPart: ''
    })
  }

  return state
}

function countdown(state={interval: 0}, action) {
  if (action.type === ActionTypes.COUNTDOWN_START) {
    let { interval } = action;
    return {...state, interval}
  }

  return state
}

function scores(state=[], action) {
  if (action.scores) {
    return action.scores
  }
  return state
}

const rootReducer = combineReducers({
  routing,
  game,
  scores,
  countdown
})

export default rootReducer
