import React, { useState } from 'react';

const ForgotPasswordForm = ({ onBack, onSubmit, users }) => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!email.includes('@')) {
      newErrors.email = "Invalid email format";
    } else {
      const user = users.find(u => u.email === email && u.role === 'user');
      if (!user) {
        newErrors.email = "No employee account found with this email";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    await onSubmit(email);
    setSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setErrors({});
      onBack();
    }, 2000);
  };

  if (submitted) {
    return (
      <form className="text-center">
        <div className="mb-4">
          <i
            className="bi bi-check-circle"
            style={{ fontSize: '48px', color: '#28a745' }}
          ></i>
        </div>
        <h5 className="text-success fw-bold mb-2">Request Submitted!</h5>
        <p className="text-muted small">
          Your password reset request has been sent to the admin. You will be notified once approved.
        </p>
        <p className="text-muted small">Redirecting...</p>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-3">
        <label className="form-label text-muted small">Email Address</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors({});
          }}
          style={{ borderColor: errors.email ? 'red' : '' }}
          placeholder="Enter your email"
        />
        {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
      </div>
      <button type="submit" className="btn btn-primary w-100 mb-3" style={{ backgroundColor: '#0d6efd' }}>
        Request Password Reset
      </button>
      <button type="button" onClick={onBack} className="btn btn-light w-100">
        Back to Login
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
