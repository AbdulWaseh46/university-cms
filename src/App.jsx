import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

import Navbar         from './components/Navbar';
import ToastContainer from './components/ToastContainer';

import Home          from './pages/Home';
import Students      from './pages/Students';
import Courses       from './pages/Courses';
import Enroll        from './pages/Enroll';
import Enrollments   from './pages/Enrollments';
import StudentDetail from './pages/StudentDetail';

const App = () => (
  <AppProvider>
    <BrowserRouter>
      <div className="app-wrapper">
        {/* ── Sidebar navigation ── */}
        <Navbar />

        {/* ── Main content area ── */}
        <main className="main-content">
          <Routes>
            <Route path="/"              element={<Home />} />
            <Route path="/students"      element={<Students />} />
            <Route path="/courses"       element={<Courses />} />
            <Route path="/enroll"        element={<Enroll />} />
            <Route path="/enrollments"   element={<Enrollments />} />
            <Route path="/student/:id"   element={<StudentDetail />} />
            {/* 404 fallback */}
            <Route path="*" element={
              <div style={{ textAlign: 'center', padding: '80px 32px' }}>
                <div style={{ fontSize: '4rem', marginBottom: '16px' }}>404</div>
                <h2 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--navy)' }}>
                  Page Not Found
                </h2>
                <p style={{ color: 'var(--text-mid)', marginBottom: '24px' }}>
                  The page you're looking for doesn't exist.
                </p>
                <a href="/" className="btn btn-primary">Go to Dashboard</a>
              </div>
            } />
          </Routes>
        </main>

        {/* ── Toast notifications (global) ── */}
        <ToastContainer />
      </div>
    </BrowserRouter>
  </AppProvider>
);

export default App;
