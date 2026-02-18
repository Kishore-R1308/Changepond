import React from 'react'
import { Outlet } from 'react-router-dom'

import NavComp from './NavComp'

const DashboardComp = () => {
  return (
    <div className='container'>
      {/* <h2> Dhasboard </h2> */}

      <div className='card bordr-primary'>
        <div className='card-header border-primary'>
          <NavComp />

        </div>
        <div className="card-body border-primary">
          <Outlet />
        </div>
        <div className="card-footer border-primary">
          card footer
        </div>
      </div>
    </div>
  );
}

export default DashboardComp