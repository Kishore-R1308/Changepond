import React, { useState } from 'react';

const EmployeeLogin = ({ onLogin, onBack, onRegisterClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password, 'user');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label text-muted small">Employee Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control shadow-none" required />
      </div>
      <div className="mb-4">
        <label className="form-label text-muted small">Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control shadow-none" required />
      </div>
      <button type="submit" className="btn btn-primary w-100 shadow-none fw-medium mb-3" style={{ backgroundColor: '#0d6efd' }}>Login</button>
      <div className="text-center mb-3">
        <a href="#!" onClick={(e) => { e.preventDefault(); onRegisterClick(); }} className="text-decoration-none small text-primary">New Employee? Register Here</a>
      </div>
      <button type="button" onClick={onBack} className="btn btn-light w-100 shadow-none text-muted">← Back</button>
    </form>
  );
};

export default EmployeeLogin;