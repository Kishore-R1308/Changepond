import React, { useState } from 'react'

const FormValComp = () => {
    const [user,setUser] = useState({
        fname:"",
        lname:"",
        password:""
    })

    const inputChange=(event)=>{
        const {name,value} = event.target
        setUser({...user, [name]: value})
        
    }

    const checkData = (event)=>{
        event.preventDefault();
        if(user.fname===""){
            window.alert("first name is Required");
            return;
        }
   
   if(!user.fname.match("[a-zA-Z]{2,15}")){
      window.alert("first name contain only character min-2 and max-15");
     return;
   }
   if(user.lname===""){
     window.alert("last name is Required");
     return;
   }
   if(!user.lname.match("[a-zA-Z]{1,5}")){
      window.alert("last name contain only character min-1 and max-5");
     return;
   }
    
       if (user.password.length < 6) {
      alert("Password must be at least 6 characters")
      return
    }
    
    if (!user.password.match(/(?=.*[0-9])/)) {
    window.alert("Password must contain at least one number")
    return
    }
   window.alert(JSON.stringify(user));
}
  return (
    <div>
        <h2>Form Validation</h2>
        <form onSubmit={checkData}>
            
            <input type='text' name='fname' onChange={inputChange} placeholder='enter first name'  value={user.fname}/>
            <br/>
            <br/>
            <input type='text' name='lname' onChange={inputChange} placeholder='enter lirst name'  value={user.lname}/>
            <br/>
            <br/>
            <input type='password' name='password' onChange={inputChange} placeholder='enter password'  value={user.password}/>
            <br/>
            <br/>
            <button type='submit'>Submit </button>
        </form>
    </div>
  )
}

export default FormValComp