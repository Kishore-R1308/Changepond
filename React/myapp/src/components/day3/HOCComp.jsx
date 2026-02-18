import React, { Component } from 'react'

const HOCComp = (WrapperComponent) => {
  
    class CommanCode extends Component {
    constructor(props) {
    super(props)
  
    this.state = {
       count:0
    }
  }
    updateState = ()=>{
    this.setState((prevState)=>({count:prevState.count + 1}))
    }
    
    render(){
    return <WrapperComponent count = {this.state.count} updateState={this.updateState}></WrapperComponent>
    }   
    }
    return CommanCode;
}

export default HOCComp