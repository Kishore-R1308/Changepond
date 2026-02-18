import React, { useState } from 'react'
import samosa from "../../shared/images/samosa.png"
import dosa from "../../shared/images/dosa.png"
import idly from "../../shared/images/idly.png"

const MultiToggleComp = () => {
  const [show, setShow] = useState(null)
    return (
      <div style={{ textAlign : 'center'}}>
          <b> Toggle Image</b> <br /><br /><br />
  
          
          <button onClick={() => setShow(dosa)}>
            Show Dosa
          </button>
          <button onClick={() => setShow(idly)}>
            Show Idly
          </button>
          <button onClick={() => setShow(samosa)}>
            Show Samosa
          </button>
  
          <br /> <br />
  
          {show && (
            <img src={show} width="500px" height="250px" />
          )}
    </div>
    )
}

export default MultiToggleComp