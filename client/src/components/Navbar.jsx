import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileNav = () => {
    setMobileOpen(!mobileOpen);
  };

  const showToast = (message) => {
    // In a real app, use a toast library or custom context
    console.log(message);
    alert(message);
  };

  return (
    <div className="navbar-wrapper">
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="navbar-brand">
            <img src="/logo.png" alt="ERROR Infotech Pvt Ltd" className="brand-logo brand-logo--nav" />
          </Link>

          <ul className={`nav-links ${mobileOpen ? 'active' : ''}`} id="navLinks">
            <li><Link to="/features" className="nav-link">Features</Link></li>
            <li><a href="/#process" className="nav-link">Process</a></li>
            <li><a href="/#testimonials" className="nav-link">Testimonials</a></li>
            <li><a href="/#pricing" className="nav-link">Pricing</a></li>
            <li>
              <Link to="/dashboard" className="nav-link">
                <span>Dashboard</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </Link>
            </li>
          </ul>

          <div className="nav-actions">
            <button className="btn-ghost" onClick={() => showToast('Redirecting to login portal...')}>Log in</button>
            <button className="btn-primary" onClick={() => showToast('Starting 14-day free trial!')}>
              <span>Start Free Trial</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </div>

          <button className="mobile-toggle" onClick={toggleMobileNav} aria-label="Toggle navigation">
            ☰
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
