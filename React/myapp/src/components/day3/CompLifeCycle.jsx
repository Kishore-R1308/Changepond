import React, { Component } from 'react'

export class CompLifeCycle extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       color: "Red"
    }
  }
  
//   static getDerivedStateFromProps(props){
//     return{
//         color:props.newColor
//     }
//   }

    // componentDidMount(){
    //     setTimeout(()=> {
    //         this.setState((prevState)=> ({color:"yellow"}))
    //     }, 3000)
    // }
  
    shouldComponentUpdate(){
        return true;
    }
    getSnapshotBeforeUpdate(prevProps,prevState){
        document.getElementById("beforeupdate").innerHTML=`My Favourite color before was ${this.prevState.color}`
    }

    componentDidUpdate(){
        document.getElementById("afterupdate").innerHTML=`My Favourite color after was ${this.state.color}`
    }
    changeColor=()=>{
        this.setState((prevState)=>({color:"blue"}))
    }

    render() {
    return (
      <div>
        <h2> This is class Lifecycle component</h2>
        <p> Color is: {this.state.color}</p>
        <button type='button' onClick={()=>this.changeColor()}> Change Color </button>
        <div id='beforeupdate'></div>
        <div id='afterupdate'></div>
        
      </div>
    )
  }
}

export default CompLifeCycle
