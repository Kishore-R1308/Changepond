import React from 'react';

const SelectLogin = ({ onSelect }) => {
  return (
    <div className="d-flex flex-column gap-3 mt-2">
      <button onClick={() => onSelect('admin')} className="btn btn-outline-primary py-3 d-flex align-items-center justify-content-center gap-2 fs-5">
        <i className="bi bi-shield-lock-fill"></i> Admin Login
      </button>
      <button onClick={() => onSelect('employee')} className="btn btn-primary shadow-none py-3 d-flex align-items-center justify-content-center gap-2 fs-5" style={{ backgroundColor: '#0d6efd' }}>
        <i className="bi bi-person-fill"></i> Employee Login
      </button>
    </div>
  );
};

export default SelectLogin;