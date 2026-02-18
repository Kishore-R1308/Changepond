import React, { useState } from 'react';
import bread from '../../shared/images/bread.jpg';
import dosa from "../../shared/images/dosa.png";

const ToggleComp = () => {
  const [isDosa, setIsDosa] = useState(false);
  const [show, setShow] = useState(false);

  const toggleHandler = () => {
    if (!show) {
      setShow(true);
    } else {
      setIsDosa(!isDosa);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <b>Toggle Images</b> <br /><br />

      <button onClick={toggleHandler}>
        {!show ? 'Show Image' : isDosa ? 'Show bread' : 'Show dosa'}
      </button>

      <br /><br />

      {show && (
        <div>
          {/* This displays the name above the image */}
          <h3 style={{ textTransform: 'capitalize' }}>
            {isDosa ? 'Dosa' : 'bread'}
          </h3>
          
          <img 
            src={isDosa ? dosa : bread} 
            width="500px" 
            height="250px" 
            alt={isDosa ? 'dosa' : 'bread'} 
          />
        </div>
      )}
    </div>
  );
};

export default ToggleComp;
