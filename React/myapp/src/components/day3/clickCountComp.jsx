import React, { Component } from 'react'
import HOCComp from './HOCComp'
class ClickCountComp extends Component {
 
  render() {
    return (
      <div>
        <h2>This is Click Counter Comp</h2>
        <p>Counter: <strong> {this.props.count}</strong></p>
        <button type='button' onClick={()=> this.props.updateState()}>Click Counter</button>
      </div>
    )
  }
}

export default HOCComp(ClickCountComp)
