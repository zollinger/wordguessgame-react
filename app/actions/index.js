import 'isomorphic-fetch';
import {browserHistory} from 'react-router'
import {values} from 'lodash'
import {shuffle} from 'lodash/collection'

const BASE_URL = 'https://luminous-inferno-137.firebaseio.com';
const WORDS_RESOURCE_URL = BASE_URL + '/words.json';
const SCORES_RESOURCE_URL = BASE_URL + '/scores.json';

export function startGame() {
  return (dispatch, getState) => {
    if(getState().game.wordList.length > 0) {

      dispatch(wordsFetched(getState().game.wordList))
      dispatch(countdownStart())

    } else {
      fetch(WORDS_RESOURCE_URL)
      .then(res => res.json())
      .then((res) => {
          dispatch(wordsFetched(res))
          dispatch(countdownStart())
        }
      )
    }
  }
}

export function stopGame() {
  return dispatch => {
    dispatch(countdownStop())
  }
}

export const WORDS_FETCHED = 'WORDS_FETCHED'
export function wordsFetched(words) {
  return {
    type: WORDS_FETCHED,
    words: shuffle(words)
  }
}

export const FETCH_SCORES = 'FETCH_SCORES'
export function fetchScores() {
  return dispatch => {
    fetch(SCORES_RESOURCE_URL)
    .then(res => res.json())
    .then(values)
    .then(res => res.sort((a, b) => b.score - a.score) )
    .then(res => dispatch({
      type: FETCH_SCORES,
      scores: res
    }));
  }
}

export function submitScore(user, score, words=[]) {
  let entry = {
    user,
    score,
    words
  }
  return dispatch => {
    fetch(SCORES_RESOURCE_URL, {
      method: 'POST',
      body: JSON.stringify(entry)
    })
    .then(res => res.json())
    .then(() => { browserHistory.push('/scores') });
  }
}

export const NEXT_WORD = 'NEXT_WORD'
export function nextWord() {
  return {
    type: NEXT_WORD
  }
}

export const WORD_INPUT_CHANGED = 'WORD_INPUT_CHANGED'
export function wordInputChanged(newWord) {
  return {
    type: WORD_INPUT_CHANGED,
    newWord
  }
}

export const COUNTDOWN_START = 'COUNTDOWN_START'
export function countdownStart() {
  return (dispatch, getState) => {
    let interval = setInterval(() => {
      dispatch(countdownTick())
    }, 1000)

    dispatch({
      type: COUNTDOWN_START,
      interval
    })
  }
}

export const COUNTDOWN_TICK = 'COUNTDOWN_TICK'
export function countdownTick() {
  return {
    type: COUNTDOWN_TICK
  }
}

export const COUNTDOWN_STOP = 'COUNTDOWN_STOP'
export function countdownStop() {
  return (dispatch, getState) => {
    clearInterval(getState().countdown.interval)
    dispatch({
      type: COUNTDOWN_STOP
    })
  }
}
