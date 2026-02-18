import React, { useState } from 'react'
import ProductDetailsComp from './ProductDetailsComp'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddproductComp = () => {
  const nav = useNavigate();
  const [product,setProduct] = useState({
    pname:"",
    pprice:"",
    pcompany:""
  })

  const inputChangeHandler = (event)=> {
    const {name,value} = event.target;
    setProduct({...product,[name]:value});
  }

  const addProductData=(event) => {
    event.preventDefault();
    axios.post('http://localhost:5555/product',product).then(()=>{
      window.alert("Product added successfully");
      nav("/dashboard/productdetail"); 
    }).catch((error)=>{})
  }
  return (
    <div>
        <h2> This is add product comp</h2>
      <form onSubmit={addProductData}>
        <input type='text' name='pname' onChange={inputChangeHandler} placeholder='enter product name' value={product.pname} /><br /><br />
        <input type='text' name='pprice' onChange={inputChangeHandler}placeholder='enter price' value={product.pprice} /><br /><br />
        <input type='text' name='pcompany' onChange={inputChangeHandler} placeholder='enter company name ' value={product.pcompany} /><br /><br />
        <button type='submit' className='btn btn-primary mt-1' >submit</button>
      </form>
    </div>
  )
}

export default AddproductComp