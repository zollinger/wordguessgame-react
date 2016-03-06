import React, { Component, PropTypes } from 'react'

export default class Timer extends Component {

  componentDidMount() {
    this.interval = setInterval(this.render, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <div class="timer">{ this.props.ellapsed }</div>
    )
  }
}

Timer.propTypes = {
  startTime: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired,
  onTimeout: PropTypes.func.isRequired
}

