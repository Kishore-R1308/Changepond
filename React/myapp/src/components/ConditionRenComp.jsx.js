import React, { Component } from 'react'

class ConditionRenComp extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             isCond:true
        }
    }
    
    render() {
        
        // 1.use of if  else 
            let msg='';
            // if(!this.state.isCond){
            //     // return <h2>Admin Login</h2>
            //      msg="Admin Login";
            // }else{
            //      // return <h2>User Login</h2>
            //  msg="User Login"
            // }
         // 2. element as variable
            // return <h2>{msg}</h2>

            // 3. use ternary Operator 
            //return !this.state.isCond ? <h2>Admin Login</h2> : <h2>User Login</h2>
            
            //4. use of short-circuit

            return this.state.isCond && <h2>Admin Login</h2>    

    }
}

export default ConditionRenComp
