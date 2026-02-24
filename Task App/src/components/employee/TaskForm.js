import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSave, editingTask, onCancel }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.task);
      setDesc(editingTask.description);
      setStart(editingTask.start);
      setEnd(editingTask.end);
    } else {
      setTitle('');
      setDesc('');
      setStart('');
      setEnd('');
    }
  }, [editingTask]);

  const handleSubmit = () => {
    let newErrors = {};
    if (!title) newErrors.title = "Task name is required";
    if (!desc) newErrors.desc = "Task description is required";
    if (!start) newErrors.start = "Start time is required";
    if (!end) newErrors.end = "End time is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({ title, desc, start, end });
    if (!editingTask) {
        setTitle('');
        setDesc('');
        setStart('');
        setEnd('');
    }
  };

  return (
    <div className="mb-4 mt-4 animate__animated animate__fadeIn">
      <div className="mb-3">
        <label className="form-label text-muted small mb-1">Task Title</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="form-control shadow-none" placeholder="Enter task name" style={{ borderColor: '#ced4da' }} />
        {errors.title && <div className="text-danger mt-1" style={{ fontSize: '13px' }}>{errors.title}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label text-muted small mb-1">Description</label>
        <input type="text" value={desc} onChange={e => setDesc(e.target.value)} className="form-control shadow-none" placeholder="Enter details..." style={{ borderColor: '#ced4da' }} />
        {errors.desc && <div className="text-danger mt-1" style={{ fontSize: '13px' }}>{errors.desc}</div>}
      </div>

      <div className="row g-3">
        <div className="col-md-4">
          <label className="form-label text-muted small mb-1">Start Time (HH:MM)</label>
          <input type="time" value={start} onChange={e => setStart(e.target.value)} className="form-control text-muted shadow-none" style={{ borderColor: '#ced4da' }} />
          {errors.start && <div className="text-danger mt-1" style={{ fontSize: '13px' }}>{errors.start}</div>}
        </div>
        <div className="col-md-4">
          <label className="form-label text-muted small mb-1">End Time (HH:MM)</label>
          <input type="time" value={end} onChange={e => setEnd(e.target.value)} className="form-control text-muted shadow-none" style={{ borderColor: '#ced4da' }} />
          {errors.end && <div className="text-danger mt-1" style={{ fontSize: '13px' }}>{errors.end}</div>}
        </div>
        <div className="col-md-4 d-flex align-items-start" style={{ paddingTop: '24px' }}>
          <button onClick={handleSubmit} className={`btn ${editingTask ? 'btn-success' : 'btn-primary'} w-100 shadow-none`} style={{ backgroundColor: editingTask ? '#198754' : '#0d6efd', border: 'none', borderRadius: '4px', padding: '9px 12px' }}>
            {editingTask ? 'Update Task' : 'Add Task'}
          </button>
          {editingTask && (
            <button onClick={onCancel} className="btn btn-secondary shadow-none ms-2" style={{ padding: '9px 12px' }}>Cancel</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskForm;