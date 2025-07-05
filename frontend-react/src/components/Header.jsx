import React from 'react';
import Button from './Button';

const Header = () => {
  return (
    <nav
      className="navbar navbar-expand-lg px-4 py-3"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <a className="navbar-brand text-white fw-bold fs-4" href="/">
        <span className="text-primary">📈 StockVision</span>
      </a>

      <div className="ms-auto d-flex gap-2">
        <Button label="Login" variant="outline" />
        <Button label="Register" variant="solid" />
      </div>
    </nav>
  );
};

export default Header;
