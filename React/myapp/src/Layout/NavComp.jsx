import React from 'react'
import { Link } from 'react-router-dom'


const NavComp = () => {
  return (
    <>
    
     <div>This is Nav</div>
    <Link to="myimages" className='btn btn-primary'>Myimges</Link>{"  "}
    <Link to="hooks" className='btn btn-primary'>Hooks</Link>{"  "}
    <Link to="virtualdom" className='btn btn-primary'>VirtualDOM</Link>{"  "}
    <Link to="formval" className='btn btn-primary'>Form Validation</Link>{"  "}
    <Link to="productdetail" className='btn btn-primary'>Product Details</Link>{"  "}
    <Link to="addproduct" className='btn btn-primary'>Add Details</Link>{"  "}
    <Link to="comp" className='btn btn-primary'>Prop Comp</Link>{"  "}
    <Link to="datalist" className='btn btn-primary'>Data List</Link>{"  "}
    </>
  )
}

export default NavComp