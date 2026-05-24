import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/',            label: 'Dashboard',   icon: '⊞' },
  { path: '/students',    label: 'Students',     icon: '👤' },
  { path: '/courses',     label: 'Courses',      icon: '📚' },
  { path: '/enroll',      label: 'Enroll',       icon: '✚' },
  { path: '/enrollments', label: 'Enrollments',  icon: '📋' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* ── Mobile hamburger ── */}
      <button
        className="hamburger"
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle menu"
      >
        {open ? '✕' : '☰'}
      </button>

      {/* ── Sidebar ── */}
      <nav className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="logo-mark">U</div>
          <div>
            <div className="logo-title">UniCMS</div>
            <div className="logo-sub">Course Management</div>
          </div>
        </div>

        {/* Navigation links */}
        <div className="sidebar-nav">
          <div className="nav-section-label">Navigation</div>
          {navItems.map(({ path, label, icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'nav-item-active' : ''}`
              }
              onClick={() => setOpen(false)}
            >
              <span className="nav-icon">{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </div>

        {/* Footer */}
        <div className="sidebar-footer">
          <div className="sidebar-footer-text">
            University Course Management System
          </div>
        </div>
      </nav>

      {/* ── Mobile overlay ── */}
      {open && (
        <div className="sidebar-overlay" onClick={() => setOpen(false)} />
      )}

      <style>{`
        .sidebar {
          position: fixed;
          top: 0; left: 0;
          width: 260px;
          height: 100vh;
          background: var(--navy);
          display: flex;
          flex-direction: column;
          z-index: 100;
          overflow-y: auto;
          box-shadow: 4px 0 24px rgba(0,0,0,0.15);
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 28px 24px 24px;
          border-bottom: 1px solid rgba(201,168,76,0.2);
        }

        .logo-mark {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--gold), var(--gold-light));
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          font-weight: 900;
          color: var(--navy);
          flex-shrink: 0;
        }

        .logo-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--white);
          line-height: 1.2;
        }

        .logo-sub {
          font-size: 0.68rem;
          color: var(--text-light);
          letter-spacing: 0.04em;
          margin-top: 1px;
        }

        .sidebar-nav {
          flex: 1;
          padding: 20px 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .nav-section-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-light);
          padding: 0 12px;
          margin-bottom: 8px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 14px;
          border-radius: 10px;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          transition: all 0.2s ease;
          letter-spacing: 0.01em;
        }

        .nav-item:hover {
          background: rgba(255,255,255,0.07);
          color: var(--white);
        }

        .nav-item-active {
          background: rgba(201,168,76,0.15) !important;
          color: var(--gold-light) !important;
          border-left: 3px solid var(--gold);
          padding-left: 11px;
        }

        .nav-icon { font-size: 1.05rem; width: 22px; text-align: center; }

        .sidebar-footer {
          padding: 16px 24px;
          border-top: 1px solid rgba(201,168,76,0.15);
        }

        .sidebar-footer-text {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.25);
          line-height: 1.4;
          text-align: center;
        }

        .hamburger {
          display: none;
          position: fixed;
          top: 16px; left: 16px;
          z-index: 200;
          background: var(--navy);
          color: var(--gold);
          border: none;
          width: 42px;
          height: 42px;
          border-radius: 10px;
          font-size: 1.1rem;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-md);
        }

        .sidebar-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 99;
        }

        @media (max-width: 768px) {
          .hamburger { display: flex; }
          .sidebar-overlay { display: block; }
          .sidebar {
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }
          .sidebar-open {
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
