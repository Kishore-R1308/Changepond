import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateProductComp = () => {
  const {id} = useParams();
  const nav = useNavigate();

    const [product,setProduct] = useState({
      id:"",
      pname:"",
      pprice:"",
      pcompany:""
    })
  
    const inputChangeHandler = (event)=> {
      const {name,value} = event.target;
      setProduct({...product,[name]:value});
    }
  

  useEffect(()=> {
    axios.get(`http://localhost:5555/product/${id}`).then((res)=>{
      console.log(res.data);
      setProduct(res.data);
    }).catch((error)=>{});
  }, []);

    const addproductData = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:5555/product/${id}`, product)
      .then(() => {
        window.alert("Product updated Successfully");
        nav("/dashboard/datalist"); // it will navigate to this path
      })
      .catch((error) => {});
  };

  return (
    <div>
        <h2> This is Update product comp</h2>
        <form onSubmit={addproductData}>
        <input type='text' name='pname' onChange={inputChangeHandler} placeholder='enter product name' value={product.pname} /><br /><br />
        <input type='text' name='pprice' onChange={inputChangeHandler}placeholder='enter price' value={product.pprice} /><br /><br />
        <input type='text' name='pcompany' onChange={inputChangeHandler} placeholder='enter company name ' value={product.pcompany} /><br /><br />
        <button type='submit' className='btn btn-primary mt-1' >submit</button>
      </form>
    </div>
  )
}

export default UpdateProductComp