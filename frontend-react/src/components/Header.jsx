import React from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';
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
     <Link to="/" className="navbar-brand text-light fw-bold">
        <span className="text-primary">📈 StockVision</span>
    </Link>
    

      <div className="ms-auto d-flex gap-2">
        <Button label="Login" variant="outline" url='/login' />
        <Button label="Register" variant="solid" url='/register'/>
      </div>
    </nav>
  );
};

export default Header;
