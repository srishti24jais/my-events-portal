import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>🎉 Events Portal</h3>
          <p>Discover and book amazing events happening around you.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#events">All Events</a></li>
            <li><a href="#upcoming">Upcoming</a></li>
            <li><a href="#free">Free Events</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Categories</h4>
          <ul>
            <li><a href="#tech">Technology</a></li>
            <li><a href="#music">Music</a></li>
            <li><a href="#art">Art</a></li>
            <li><a href="#sports">Sports</a></li>
            <li><a href="#food">Food & Wine</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Connect</h4>
          <div className="social-links">
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="LinkedIn">💼</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Events Portal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 