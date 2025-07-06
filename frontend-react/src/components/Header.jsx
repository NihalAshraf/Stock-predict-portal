import React from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import { useContext } from 'react'; // Importing useContext to access AuthContext
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for navigation
const Header = () => {
  const navigate = useNavigate(); // Using useNavigate for navigation
  const { isLoggedIn } = useContext(AuthContext); // Accessing isLoggedIn from AuthContext

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    window.location.reload(); // Reload the page to reflect the logout state
  }
  const handledash = () => {
    navigate('/dashboard');
  }
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
      { isLoggedIn ? (
        <>
         <button className='btn btn-success' onClick={handledash}>Dashboard</button>
         <button className='btn btn-danger' onClick={handleLogout}>LogOut</button>
        </>
      ):(
        <>
          <Button className="btn btn-primary" label="Login" url="/login" />
          <Button className="btn btn-secondary" label="Sign Up" url="/register" />
        </>
      )}
      </div>
    </nav>
  );
};

export default Header;
