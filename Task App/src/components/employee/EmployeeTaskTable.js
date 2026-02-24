import React, { useState } from 'react';

const EmployeeTaskTable = ({ tasks, onEdit, onDelete, setViewingTask }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getTodayDateString = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getMinutesBetween = (startStr, endStr) => {
    if (!startStr || !endStr) return 0;
    const [sh, sm] = startStr.split(':').map(Number);
    const [eh, em] = endStr.split(':').map(Number);
    let startMins = (sh * 60) + sm;
    let endMins = (eh * 60) + em;
    if (endMins < startMins) endMins += 24 * 60;
    return endMins - startMins;
  };

  // Pagination Logic
  const totalPages = Math.ceil(tasks.length / rowsPerPage);
  const indexOfLastTask = currentPage * rowsPerPage;
  const indexOfFirstTask = indexOfLastTask - rowsPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const nextPage = () => setCurrentPage(p => Math.min(p + 1, totalPages));
  const prevPage = () => setCurrentPage(p => Math.max(p - 1, 1));

  return (
    <>
      <div className="table-responsive">
        <table className="table mb-0" style={{ verticalAlign: 'middle', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#000', color: '#fff' }}>
            <tr>
              <th className="py-3 px-3 border-0" style={{ width: '25%', fontWeight: '600' }}>Task</th>
              <th className="py-3 border-0 text-center" style={{ width: '30%', fontWeight: '600' }}>Description</th>
              <th className="py-3 border-0 text-center" style={{ fontWeight: '600' }}>Start</th>
              <th className="py-3 border-0 text-center" style={{ fontWeight: '600' }}>End</th>
              <th className="py-3 border-0 text-center" style={{ fontWeight: '600' }}>Total Task Time</th>
              <th className="py-3 border-0 text-center" style={{ fontWeight: '600' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">No tasks found.</td>
              </tr>
            ) : currentTasks.map((task, index) => {
              const isCreatedToday = task.date === getTodayDateString();
              const canModify = isCreatedToday; 

              return (
                <tr key={task.id} style={{ backgroundColor: index % 2 !== 0 ? '#f8f9fa' : '#ffffff', borderBottom: '1px solid #dee2e6' }}>
                  <td className="py-3 px-3 text-dark" style={{ fontSize: '14px' }}>
                    {task.task} {!canModify && <i className="bi bi-lock-fill text-muted ms-2" style={{fontSize: '11px', opacity: 0.5}} title="Past Task"></i>}
                  </td>
                  <td className="py-3 text-dark text-center" style={{ fontSize: '14px' }}>{task.description}</td>
                  <td className="py-3 text-dark text-center" style={{ fontSize: '14px' }}>{task.start}</td>
                  <td className="py-3 text-dark text-center" style={{ fontSize: '14px' }}>{task.end}</td>
                  <td className="py-3 text-dark text-center" style={{ fontSize: '14px' }}>{task.total}</td>
                  <td className="py-3 text-center">
                    <div className="d-flex justify-content-center gap-1">
                      <button onClick={() => setViewingTask(task)} className="btn btn-sm text-white" style={{ backgroundColor: '#0d6efd', border: 'none', padding: '4px 10px', borderRadius: '4px' }}>
                        <i className="bi bi-eye-fill"></i>
                      </button>
                      <button 
                        onClick={() => onEdit(task)}
                        disabled={!canModify}
                        className={`btn btn-sm text-white ${!canModify ? 'opacity-50' : ''}`} 
                        style={{ backgroundColor: '#198754', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: canModify ? 'pointer' : 'not-allowed' }}
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </button>
                      <button 
                        onClick={() => onDelete(task.id)}
                        disabled={!canModify}
                        className={`btn btn-sm text-white ${!canModify ? 'opacity-50' : ''}`} 
                        style={{ backgroundColor: '#dc3545', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: canModify ? 'pointer' : 'not-allowed' }}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-end align-items-center mt-3 mb-4 text-dark" style={{ fontSize: '13px' }}>
        <div className="d-flex align-items-center me-4">
          <span className="me-2 text-muted">Rows per page:</span>
          <select 
            value={rowsPerPage} 
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1); 
            }}
            className="form-select form-select-sm border-0 shadow-none bg-transparent fw-bold text-dark px-0 pe-3"
            style={{ width: 'auto', cursor: 'pointer' }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div className="me-4 text-muted">
          {tasks.length > 0 ? indexOfFirstTask + 1 : 0}–{Math.min(indexOfLastTask, tasks.length)} of {tasks.length}
        </div>
        <div className="d-flex gap-3 text-muted">
          <i 
            className="bi bi-chevron-left" 
            style={{ cursor: currentPage > 1 ? 'pointer' : 'default', opacity: currentPage > 1 ? 1 : 0.5, color: currentPage > 1 ? '#000' : '' }} 
            onClick={currentPage > 1 ? prevPage : undefined}
          ></i>
          <i 
            className="bi bi-chevron-right" 
            style={{ cursor: currentPage < totalPages ? 'pointer' : 'default', opacity: currentPage < totalPages ? 1 : 0.5, color: currentPage < totalPages ? '#000' : '' }} 
            onClick={currentPage < totalPages ? nextPage : undefined}
          ></i>
        </div>
      </div>
    </>
  );
};

export default EmployeeTaskTable;