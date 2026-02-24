import React from 'react';

const Header = ({ currentUser, onLogout }) => {
  return (
    <nav className="navbar" style={{ backgroundColor: '#0dcaf0', padding: '10px 20px' }}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-boxes" style={{ fontSize: '24px', color: '#1a1a1a' }}></i>
          <span className="fw-bold text-dark d-none d-sm-block">
            Welcome, {currentUser.role === 'admin' ? 'Admin' : currentUser.name}
          </span>
        </div>
        <div className="d-flex gap-2">
          <button 
            onClick={onLogout} 
            className="btn btn-primary btn-sm px-3 py-1 fw-medium shadow-none" 
            style={{ backgroundColor: '#0d6efd', border: 'none', borderRadius: '4px' }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;