import React from 'react';
import Header from '../components/layout/Header';
import EmployeeTable from '../components/admin/EmployeeTable';
import TaskForm from '../components/employee/TaskForm';

const AdminDashboard = ({ currentUser, onLogout, users, tasks, onNavigate, onNavigateUser, taskToEdit, onSave, onCancelEdit }) => {
  return (
    <div>
      <Header currentUser={currentUser} onLogout={onLogout} />
      
      <div className="container-fluid px-4 py-3 bg-white" style={{ minHeight: 'calc(100vh - 60px)' }}>
        <div className="d-flex justify-content-between align-items-center mb-4 mt-2 border-bottom pb-3">
          <h3 className="m-0 fw-bold" style={{ color: '#333' }}>Employee Task Dashboard</h3>
          <button onClick={onNavigate} className="btn btn-primary shadow-none" style={{ backgroundColor: '#0d6efd', border: 'none', borderRadius: '4px' }}>
            View All Tasks
          </button>
        </div>

        {/* If Admin is editing, show the form */}
        {taskToEdit && (
          <TaskForm 
            onSave={onSave} 
            editingTask={taskToEdit} 
            onCancel={onCancelEdit} 
          />
        )}

        <EmployeeTable 
          users={users} 
          tasks={tasks} 
          onNavigateUser={onNavigateUser} 
        />
      </div>
    </div>
  );
};

export default AdminDashboard;