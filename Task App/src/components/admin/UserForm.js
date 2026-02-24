import React, { useState, useEffect } from 'react';

const UserForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (formData.email && !formData.email.includes('@')) newErrors.email = "Invalid email";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({ ...user, name: formData.name, email: formData.email });
    setErrors({});
  };

  return (
    <div className="modal-backdrop fade show" style={{ zIndex: 1050, backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 1060 }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-bottom-0">
              <h5 className="modal-title fw-bold">Edit User</h5>
              <button type="button" className="btn-close" onClick={onCancel}></button>
            </div>
            <div className="modal-body py-4 px-4">
              <div className="mb-3">
                <label className="form-label small text-muted">Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="name"
                  value={formData.name} 
                  onChange={handleChange}
                  style={{ borderColor: errors.name ? 'red' : '' }}
                />
                {errors.name && <div className="text-danger small mt-1">{errors.name}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label small text-muted">Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  name="email"
                  value={formData.email} 
                  onChange={handleChange}
                  style={{ borderColor: errors.email ? 'red' : '' }}
                />
                {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
              </div>
            </div>
            <div className="modal-footer border-top-0 justify-content-center pb-4">
              <button className="btn btn-light px-4" onClick={onCancel}>
                Cancel
              </button>
              <button className="btn btn-primary px-4" onClick={handleSubmit}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
