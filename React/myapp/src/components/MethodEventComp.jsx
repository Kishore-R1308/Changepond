import { Component } from "react";

class MethodEventComp extends Component{
    

    constructor(){
        super();
        this.state={
            salary:200
        }

    } 

    updateSal=()=>{
        this.setState((prevSat)=> ({
            salary: prevSat.salary + 1000
        }));
    }

    greet = () => {
        window.alert("Good Morning")
    }

    welcome=(...std) =>{
        window.alert(`welcome you ${std} in react`)
    }

    render(){
        return(
        <>
        <br></br>
        This is Method event comp
       
        <button type ="button" onClick={this.greet}>Greet</button>
        <br></br>
        <button type ="buttom" onClick={() =>this.welcome("rethu","nirmal")}> welcome</button>
        <br></br>
        <h2 onMouseOver={()=> this.welcome("kishore","jaff")}> hover mouse over me</h2>
        <br></br>
        <h2> salary is {this.state.salary}</h2>
        <br></br>
        <button type ="button" onClick={() =>this.updateSal()}> update salary</button>
         
        </>
        )
    }
}

export default MethodEventComp