import React from 'react';

const AdminFilters = ({ filters, setFilters, users, targetUserEmail, setTargetUserEmail }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({
      date: '',
      from: '',
      to: '',
      month: '',
      task: ''
    });
  };

  const hasFilters = Object.values(filters).some(val => val !== '');

  return (
    <>
      <div className="row g-3 mb-4 mt-2">
        <div className="col">
          <label className="form-label fw-bold small text-dark mb-1">Date</label>
          <input 
            type="date" 
            name="date"
            value={filters.date}
            onChange={handleChange}
            className="form-control text-muted shadow-none" 
            style={{ borderColor: '#ced4da' }} 
          />
        </div>
        <div className="col">
          <label className="form-label fw-bold small text-dark mb-1">From</label>
          <input 
            type="date" 
            name="from"
            value={filters.from}
            onChange={handleChange}
            className="form-control text-muted shadow-none" 
            style={{ borderColor: '#ced4da' }} 
          />
        </div>
        <div className="col">
          <label className="form-label fw-bold small text-dark mb-1">To</label>
          <input 
            type="date" 
            name="to"
            value={filters.to}
            onChange={handleChange}
            className="form-control shadow-none" 
            style={{ borderColor: '#86b7fe', boxShadow: '0 0 0 0.25rem rgba(13, 110, 253, 0.25)' }} 
           />
        </div>
        <div className="col">
          <label className="form-label fw-bold small text-dark mb-1">Month</label>
          <input 
            type="month" 
            name="month"
            value={filters.month}
            onChange={handleChange}
            className="form-control text-muted shadow-none" 
            style={{ borderColor: '#ced4da' }} 
          />
        </div>
        
        <div className="col">
          <label className="form-label fw-bold small text-dark mb-1">Task Title Search</label>
          <div className="position-relative">
            <input 
              type="text" 
              name="task"
              placeholder="Search tasks..."
              value={filters.task}
              onChange={handleChange}
              className="form-control text-muted shadow-none" 
              style={{ borderColor: '#ced4da' }} 
            />
            <i className="bi bi-search position-absolute" style={{ right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d', fontSize: '14px' }}></i>
          </div>
        </div>
      </div>

      <div className="mb-3 d-flex align-items-center">
         {targetUserEmail && (
           <span className="badge bg-primary me-2">
              Viewing: {users.find(u => u.email === targetUserEmail)?.name || targetUserEmail}
              <i className="bi bi-x-circle-fill ms-2 cursor-pointer" onClick={() => setTargetUserEmail('')} style={{cursor: 'pointer'}}></i>
           </span>
         )}

         {hasFilters && (
           <button onClick={clearFilters} className="btn btn-sm btn-link text-danger m-0 p-0 ms-2">
             Clear Filters
           </button>
         )}
      </div>
    </>
  );
};

export default AdminFilters;