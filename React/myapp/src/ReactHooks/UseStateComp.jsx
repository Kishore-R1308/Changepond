import React, { useState } from 'react'

const UseStateComp = () => {

  const [count,setCount]=useState(0);
  const [name,setName] = useState("kishore");
  const [course,setCourse]=useState(["react","js","cs","Math","Python"])

  const updatecount=()=>{
    setCount(count+1)
  }

  return (
    <div>this is usestate
    <p>Count: {count}</p>
    <button type='button' onClick={()=>updatecount()}>CountInc</button>
    <button type='button' onClick={()=>setCount(count+1)}>Direct CountInc</button>
    <p>Name: {name}</p>
     <button type='button' onClick={()=>setName("changepond")}>Change Name</button>


      <ul>
        {
          course.map((value,index)=>{
            return <li key={index}>{value}</li>
          })
        }

      </ul>
    
    </div>
  )
}

export default UseStateComp