import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add'
 

const ProductDetailsComp = () => {
  const [products,setProducts] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData=()=>{
    axios.get("http://localhost:5555/product").then((res)=>{
      console.log(res.data);
      setProducts(res.data);
    }).catch((error)=>{})

  }

  const deleteproduct = (id) => {
    if(window.confirm(`Are you sure to delete product with id: ${id}`)){
    axios.delete(`http://localhost:5555/product/${id}`).then(()=>{
        window.alert("Product deleted successfully");
        fetchData();
      }).catch((error)=>{})
    }
  }
  return (
    <div>
        <h2> This is Product Details Comp</h2>

        <Link to="/dashboard/addproduct" className='btn btn-primary mt-2 mb-1'> Add
        <AddIcon> </AddIcon>
        </Link>
        <table className ='table table-striped table-bordered'>
          <thead>
            <tr>
              <th>sr.no</th><th>Name</th><th>Price</th><th>company</th><th>Action</th>

            </tr>
          </thead>
          <tbody>
            {
              products.length > 0 && products.map((value,index)=>{
                return <tr key={value.id}> 
                  <td>{index+1}</td>
                  {/* <td>{value.id}</td> */}
                  <td>{value.pname}</td>
                  <td>{value.pprice}</td>
                  <td>{value.pcompany}</td>
                  <td>
                    <Link to={`/dashboard/updateproduct/${value.id}`} className='btn btn-outline-success btn-sm'>Edit
                    <EditIcon></EditIcon>
                    </Link>
                    <button type ='button' onClick={()=>deleteproduct(value.id)} className='btn btn-outline-danger btn-sm'>Delete
                    <DeleteIcon ></DeleteIcon>
                    </button>
                  </td>
                </tr>
              })
            }
          </tbody>
          </table>
    </div>
  )
}

export default ProductDetailsComp