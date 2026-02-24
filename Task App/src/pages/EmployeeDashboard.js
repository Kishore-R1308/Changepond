import React from 'react';
import Header from '../components/layout/Header';
import TaskForm from '../components/employee/TaskForm';
import EmployeeTaskTable from '../components/employee/EmployeeTaskTable';
import DailySummary from '../components/employee/DailySummary';

const EmployeeDashboard = ({ currentUser, onLogout, tasks, onNavigate, onSave, onEdit, onDelete, setViewingTask, taskToEdit, onCancelEdit }) => {
  // Only show tasks created by this user
  const userTasks = tasks.filter(t => t.createdBy === currentUser.email);

  return (
    <div>
      <Header currentUser={currentUser} onLogout={onLogout} />
      
      <div className="container-fluid px-4 py-3 bg-white" style={{ minHeight: 'calc(100vh - 60px)' }}>
        <div className="d-flex justify-content-between align-items-center mb-4 mt-2 border-bottom pb-3">
          <h3 className="m-0 fw-bold" style={{ color: '#333' }}>Employee Task Dashboard</h3>
          <button onClick={onNavigate} className="btn btn-primary shadow-none" style={{ backgroundColor: '#0d6efd', border: 'none', borderRadius: '4px' }}>
            Go to Task Detail
          </button>
        </div>

        <TaskForm 
          onSave={onSave} 
          editingTask={taskToEdit} 
          onCancel={onCancelEdit} 
        />

        <EmployeeTaskTable 
          tasks={userTasks} 
          onEdit={onEdit} 
          onDelete={onDelete} 
          setViewingTask={setViewingTask} 
        />

        <DailySummary tasks={userTasks} />
      </div>
    </div>
  );
};

export default EmployeeDashboard;