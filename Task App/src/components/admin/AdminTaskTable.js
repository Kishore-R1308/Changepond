import React from 'react';

const AdminTaskTable = ({ tasks, onEdit, onDelete, setViewingTask }) => {
  const getMinutesBetween = (startStr, endStr) => {
    if (!startStr || !endStr) return 0;
    const [sh, sm] = startStr.split(':').map(Number);
    const [eh, em] = endStr.split(':').map(Number);
    let startMins = (sh * 60) + sm;
    let endMins = (eh * 60) + em;
    if (endMins < startMins) endMins += 24 * 60;
    return endMins - startMins;
  };

  return (
    <div className="border rounded shadow-sm mb-4" style={{ overflow: 'hidden', borderColor: '#e0e0e0' }}>
      <div className="table-responsive">
        <table className="table mb-0 text-center" style={{ verticalAlign: 'middle', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#000', color: '#fff' }}>
            <tr>
              <th className="py-3 border-0" style={{ fontWeight: '600', width: '20%' }}>Task</th>
              <th className="py-3 border-0" style={{ fontWeight: '600', width: '15%', color: '#0dcaf0' }}>Employee</th>
              <th className="py-3 border-0" style={{ fontWeight: '600', width: '20%' }}>Description</th>
              <th className="py-3 border-0" style={{ fontWeight: '600' }}>Date</th>
              <th className="py-3 border-0" style={{ fontWeight: '600' }}>Start</th>
              <th className="py-3 border-0" style={{ fontWeight: '600' }}>End</th>
              <th className="py-3 border-0" style={{ fontWeight: '600' }}>Total Time</th>
              <th className="py-3 border-0" style={{ fontWeight: '600', width: '15%' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
               <tr>
                  <td colSpan="8" className="text-center py-4 text-muted">No tasks found.</td>
               </tr>
            ) : tasks.map((task, index) => (
              <tr key={task.id} style={{ backgroundColor: index % 2 !== 0 ? '#f8f9fa' : '#ffffff', borderBottom: '1px solid #dee2e6' }}>
                <td className="py-3 text-dark" style={{ fontSize: '14px' }}>{task.task}</td>
                
                <td className="py-3 fw-bold" style={{ fontSize: '13px', color: '#0d6efd' }}>{task.creatorName || task.createdBy}</td>

                <td className="py-3 text-dark" style={{ fontSize: '14px' }}>{task.description}</td>
                <td className="py-3 text-dark text-muted" style={{ fontSize: '13px' }}>{task.date}</td>
                <td className="py-3 text-dark" style={{ fontSize: '14px' }}>{task.start}</td>
                <td className="py-3 text-dark" style={{ fontSize: '14px' }}>{task.end}</td>
                <td className="py-3 text-dark fw-medium" style={{ fontSize: '14px' }}>
                   {Math.floor(getMinutesBetween(task.start, task.end) / 60)}:{(getMinutesBetween(task.start, task.end) % 60).toString().padStart(2, '0')}
                </td>

                <td className="py-3 text-center">
                  <div className="d-flex justify-content-center gap-1">
                    <button onClick={() => setViewingTask(task)} className="btn btn-sm text-white" style={{ backgroundColor: '#0d6efd', border: 'none', padding: '4px 10px', borderRadius: '4px' }}>
                      <i className="bi bi-eye-fill"></i>
                    </button>
                    <button onClick={() => onEdit(task)} className="btn btn-sm text-white" style={{ backgroundColor: '#198754', border: 'none', padding: '4px 10px', borderRadius: '4px' }}>
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button onClick={() => onDelete(task.id)} className="btn btn-sm text-white" style={{ backgroundColor: '#dc3545', border: 'none', padding: '4px 10px', borderRadius: '4px' }}>
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTaskTable;