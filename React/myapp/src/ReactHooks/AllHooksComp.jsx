import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

const AllHooksComp = () => {
  return (
    <div>
      {/* <h2> This All Hooks Component</h2>
      <Outlet /> */}
      <div className='card bordr-primary'>
        <div className='card-header border-primary'>
          <Link to="myimages" className="btn btn-success btn-sm">myimages</Link>{" "}
          <Link to="usestate" className="btn btn-success btn-sm">useState</Link>{" "}
          <Link to="useeffect" className="btn btn-success btn-sm">useeffect</Link>{" "}

        </div>
        <div className="card-body border-primary">
          <Outlet />
        </div>

      </div>
    </div>

  );
}

export default AllHooksComp