import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-5 py-4 px-4 text-light" style={{
      backgroundColor: '#111',
      borderTop: '1px solid rgba(255,255,255,0.1)',
    }}>
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="mb-3 mb-md-0">
          <h5 className="fw-bold text-primary mb-1">📈 StockVision</h5>
          <small className="text-muted">© {new Date().getFullYear()} All rights reserved</small>
        </div>

        <div className="d-flex gap-3">
          <a href="#" className="text-light text-decoration-none">Privacy Policy</a>
          <a href="#" className="text-light text-decoration-none">Terms</a>
          <a href="#" className="text-light text-decoration-none">Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
