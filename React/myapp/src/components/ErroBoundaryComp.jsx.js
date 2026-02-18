import { Component } from "react";

class ErroBoundaryComp extends Component{
    constructor(props){
        super(props)

        this.state = {
            isCond:false
        }
    }

    static getDerivedStateFromError(){
        return{
            isCond:false
        }
    }
    
    componentDidCatch(error){
        console.log(error);
    }

    render(){
            if(this.state.isCond){
            console.log("Working");
            return <b>Not a User</b>
        }
        return this.props.children;
    }
}

export default ErroBoundaryComp