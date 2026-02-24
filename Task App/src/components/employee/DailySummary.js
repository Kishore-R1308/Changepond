import React from 'react';

const DailySummary = ({ tasks }) => {
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

  const todayStr = getTodayDateString();
  const todayTasks = tasks.filter(t => t.date === todayStr);
  const totalTodayMinutes = todayTasks.reduce((acc, t) => acc + getMinutesBetween(t.start, t.end), 0);
  
  const totalHours = Math.floor(totalTodayMinutes / 60);
  const totalMins = totalTodayMinutes % 60;
  const formattedTotal = `${totalHours.toString().padStart(2, '0')}:${totalMins.toString().padStart(2, '0')}`;
  
  const requiredMinutes = 9 * 60; 
  let remainingMinutes = requiredMinutes - totalTodayMinutes;
  if (remainingMinutes < 0) remainingMinutes = 0; 
  
  const remHours = Math.floor(remainingMinutes / 60);
  const remMins = remainingMinutes % 60;
  const formattedRemaining = `${remHours.toString().padStart(2, '0')}:${remMins.toString().padStart(2, '0')}`;

  return (
    <div className="border rounded px-3 py-3 mt-4" style={{ backgroundColor: '#ffffff', borderColor: '#e0e0e0' }}>
      <h6 className="fw-bold mb-2 text-dark" style={{ fontSize: '15px' }}>Daily Summary (Today):</h6>
      <div style={{ fontSize: '14px', color: '#1a1a1a' }}>
        <strong>Total:</strong> {formattedTotal} <span className="mx-1 text-danger fw-bold">|</span> 
        <strong>Required:</strong> 09:00 <span className="mx-1 text-danger fw-bold">|</span> 
        <span className="text-danger"><strong>Remaining:</strong> {formattedRemaining}</span>
      </div>
    </div>
  );
};

export default DailySummary;