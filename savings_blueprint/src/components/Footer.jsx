// src/components/Footer.jsx

import { Link } from 'react-router-dom';
import '../styles/styles.css';

function Footer() {
  return (
    <footer className="sb-footer">

      <div className="sb-footer-container">

        {/* Logo & Description */}
        <div className="sb-footer-box">
          <h2 className="sb-footer-logo">
            Savings_Blueprint
          </h2>

          <p className="sb-footer-text">
            Smart financial planning platform for income,
            savings, future forecasting and goal tracking.
          </p>
        </div>

        {/* Quick Links */}
        <div className="sb-footer-box">
          <h3 className="sb-footer-title">
            Quick Links
          </h3>

          <ul className="sb-footer-links">
            <li>
              <Link to="/" className="sb-footer-link">
                Dashboard
              </Link>
            </li>

            <li>
              <Link to="/income" className="sb-footer-link">
                Income
              </Link>
            </li>

            <li>
              <Link to="/savings" className="sb-footer-link">
                Savings
              </Link>
            </li>

            <li>
              <Link to="/goals" className="sb-footer-link">
                Goals
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div className="sb-footer-box">
          <h3 className="sb-footer-title">
            Services
          </h3>

          <ul className="sb-footer-links">
            <li className="sb-footer-item">
              Financial Planning
            </li>

            <li className="sb-footer-item">
              Future Forecast
            </li>

            <li className="sb-footer-item">
              Savings Analytics
            </li>

            <li className="sb-footer-item">
              Goal Tracking
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="sb-footer-box">
          <h3 className="sb-footer-title">
            Contact
          </h3>

          <p className="sb-footer-text">
            Email: support@savingsblueprint.com
          </p>

          <p className="sb-footer-text">
            Phone: +91 9876543210
          </p>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="sb-footer-bottom">
        <p>
          © 2026 Savings_Blueprint. All Rights Reserved.
        </p>
      </div>

    </footer>
  );
}

export default Footer;