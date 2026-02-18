import { render } from "@testing-library/react"
import { Component } from "react"

class ClassComp extends Component {
    render(){
        return (
            <>
            {`Class: ${this.props.u} and ${this.props.id}`}
            </>
        )
    }
}

export default ClassComp