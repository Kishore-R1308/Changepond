const userComp  = (props) => {
    if (props.user === "Ganesh") {
        throw new("Not a user");
    }
    return <div>{props.user}</div>
}

export default userComp