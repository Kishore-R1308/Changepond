import { Component } from "react";

class StateComp extends Component {

    constructor(){
        super();

        this.state = {
            name : 'Rethu',
            id: 12
        }

        setTimeout(() => {

            this.setState({name:"rethu1" , id: this.state.id + 5})
        },10000)
    }

    render(){
        return (
            // <>
            // {`${this.props.u}`}
            // </>

            <>
            {this.state.name}
            {this.state.id}
            </>
        )
    }
}

export default StateComp