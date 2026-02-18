

import React from 'react'
import samosa from '../shared/images/samosa.png';


const MyImagesComp = () => {
    return (
        <div>
            <h2>This is MY Images component</h2>
           <img src={samosa} alt='Samosa' height='200px' width='200px' /> <br/>
           
               
        </div>
    )
}

export default MyImagesComp

