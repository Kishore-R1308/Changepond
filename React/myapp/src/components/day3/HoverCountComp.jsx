import React, { Component } from 'react'
import HOCComp from './HOCComp'
class HoverCountComp extends Component {
  
    render() {
    return (
      <div>
        <h2>This is onMouseOver Counter Comp</h2>
        <p>Counter: <strong> {this.props.count}</strong></p>
        <button onMouseOver={()=> this.props.updateState()}>Hover Mouse on me</button>
              
      </div>
    )
  }
}

export default HOCComp(HoverCountComp)
