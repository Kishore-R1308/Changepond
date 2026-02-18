

import React from 'react'

const KishoreFun = (props) => {
  return (
    <>
    <br/>
        <b>Functional component:</b> <br/>
        {`First Name: ${props.fname}`} <br/>
        {`Last Name: ${props.lname}`} <br/>
        {`Email: ${props.email}`} <br/>
        {`Contact: ${props.contact}`} <br/>
        {`City: ${props.city}`} <br/>
    </>
  )
}

export default KishoreFun