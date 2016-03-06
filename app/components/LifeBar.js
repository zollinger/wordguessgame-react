import React, { Component, PropTypes } from 'react'
import {times} from 'lodash'


export default class LifeBar extends Component {

  renderItem(i) {
    return <span key={i} className="life"></span>
  }

  render() {
    let lifes = times(this.props.value, this.renderItem)

    return (
      <p className="lifes">
        { lifes }
      </p>
    )
  }
}

LifeBar.propTypes = {
  value: PropTypes.number.isRequired
}
