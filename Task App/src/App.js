import React, { useState, useEffect } from 'react';
// Import Routing Components
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import ForgotPasswordForm from './components/auth/ForgotPasswordForm';
import ChangePasswordForm from './components/auth/ChangePasswordForm';
import PasswordChangeModal from './components/auth/PasswordChangeModal';

// --- API CONFIGURATION ---
const API_URL = 'http://localhost:3001';

// --- HELPER FUNCTIONS ---
const formatTimeAMPM = (timeStr) => {
  if (!timeStr) return "";
  const [hours, minutes] = timeStr.split(':');
  let h = parseInt(hours, 10);
  const m = minutes;
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  h = h ? h : 12; 
  return `${h}:${minutes} ${ampm}`;
};

const calculateTotalTimeDecimal = (startStr, endStr) => {
  if (!startStr || !endStr) return "0.00 Hr";
  const [sh, sm] = startStr.split(':').map(Number);
  const [eh, em] = endStr.split(':').map(Number);
  let startMins = (sh * 60) + sm;
  let endMins = (eh * 60) + em;
  if (endMins < startMins) endMins += 24 * 60;
  const diffMins = endMins - startMins;
  return (diffMins / 60).toFixed(2) + " Hr";
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

const getTodayDateString = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const timeToMinutes = (timeStr) => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
};

// --- REUSABLE REACT MODAL ---
const CustomPopup = ({ title, message, onConfirm, onCancel, confirmText = "OK", cancelText, isDanger }) => (
  <>
    <div className="modal-backdrop fade show" style={{ zIndex: 1050, backgroundColor: 'rgba(0,0,0,0.5)' }}></div>
    <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 1060 }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg">
          <div className={`modal-header border-bottom-0 ${isDanger ? 'bg-danger text-white' : ''}`}>
            <h5 className="modal-title fw-bold">{title}</h5>
            {onCancel && <button type="button" className="btn-close" onClick={onCancel}></button>}
          </div>
          <div className="modal-body py-4 px-4 text-center">
             <p className="mb-0 fs-5">{message}</p>
          </div>
          <div className="modal-footer border-top-0 justify-content-center pb-4">
            {onCancel && (
              <button className="btn btn-light px-4" onClick={onCancel}>
                {cancelText || "Cancel"}
              </button>
            )}
            <button 
              className={`btn ${isDanger ? 'btn-danger' : 'btn-primary'} px-4`} 
              style={!isDanger ? {backgroundColor: '#0d6efd'} : {}}
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
);

// --- APP WRAPPER FOR ROUTING ---
export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

// --- MAIN CONTENT ---
function AppContent() {
  const [currentUser, setCurrentUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [passwordResets, setPasswordResets] = useState([]);
  
  // App State
  const [taskToEdit, setTaskToEdit] = useState(null); 
  const [userToEdit, setUserToEdit] = useState(null); // New state for editing users
  const [targetUserEmail, setTargetUserEmail] = useState('');
  const [viewingTask, setViewingTask] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [needsPasswordChange, setNeedsPasswordChange] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const navigate = useNavigate();

  // --- FETCH DATA ---
  const refreshData = async () => {
    try {
      const usersResponse = await fetch(`${API_URL}/users`);
      const tasksResponse = await fetch(`${API_URL}/tasks`);
      const passwordResetsResponse = await fetch(`${API_URL}/passwordResets`);
      const usersData = await usersResponse.json();
      const tasksData = await tasksResponse.json();
      const passwordResetsData = await passwordResetsResponse.json();
      setUsers(usersData);
      setTasks(tasksData.reverse());
      setPasswordResets(passwordResetsData);
    } catch (error) {
      console.error("Database Error:", error);
    }
  };

  useEffect(() => {
    refreshData();
    const bootstrapCSS = document.createElement('link');
    bootstrapCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
    bootstrapCSS.rel = 'stylesheet';
    document.head.appendChild(bootstrapCSS);
    const bootstrapIcons = document.createElement('link');
    bootstrapIcons.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css';
    bootstrapIcons.rel = 'stylesheet';
    document.head.appendChild(bootstrapIcons);
  }, []);

  // --- AUTH HANDLERS ---
  const handleLogin = (user) => {
    setCurrentUser(user);
    // Check if user is using temporary password
    if (user.password === 'TempPass@2026') {
      setNeedsPasswordChange(true);
      navigate('/change-password');
    } else {
      navigate('/dashboard');
    }
  };
  
  const triggerLogout = () => setShowLogoutConfirm(true);

  const confirmLogout = () => {
    setCurrentUser(null);
    setTaskToEdit(null);
    setUserToEdit(null);
    setTargetUserEmail('');
    setViewingTask(null);
    setShowLogoutConfirm(false);
    setNeedsPasswordChange(false);
    navigate('/');
  };

  // --- TASK HANDLERS ---
  const handleSaveTask = async (taskData) => {
    const totalTime = calculateTotalTimeDecimal(taskData.start, taskData.end);
    if (taskToEdit) {
      const updatedTask = { ...tasks.find(t => t.id === taskToEdit.id), task: taskData.title, description: taskData.desc, start: taskData.start, end: taskData.end, total: totalTime };
      await fetch(`${API_URL}/tasks/${taskToEdit.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updatedTask) });
      setTasks(tasks.map(t => t.id === taskToEdit.id ? updatedTask : t));
      setTaskToEdit(null);
    } else {
      const newTask = { id: String(Date.now()), task: taskData.title, description: taskData.desc, start: taskData.start, end: taskData.end, total: totalTime, createdBy: currentUser.email, creatorName: currentUser.name, date: getTodayDateString() };
      await fetch(`${API_URL}/tasks`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newTask) });
      setTasks([newTask, ...tasks]);
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter(t => t.id !== id)); 
    }
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    if (currentUser.role === 'admin') navigate('/dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- USER HANDLERS (ADMIN ONLY) ---
  const handleSaveUser = async (userData) => {
    if (userToEdit) {
      // Update User
      const updatedUser = { ...userToEdit, ...userData };
      await fetch(`${API_URL}/users/${userToEdit.id}`, { 
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(updatedUser) 
      });
      setUsers(users.map(u => u.id === userToEdit.id ? updatedUser : u));
      setUserToEdit(null);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user? This cannot be undone.')) {
      await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' });
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleEditUser = (user) => {
    setUserToEdit(user);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- PASSWORD RESET HANDLERS ---
  const handleRequestPasswordReset = async (email) => {
    try {
      const user = users.find(u => u.email === email && u.role === 'user');
      if (!user) return;

      // Check if already has pending request
      const existingRequest = passwordResets.find(r => r.userEmail === email && r.status === 'pending');
      if (existingRequest) {
        alert('You already have a pending password reset request.');
        return;
      }

      const newRequest = {
        id: String(Date.now()),
        userEmail: email,
        userName: user.name,
        status: 'pending',
        requestDate: getTodayDateString(),
        requestTime: new Date().toLocaleTimeString()
      };

      await fetch(`${API_URL}/passwordResets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRequest)
      });

      await refreshData();
    } catch (error) {
      console.error("Error requesting password reset:", error);
    }
  };

  const handleApprovePasswordReset = async (resetRequestId) => {
    try {
      const request = passwordResets.find(r => r.id === resetRequestId);
      if (!request) return;

      const tempPassword = 'TempPass@2026';
      const user = users.find(u => u.email === request.userEmail);
      
      if (user) {
        // Update user password
        const updatedUser = { ...user, password: tempPassword };
        await fetch(`${API_URL}/users/${user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedUser)
        });
      }

      // Update request status
      const updatedRequest = { ...request, status: 'approved', approvedDate: getTodayDateString() };
      await fetch(`${API_URL}/passwordResets/${resetRequestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRequest)
      });

      alert(`Password reset approved! Temporary password: ${tempPassword}`);
      await refreshData();
    } catch (error) {
      console.error("Error approving password reset:", error);
    }
  };

  const handleRejectPasswordReset = async (resetRequestId) => {
    try {
      const updatedRequest = { 
        ...passwordResets.find(r => r.id === resetRequestId), 
        status: 'rejected',
        rejectedDate: getTodayDateString()
      };
      
      await fetch(`${API_URL}/passwordResets/${resetRequestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRequest)
      });

      await refreshData();
    } catch (error) {
      console.error("Error rejecting password reset:", error);
    }
  };

  const handleChangePassword = async (newPassword) => {
    if (!currentUser) return;
    try {
      const updatedUser = { ...currentUser, password: newPassword };
      await fetch(`${API_URL}/users/${currentUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
      });
      
      // Update local currentUser
      setCurrentUser(updatedUser);
      setNeedsPasswordChange(false);
      await refreshData();
      navigate('/dashboard');
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {viewingTask && <WatchModal task={viewingTask} onClose={() => setViewingTask(null)} />}
      
      {showLogoutConfirm && (
        <CustomPopup 
          title="Confirm Logout" 
          message="Are you sure you want to logout?" 
          onConfirm={confirmLogout} 
          onCancel={() => setShowLogoutConfirm(false)}
          confirmText="Logout"
          isDanger={true}
        />
      )}
      
      {showChangePasswordModal && currentUser && (
        <PasswordChangeModal 
          currentUser={currentUser} 
          onSave={async (newPassword) => {
            await handleChangePassword(newPassword);
            setShowChangePasswordModal(false);
          }}
          onCancel={() => setShowChangePasswordModal(false)}
        />
      )}
      
      {currentUser && <Header currentUser={currentUser} onLogout={triggerLogout} onChangePassword={() => setShowChangePasswordModal(true)} />}
      
      <div className="container-fluid px-4 py-3 bg-white" style={{ minHeight: 'calc(100vh - 60px)' }}>
        <Routes>
            <Route path="/" element={!currentUser ? <LoginContainer users={users} onLogin={handleLogin} refreshData={refreshData} onRequestPasswordReset={handleRequestPasswordReset} /> : <Navigate to="/dashboard" />} />
            
            <Route path="/dashboard" element={
                currentUser ? (
                    currentUser.role === 'admin' ? (
                        <AdminDashboard 
                          currentUser={currentUser} users={users} tasks={tasks} 
                          onNavigate={() => { setTargetUserEmail(''); navigate('/search'); }} 
                          onNavigateUser={(email) => { setTargetUserEmail(email); navigate('/search'); }} 
                          taskToEdit={taskToEdit} onSaveTask={handleSaveTask} onCancelEditTask={() => setTaskToEdit(null)}
                          // User Management Props
                          userToEdit={userToEdit} onSaveUser={handleSaveUser} onEditUser={handleEditUser} 
                          onDeleteUser={handleDeleteUser} onCancelEditUser={() => setUserToEdit(null)}
                          // Password Reset Props
                          passwordResets={passwordResets} onApprovePasswordReset={handleApprovePasswordReset} onRejectPasswordReset={handleRejectPasswordReset}
                        />
                    ) : (
                        <EmployeeDashboard 
                          currentUser={currentUser} tasks={tasks} 
                          onNavigate={() => navigate('/search')} onSave={handleSaveTask} 
                          onEdit={handleEditTask} onDelete={handleDeleteTask} setViewingTask={setViewingTask} 
                          taskToEdit={taskToEdit} onCancelEdit={() => setTaskToEdit(null)} 
                        />
                    )
                ) : <Navigate to="/" />
            } />
            
            <Route path="/search" element={
                currentUser ? (
                    <TaskSearchView 
                      currentUser={currentUser} tasks={tasks} users={users} 
                      onNavigate={() => navigate('/dashboard')} targetUserEmail={targetUserEmail} 
                      setTargetUserEmail={setTargetUserEmail} onEdit={handleEditTask} onDelete={handleDeleteTask} setViewingTask={setViewingTask} 
                    />
                ) : <Navigate to="/" />
            } />

            <Route path="/change-password" element={
                currentUser && needsPasswordChange ? (
                    <ChangePasswordForm 
                      currentUser={currentUser} 
                      onSave={handleChangePassword}
                      onCancel={() => {
                        setCurrentUser(null);
                        setNeedsPasswordChange(false);
                        navigate('/');
                      }}
                    />
                ) : <Navigate to="/" />
            } />

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

// --- SUB COMPONENTS ---

const Header = ({ currentUser, onLogout, onChangePassword }) => (
  <nav className="navbar" style={{ backgroundColor: '#0dcaf0', padding: '10px 20px' }}>
    <div className="container-fluid d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center gap-2">
         <i className="bi bi-boxes" style={{ fontSize: '24px', color: '#1a1a1a' }}></i>
         <span className="fw-bold text-dark d-none d-sm-block">Welcome, {currentUser.role === 'admin' ? 'Admin' : currentUser.name}</span>
      </div>
      <div className="d-flex gap-2">
        {currentUser.role === 'user' && (
          <button onClick={onChangePassword} className="btn btn-warning btn-sm px-3 py-1 fw-medium shadow-none" style={{ border: 'none', borderRadius: '4px' }}>
            <i className="bi bi-key-fill"></i> Change Password
          </button>
        )}
        <button onClick={onLogout} className="btn btn-primary btn-sm px-3 py-1 fw-medium shadow-none" style={{ backgroundColor: '#0d6efd', border: 'none', borderRadius: '4px' }}>Logout</button>
      </div>
    </div>
  </nav>
);

const LoginContainer = ({ users, onLogin, refreshData, onRequestPasswordReset }) => {
  const [authStep, setAuthStep] = useState('selection'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorPopup, setErrorPopup] = useState(null);
  const [successPopup, setSuccessPopup] = useState(null);

  const handleLogin = (e, role) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) { setErrorPopup("Please fill out all required fields."); return; }
    const user = users.find(u => u.email === email && u.password === password && u.role === role);
    if (user) onLogin(user);
    else setErrorPopup("Invalid email or password for this role.");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) { setErrorPopup("Please fill out all required fields."); return; }
    if (users.find(u => u.email === email)) { setErrorPopup("This email is already registered."); return; }
    const newUser = { id: String(Date.now()), email, password, name, role: 'user' };
    await fetch(`${API_URL}/users`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newUser) });
    await refreshData();
    setSuccessPopup("Registration Successful! Please login.");
    setAuthStep('employee');
    setName(''); setEmail(''); setPassword('');
  };

  const clear = (step) => { setErrorPopup(null); setSuccessPopup(null); setEmail(''); setPassword(''); setName(''); setAuthStep(step); };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      {errorPopup && <CustomPopup title="Action Required" message={errorPopup} onConfirm={() => setErrorPopup(null)} confirmText="OK" isDanger={true} />}
      {successPopup && <CustomPopup title="Success" message={successPopup} onConfirm={() => setSuccessPopup(null)} confirmText="OK" isDanger={false} />}
      <div className="card shadow-sm" style={{ width: '400px', border: 'none', borderRadius: '8px' }}>
        <div className="card-header text-center text-white" style={{ backgroundColor: '#0dcaf0', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
          <h4 className="mb-0 text-dark fw-bold">{authStep === 'selection' ? 'Select Login' : authStep === 'register' ? 'Register' : authStep === 'forgotPassword' ? 'Forgot Password' : 'Login'}</h4>
        </div>
        <div className="card-body p-4">
          {authStep === 'selection' && (
            <div className="d-flex flex-column gap-3">
              <button onClick={() => clear('admin')} className="btn btn-outline-primary py-3">Admin Login</button>
              <button onClick={() => clear('employee')} className="btn btn-primary py-3" style={{ backgroundColor: '#0d6efd' }}>Employee Login</button>
            </div>
          )}
          {(authStep === 'admin' || authStep === 'employee') && (
            <form onSubmit={(e) => handleLogin(e, authStep === 'admin' ? 'admin' : 'user')} noValidate>
              <div className="mb-3"><label className="small text-muted">Email</label><input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} /></div>
              <div className="mb-4"><label className="small text-muted">Password</label><input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} /></div>
              <button type="submit" className="btn btn-primary w-100 mb-3" style={{ backgroundColor: '#0d6efd' }}>Login</button>
              {authStep === 'employee' && (
                <div className="text-center mb-3">
                  <a href="#!" onClick={(e) => { e.preventDefault(); clear('forgotPassword'); }} className="text-decoration-none small text-danger">Forgot Password?</a>
                  <div className="my-2 text-muted small">or</div>
                  <a href="#!" onClick={() => clear('register')} className="text-decoration-none small text-primary">Register Here</a>
                </div>
              )}
              <button type="button" onClick={() => clear('selection')} className="btn btn-light w-100">Back</button>
            </form>
          )}
          {authStep === 'forgotPassword' && (
            <ForgotPasswordForm 
              users={users} 
              onBack={() => clear('employee')}
              onSubmit={onRequestPasswordReset}
            />
          )}
          {authStep === 'register' && (
            <form onSubmit={handleRegister} noValidate>
              <div className="mb-3"><label className="small text-muted">Name</label><input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} /></div>
              <div className="mb-3"><label className="small text-muted">Email</label><input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} /></div>
              <div className="mb-4"><label className="small text-muted">Create Password</label><input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} /></div>
              <button type="submit" className="btn btn-success w-100 mb-3">Register</button>
              <button type="button" onClick={() => clear('employee')} className="btn btn-light w-100">Back</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const WatchModal = ({ task, onClose }) => (
  <>
    <div className="modal-backdrop fade show" style={{ zIndex: 1040, backgroundColor: 'rgba(0,0,0,0.5)' }}></div>
    <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 1050 }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header border-bottom-0 pb-0">
            <h5 className="modal-title fw-bold text-dark">Task Details</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body pt-3 pb-4 px-4">
            <div className="row mb-2"><div className="col-4 fw-bold text-dark" style={{fontSize: '14px'}}>Task Date</div><div className="col-8 text-dark" style={{fontSize: '14px'}}>{task.date}</div></div>
            <div className="row mb-2"><div className="col-4 fw-bold text-dark" style={{fontSize: '14px'}}>Task</div><div className="col-8 text-dark" style={{fontSize: '14px'}}>{task.task}</div></div>
            <div className="row mb-2"><div className="col-4 fw-bold text-dark" style={{fontSize: '14px'}}>Description</div><div className="col-8 text-dark" style={{fontSize: '14px'}}>{task.description}</div></div>
            <div className="row mb-2"><div className="col-4 fw-bold text-dark" style={{fontSize: '14px'}}>Start</div><div className="col-8 text-dark" style={{fontSize: '14px'}}>{formatTimeAMPM(task.start)}</div></div>
            <div className="row mb-2"><div className="col-4 fw-bold text-dark" style={{fontSize: '14px'}}>End</div><div className="col-8 text-dark" style={{fontSize: '14px'}}>{formatTimeAMPM(task.end)}</div></div>
            <div className="row"><div className="col-4 fw-bold text-dark" style={{fontSize: '14px'}}>Total</div><div className="col-8 text-dark" style={{fontSize: '14px'}}>{task.total}</div></div>
          </div>
          <div className="modal-footer border-top-0 pt-0 pe-4 pb-3">
            <button className="btn btn-primary btn-sm px-4" style={{backgroundColor: '#0d6efd'}} onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  </>
);

// --- NEW COMPONENT: USER FORM (For Admin) ---
const UserForm = ({ onSave, user, onCancel }) => {
    const [f, setF] = useState({ name: '', email: '', password: '' });
    
    useEffect(() => {
        if (user) setF({ name: user.name, email: user.email, password: user.password });
        else setF({ name: '', email: '', password: '' });
    }, [user]);

    const handleSubmit = () => {
        if (f.name && f.email && f.password) onSave(f);
        else alert("All fields are required");
    };

    return (
        <div className="mb-4 p-4 border rounded bg-light animate__animated animate__fadeIn">
            <h5 className="mb-3 text-primary">{user ? 'Edit Employee' : 'Add Employee'}</h5>
            <div className="row g-3">
                <div className="col-md-4"><label className="small text-muted">Name</label><input className="form-control" value={f.name} onChange={e => setF({...f, name: e.target.value})} /></div>
                <div className="col-md-4"><label className="small text-muted">Email</label><input className="form-control" value={f.email} onChange={e => setF({...f, email: e.target.value})} disabled={!!user} /></div>
                <div className="col-md-4"><label className="small text-muted">Password</label><input className="form-control" value={f.password} onChange={e => setF({...f, password: e.target.value})} /></div>
                <div className="col-12 d-flex justify-content-end gap-2 mt-3">
                    <button onClick={onCancel} className="btn btn-secondary">Cancel</button>
                    <button onClick={handleSubmit} className="btn btn-success">Save User</button>
                </div>
            </div>
        </div>
    );
};

const AdminDashboard = ({ users, tasks, onNavigateUser, onNavigate, taskToEdit, onSaveTask, onCancelEditTask, userToEdit, onSaveUser, onEditUser, onDeleteUser, onCancelEditUser, passwordResets, onApprovePasswordReset, onRejectPasswordReset }) => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(5);

  const filteredUsers = users.filter(u => u.role === 'user' && u.name.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.ceil(filteredUsers.length / rows);
  const currentUsers = filteredUsers.slice((page - 1) * rows, page * rows);

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between mb-4 border-bottom pb-3">
        <h3 className="m-0 fw-bold text-dark">Employee Task Dashboard</h3>
        <button onClick={onNavigate} className="btn btn-primary" style={{ backgroundColor: '#0d6efd' }}>View All Tasks</button>
      </div>
      
      {/* If editing a TASK (redirected from details), show TaskForm */}
      {taskToEdit && <TaskForm onSave={onSaveTask} editingTask={taskToEdit} onCancel={onCancelEditTask} tasks={tasks} currentUser={{email:'admin@app.com'}} />}
      
      {/* If editing a USER, show UserForm */}
      {userToEdit && <UserForm onSave={onSaveUser} user={userToEdit} onCancel={onCancelEditUser} />}

      {!taskToEdit && !userToEdit && (
        <>
          {/* PASSWORD RESET REQUESTS SECTION */}
          {passwordResets && passwordResets.length > 0 && passwordResets.some(r => r.status === 'pending') && (
            <div className="alert alert-warning border-2 border-warning mb-4 p-3">
              <div className="d-flex align-items-start">
                <i className="bi bi-exclamation-triangle-fill text-warning me-3" style={{ fontSize: '20px' }}></i>
                <div className="flex-grow-1">
                  <h5 className="text-warning mb-2">
                    <i className="bi bi-key-fill"></i> Password Reset Requests ({passwordResets.filter(r => r.status === 'pending').length})
                  </h5>
                  <div className="small text-dark">
                    {passwordResets.filter(r => r.status === 'pending').map((req) => (
                      <div key={req.id} className="mb-2 p-2 bg-white rounded border-start border-warning">
                        <strong>{req.userName}</strong> ({req.userEmail}) - Requested on {req.requestDate}
                        <div className="d-flex gap-2 mt-2">
                          <button 
                            onClick={() => {
                              if (window.confirm(`Approve password reset for ${req.userName}?`)) {
                                onApprovePasswordReset(req.id);
                              }
                            }}
                            className="btn btn-sm btn-success"
                          >
                            <i className="bi bi-check-circle"></i> Approve
                          </button>
                          <button 
                            onClick={() => {
                              if (window.confirm(`Reject password reset for ${req.userName}?`)) {
                                onRejectPasswordReset(req.id);
                              }
                            }}
                            className="btn btn-sm btn-danger"
                          >
                            <i className="bi bi-x-circle"></i> Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="d-flex justify-content-center mb-4">
            <div className="position-relative w-100" style={{maxWidth: '400px'}}>
               <input type="text" placeholder="Search employee..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="form-control" />
               <i className="bi bi-search position-absolute" style={{ right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d'}}></i>
            </div>
          </div>
          <div className="table-responsive border rounded">
            <table className="table mb-0 text-center align-middle">
              <thead className="bg-dark text-white"><tr><th>S.No</th><th>Name</th><th>Email</th><th>Tasks</th><th>Actions</th></tr></thead>
              <tbody>
                {currentUsers.map((u, i) => (
                  <tr key={u.id}>
                    <td>{(page - 1) * rows + i + 1}</td><td>{u.name}</td><td>{u.email}</td>
                    <td>{tasks.filter(t => t.createdBy === u.email).length} Tasks</td>
                    <td>
                      <div className="d-flex justify-content-center gap-1">
                        <button onClick={() => onNavigateUser(u.email)} className="btn btn-sm btn-primary">View Details</button>
                        <button onClick={() => onEditUser(u)} className="btn btn-sm btn-success ms-2"><i className="bi bi-pencil-fill"></i></button>
                        <button onClick={() => onDeleteUser(u.id)} className="btn btn-sm btn-danger"><i className="bi bi-trash-fill"></i></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-end align-items-center mt-3 small">
            <select onChange={e => { setRows(Number(e.target.value)); setPage(1); }} className="form-select form-select-sm w-auto me-3"><option value={5}>5</option><option value={10}>10</option><option value={15}>15</option><option value={20}>20</option></select>
            <span>{(page-1)*rows+1}-{Math.min(page*rows, filteredUsers.length)} of {filteredUsers.length}</span>
            <div className="ms-3"><i className="bi bi-chevron-left cursor-pointer" onClick={() => setPage(Math.max(1, page-1))}></i> <i className="bi bi-chevron-right cursor-pointer ms-2" onClick={() => setPage(Math.min(totalPages, page+1))}></i></div>
          </div>
        </>
      )}
    </div>
  );
};

const EmployeeDashboard = ({ currentUser, tasks, onNavigate, onSave, onEdit, onDelete, setViewingTask, taskToEdit, onCancelEdit }) => {
  const userTasks = tasks.filter(t => t.createdBy === currentUser.email);
  return (
    <div className="animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between mb-4 border-bottom pb-3">
        <h3 className="m-0 fw-bold">Employee Task Dashboard</h3>
        <button onClick={onNavigate} className="btn btn-primary" style={{ backgroundColor: '#0d6efd' }}>Go to Task Detail</button>
      </div>
      <TaskForm onSave={onSave} editingTask={taskToEdit} onCancel={onCancelEdit} tasks={tasks} currentUser={currentUser} />
      <TaskTable tasks={userTasks} onEdit={onEdit} onDelete={onDelete} setViewingTask={setViewingTask} canModifyTodayOnly={true} />
      <DailySummary tasks={userTasks} />
    </div>
  );
};

const TaskSearchView = ({ tasks, users, currentUser, onNavigate, targetUserEmail, setTargetUserEmail, onEdit, onDelete, setViewingTask }) => {
  const [filters, setFilters] = useState({ date: '', from: '', to: '', task: '', month: '' });
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(5);
  
  const isAdmin = currentUser.role === 'admin';

  let visibleTasks = isAdmin 
    ? (targetUserEmail ? tasks.filter(t => t.createdBy === targetUserEmail) : tasks)
    : tasks.filter(t => t.createdBy === currentUser.email);

  const filtered = visibleTasks.filter(t => {
    if (filters.date && t.date !== filters.date) return false;
    if (filters.from && t.date < filters.from) return false;
    if (filters.to && t.date > filters.to) return false;
    if (filters.month && !t.date.startsWith(filters.month)) return false;
    if (filters.task && !t.task.toLowerCase().includes(filters.task.toLowerCase())) return false;
    return true;
  });
  
  const totalMins = filtered.reduce((acc, t) => acc + getMinutesBetween(t.start, t.end), 0);
  const totalFormatted = `${Math.floor(totalMins/60).toString().padStart(2,'0')}:${(totalMins%60).toString().padStart(2,'0')} hrs`;

  // Pagination Logic
  const totalPages = Math.ceil(filtered.length / rows);
  const currentTasks = filtered.slice((page - 1) * rows, page * rows);

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="row g-3 mb-3">
        <div className="col"><label className="fw-bold small">Date</label><input type="date" className="form-control" max={getTodayDateString()} onChange={e => { setFilters({...filters, date: e.target.value, from: '', to: '', month: ''}); setPage(1); }} /></div>
        <div className="col"><label className="fw-bold small">From</label><input type="date" className="form-control" max={getTodayDateString()} onChange={e => { setFilters({...filters, from: e.target.value, date: '', month: ''}); setPage(1); }} /></div>
        <div className="col"><label className="fw-bold small">To</label><input type="date" className="form-control" max={getTodayDateString()} onChange={e => { setFilters({...filters, to: e.target.value, date: '', month: ''}); setPage(1); }} /></div>
        <div className="col"><label className="fw-bold small">Month</label><input type="month" className="form-control" onChange={e => { setFilters({...filters, month: e.target.value, date: '', from: '', to: ''}); setPage(1); }} /></div>
        <div className="col"><label className="fw-bold small">Task Search</label><input type="text" placeholder="Search Task..." className="form-control" onChange={e => { setFilters({...filters, task: e.target.value}); setPage(1); }} /></div>
      </div>
      
      {isAdmin && targetUserEmail && <div className="mb-3"><span className="badge bg-primary">Viewing: {users.find(u => u.email === targetUserEmail)?.name} <i className="bi bi-x ms-2 cursor-pointer" onClick={() => setTargetUserEmail('')}></i></span></div>}
      
      <div className="table-responsive border rounded">
        <table className="table mb-0 text-center">
          <thead className="bg-dark text-white"><tr><th>Task</th><th>Employee</th><th>Desc</th><th>Date</th><th>Start</th><th>End</th><th>Total</th><th>Actions</th></tr></thead>
          <tbody>
            {currentTasks.map(t => (
              <tr key={t.id}>
                <td>{t.task}</td><td className="text-primary fw-bold">{t.creatorName}</td><td>{t.description}</td><td>{t.date}</td><td>{formatTimeAMPM(t.start)}</td><td>{formatTimeAMPM(t.end)}</td><td>{t.total}</td><td>
                  <div className="d-flex justify-content-center gap-1"><button onClick={() => setViewingTask(t)} className="btn btn-sm btn-primary"><i className="bi bi-eye-fill"></i></button>{isAdmin && <><button onClick={() => onEdit(t)} className="btn btn-sm btn-success"><i className="bi bi-pencil-fill"></i></button><button onClick={() => onDelete(t.id)} className="btn btn-sm btn-danger"><i className="bi bi-trash-fill"></i></button></>}</div>
                </td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-end align-items-center mt-3 small">
        <select onChange={e => { setRows(Number(e.target.value)); setPage(1); }} className="form-select form-select-sm w-auto me-3"><option value={5}>5</option><option value={10}>10</option><option value={15}>15</option><option value={20}>20</option></select>
        <span>{(page-1)*rows+1}-{Math.min(page*rows, filtered.length)} of {filtered.length}</span>
        <div className="ms-3"><i className="bi bi-chevron-left cursor-pointer" onClick={() => setPage(Math.max(1, page-1))}></i> <i className="bi bi-chevron-right cursor-pointer ms-2" onClick={() => setPage(Math.min(totalPages, page+1))}></i></div>
      </div>
      
      <div className="border rounded px-4 py-3 mt-4 bg-white"><h6 className="fw-bold mb-2">Summary</h6><div style={{ fontSize: '14px' }}><strong>Total Time:</strong> {totalFormatted}</div></div>
      <button onClick={() => onNavigate()} className="btn btn-outline-secondary mt-3">Back to Dashboard</button>
    </div>
  );
};

const TaskForm = ({ onSave, editingTask, onCancel, tasks, currentUser }) => {
  const [f, setF] = useState({ title: '', desc: '', start: '', end: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => { 
    if (editingTask) setF({ title: editingTask.task, desc: editingTask.description, start: editingTask.start, end: editingTask.end }); 
    else setF({ title: '', desc: '', start: '', end: '' }); 
    setErrors({});
  }, [editingTask]);

  const handleDescChange = (e) => {
    const val = e.target.value;
    const noNumVal = val.replace(/[0-9]/g, '');
    setF({ ...f, desc: noNumVal });
  };

  const handleSubmit = () => {
    let newErrors = {};
    if (!f.title.trim()) newErrors.title = "Required";
    if (!f.desc.trim()) newErrors.desc = "Required";
    if (!f.start) newErrors.start = "Required";
    if (!f.end) newErrors.end = "Required";
    
    const newStart = timeToMinutes(f.start);
    let newEnd = timeToMinutes(f.end);
    if (newEnd < newStart) newEnd += 1440;

    const todayStr = getTodayDateString();
    const ownerEmail = editingTask ? editingTask.createdBy : currentUser.email;
    const existingTasks = tasks.filter(t => t.createdBy === ownerEmail && t.date === todayStr && (editingTask ? t.id !== editingTask.id : true));

    const hasOverlap = existingTasks.some(t => {
        const tStart = timeToMinutes(t.start);
        let tEnd = timeToMinutes(t.end);
        if (tEnd < tStart) tEnd += 1440;
        return (newStart < tEnd && newEnd > tStart);
    });

    if (hasOverlap) newErrors.general = "Time overlaps with an existing task.";

    const newDuration = newEnd - newStart;
    const existingTotal = existingTasks.reduce((acc, t) => {
        const tStart = timeToMinutes(t.start);
        let tEnd = timeToMinutes(t.end);
        if (tEnd < tStart) tEnd += 1440;
        return acc + (tEnd - tStart);
    }, 0);

    if (existingTotal + newDuration > 1440) newErrors.general = "Total daily work cannot exceed 24 hours.";

    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);
    
    onSave(f);
    if (!editingTask) setF({ title: '', desc: '', start: '', end: '' });
  };
  
  return (
    <div className="mb-4">
      {errors.general && <div className="alert alert-danger p-2 mb-3 small">{errors.general}</div>}
      <div className="mb-3">
        <label className="small text-muted">Title</label>
        <input className="form-control" value={f.title} onChange={e => setF({...f, title: e.target.value})} style={{borderColor: errors.title ? 'red' : ''}} />
        {errors.title && <div className="text-danger small">{errors.title}</div>}
      </div>
      <div className="mb-3">
        <label className="small text-muted">Desc (No Numbers Allowed)</label>
        <input 
            className="form-control" 
            value={f.desc} 
            onChange={handleDescChange} 
            placeholder="Enter details (text only)..."
            style={{borderColor: errors.desc ? 'red' : ''}} 
        />
        {errors.desc && <div className="text-danger small">{errors.desc}</div>}
      </div>
      <div className="row g-3">
        <div className="col"><label className="small text-muted">Start</label><input type="time" className="form-control" value={f.start} onChange={e => setF({...f, start: e.target.value})} style={{borderColor: errors.start ? 'red' : ''}} />{errors.start && <div className="text-danger small">{errors.start}</div>}</div>
        <div className="col"><label className="small text-muted">End</label><input type="time" className="form-control" value={f.end} onChange={e => setF({...f, end: e.target.value})} style={{borderColor: errors.end ? 'red' : ''}} />{errors.end && <div className="text-danger small">{errors.end}</div>}</div>
        <div className="col d-flex align-items-end"><button onClick={handleSubmit} className="btn btn-primary w-100">{editingTask ? 'Update' : 'Add'}</button>{editingTask && <button onClick={onCancel} className="btn btn-light ms-2">Cancel</button>}</div>
      </div>
    </div>
  );
};

const TaskTable = ({ tasks, onEdit, onDelete, setViewingTask, canModifyTodayOnly }) => {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(5);
  const current = tasks.slice((page-1)*rows, page*rows);
  const isToday = (d) => d === getTodayDateString();

  return (
    <>
      <div className="table-responsive border rounded"><table className="table mb-0 text-center"><thead className="bg-dark text-white"><tr><th>Task</th><th>Desc</th><th>Start</th><th>End</th><th>Total</th><th>Actions</th></tr></thead><tbody>
        {current.map(t => (
          <tr key={t.id}><td>{t.task}</td><td>{t.description}</td><td>{formatTimeAMPM(t.start)}</td><td>{formatTimeAMPM(t.end)}</td><td>{t.total}</td><td>
            <div className="d-flex justify-content-center gap-1"><button onClick={() => setViewingTask(t)} className="btn btn-sm btn-primary"><i className="bi bi-eye-fill"></i></button><button onClick={() => onEdit(t)} disabled={canModifyTodayOnly && !isToday(t.date)} className="btn btn-sm btn-success"><i className="bi bi-pencil-fill"></i></button><button onClick={() => onDelete(t.id)} disabled={canModifyTodayOnly && !isToday(t.date)} className="btn btn-sm btn-danger"><i className="bi bi-trash-fill"></i></button></div>
          </td></tr>
        ))}
      </tbody></table></div>
      <div className="d-flex justify-content-end align-items-center mt-3 small"><select onChange={e => setRows(Number(e.target.value))} className="form-select form-select-sm w-auto me-3"><option value={5}>5</option><option value={10}>10</option><option value={15}>15</option><option value={20}>20</option></select><span>{(page-1)*rows+1}-{Math.min(page*rows, tasks.length)} of {tasks.length}</span><div className="ms-3"><i className="bi bi-chevron-left cursor-pointer" onClick={() => setPage(Math.max(1, page-1))}></i> <i className="bi bi-chevron-right cursor-pointer ms-2" onClick={() => setPage(Math.min(Math.ceil(tasks.length/rows), page+1))}></i></div></div>
    </>
  );
};

const DailySummary = ({ tasks }) => {
  const todayTasks = tasks.filter(t => t.date === getTodayDateString());
  const mins = todayTasks.reduce((acc, t) => acc + getMinutesBetween(t.start, t.end), 0);
  const fmt = (m) => `${Math.floor(m/60).toString().padStart(2,'0')}:${(m%60).toString().padStart(2,'0')}`;
  return (<div className="border rounded p-3 mt-3 bg-white"><h6 className="fw-bold mb-2">Daily Summary:</h6><div className="small"><strong>Total:</strong> {fmt(mins)} <span className="mx-1 fw-bold">|</span> <strong>Required:</strong> 09:00 <span className="mx-1 fw-bold">|</span> <span className="text-danger fw-bold">Remaining: {fmt(Math.max(0, 540-mins))}</span></div></div>);
};