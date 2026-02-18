import { Component } from "react";

class KishoreComp extends Component{
   constructor(){
        super();
        this.state={
            fname:"kishore",
            lname:"R",
            email: "kishore@gmail.com",
            contact: "9876543210",
            city: "Chennai",
        }

    } 

    render(){
        return(
            <>
            <b>Class Component:</b> <br/>
                {`First Name: ${this.state.fname}`} <br/>
                {`Last Name: ${this.state.lname}`} <br/>
                {`Email: ${this.state.email}`} <br/>
                {`Contact: ${this.state.contact}`} <br/>
                {`City: ${this.state.city}`} <br/>
            </>
        )
}
}

export default KishoreComp