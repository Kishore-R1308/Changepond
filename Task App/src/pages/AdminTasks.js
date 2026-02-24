import React, { useState } from 'react';
import Header from '../components/layout/Header';
import AdminTaskTable from '../components/admin/AdminTaskTable';
import AdminFilters from '../components/admin/AdminFilters';

const AdminTasks = ({ currentUser, onLogout, tasks, users, onNavigate, targetUserEmail, setTargetUserEmail, onEdit, onDelete, setViewingTask }) => {
  const [filters, setFilters] = useState({
    date: '',
    from: '',
    to: '',
    month: '',
    task: ''
  });

  // Filter Logic
  const filteredTasks = tasks.filter(task => {
    // 1. User Filter (Admin Clicked a User or Viewing All)
    if (targetUserEmail && task.createdBy !== targetUserEmail) return false;

    // 2. Search Filters
    if (filters.date && task.date !== filters.date) return false;
    if (filters.from && task.date < filters.from) return false;
    if (filters.to && task.date > filters.to) return false;
    if (filters.month && !task.date.startsWith(filters.month)) return false;
    if (filters.task && !task.task.toLowerCase().includes(filters.task.toLowerCase())) return false;

    return true;
  });

  const getMinutesBetween = (startStr, endStr) => {
    if (!startStr || !endStr) return 0;
    const [sh, sm] = startStr.split(':').map(Number);
    const [eh, em] = endStr.split(':').map(Number);
    let startMins = (sh * 60) + sm;
    let endMins = (eh * 60) + em;
    if (endMins < startMins) endMins += 24 * 60;
    return endMins - startMins;
  };

  // Summary Logic
  const totalMinutes = filteredTasks.reduce((acc, task) => acc + getMinutesBetween(task.start, task.end), 0);
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;
  const formattedTotalTime = `${totalHours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')} hrs`;

  return (
    <div>
      <Header currentUser={currentUser} onLogout={onLogout} />
      <div className="container-fluid px-4 py-3 bg-white" style={{ minHeight: 'calc(100vh - 60px)' }}>
        <AdminFilters 
          filters={filters} 
          setFilters={setFilters} 
          users={users} 
          targetUserEmail={targetUserEmail} 
          setTargetUserEmail={setTargetUserEmail} 
        />
        
        <AdminTaskTable 
          tasks={filteredTasks} 
          onEdit={onEdit} 
          onDelete={onDelete} 
          setViewingTask={setViewingTask} 
        />

        <div className="border rounded px-4 py-3" style={{ backgroundColor: '#fff', borderColor: '#e0e0e0' }}>
          <h6 className="fw-bold mb-2 text-dark" style={{ fontSize: '15px' }}>Summary</h6>
          <div style={{ fontSize: '14px', color: '#1a1a1a' }}>
            <strong>Total Time:</strong> {formattedTotalTime}
          </div>
        </div>

        <div className="mt-4 pb-4 text-center text-sm-start">
          <button onClick={onNavigate} className="btn btn-outline-secondary px-4 py-2 fw-medium shadow-sm" style={{ borderRadius: '4px' }}>
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminTasks;