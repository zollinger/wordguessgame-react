import React, { Component, PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {shuffle} from 'lodash/collection';

export default class ScrambledWord extends Component {
  constructor(props) {
    super(props)
    this.chars = []
  }

  componentWillMount() {
    this.setWord(this.props.word)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.word !== nextProps.word) {
      this.setWord(nextProps.word)
    }
  }

  setWord(word) {
    let chars = [];

    for (let i=0, ii=word.length; i < ii; i++) {
      chars.push({
        char: word[i],
        id: word + i,
        originalPos: i
      })
    }

    this.chars = shuffle(chars);
  }

  renderChar(char) {
    let className = `char char-pos-${char.originalPos}`
    if(char.originalPos < this.props.correctPart.length) {
      className += ' char-highlight'
    }

    return (
      <span key={char.originalPos + char.char } className={className}>
        {char.char}
      </span>
    )
  }

  render() {

    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="word"
          transitionEnterTimeout={800}
          transitionLeaveTimeout={800}
        >
          <div key={this.props.word} className="scrambled-word">
              {this.chars.map( char => this.renderChar(char)) }
          </div>
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

ScrambledWord.propTypes = {
  word: PropTypes.string.isRequired,
  correctPart: PropTypes.string.isRequired
}
