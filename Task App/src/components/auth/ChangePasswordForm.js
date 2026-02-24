import React, { useState } from 'react';

const ChangePasswordForm = ({ currentUser, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    // Validation
    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
    } else if (formData.currentPassword !== currentUser.password) {
      newErrors.currentPassword = "Current password is incorrect";
    }

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    } else if (formData.newPassword === formData.currentPassword) {
      newErrors.newPassword = "New password must be different from current password";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save the new password
    await onSave(formData.newPassword);
    setShowSuccess(true);
    
    setTimeout(() => {
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowSuccess(false);
      onCancel();
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="card shadow-sm" style={{ width: '400px', border: 'none', borderRadius: '8px' }}>
          <div className="card-body text-center py-5">
            <i className="bi bi-check-circle mb-3" style={{ fontSize: '48px', color: '#28a745' }}></i>
            <h5 className="text-success fw-bold mt-3 mb-2">Password Changed Successfully!</h5>
            <p className="text-muted small">Your password has been updated. Redirecting to dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="card shadow-sm" style={{ width: '450px', border: 'none', borderRadius: '8px' }}>
        <div className="card-header text-center text-white" style={{ backgroundColor: '#0dcaf0', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
          <h4 className="mb-0 text-dark fw-bold">Change Password</h4>
          <p className="small mb-0 mt-2 text-dark">Please set a new password</p>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label small text-muted">Current Password</label>
              <input
                type="password"
                className="form-control"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
                style={{ borderColor: errors.currentPassword ? 'red' : '' }}
              />
              {errors.currentPassword && <div className="text-danger small mt-1">{errors.currentPassword}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label small text-muted">New Password</label>
              <input
                type="password"
                className="form-control"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password (min 6 characters)"
                style={{ borderColor: errors.newPassword ? 'red' : '' }}
              />
              {errors.newPassword && <div className="text-danger small mt-1">{errors.newPassword}</div>}
            </div>

            <div className="mb-4">
              <label className="form-label small text-muted">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your new password"
                style={{ borderColor: errors.confirmPassword ? 'red' : '' }}
              />
              {errors.confirmPassword && <div className="text-danger small mt-1">{errors.confirmPassword}</div>}
            </div>

            <button type="submit" className="btn btn-success w-100 mb-3">
              Change Password
            </button>
            <button type="button" onClick={onCancel} className="btn btn-light w-100">
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
