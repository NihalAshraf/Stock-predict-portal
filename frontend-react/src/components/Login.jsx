import {useState} from 'react';
import Button from './Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import { useContext } from 'react'; // Importing useContext to access AuthContext
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {setLoggedIn} = useContext(AuthContext); // Importing setLoggedIn from AuthContext
    const navigate = useNavigate();
    const handleLogin = async (e) => {
      e.preventDefault();

      const userData={
        username,
        password
      }
     try {
      const response= await axios.post('http://127.0.0.1:8000/api/v1/token/',userData)
      console.log('User registered successfully==>',response.data);
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      setLoggedIn(true); // Update the logged-in state
      setUsername('');
      setPassword('');
      navigate('/'); // Redirect to home page after successful login

     } catch (error) {
      console.error('invalid credentials:', error.response.data);
      alert('Invalid credentials. Please try again.');
     }
      
    }
   
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-black text-white">
      <div className="card bg-dark text-white shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Login to Account</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control bg-dark text-white border-secondary" id="username" placeholder="Enter username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
          
          </div>


          <div className="mb-3">
            <label htmlFor="password" className="form-label">Set Password</label>
            <input type="password" className="form-control bg-dark text-white border-secondary" id="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            
          </div>
           
          <button type="submit" className="btn btn-primary w-100 rounded-pill">Login</button>
          
        </form>

        <p className="mt-3 text-center text-secondary" style={{ fontSize: '0.9rem' }}>
          Don't have an account? <Button className="text-primary" label='Sign-up' url='/register'/>
        </p>
      </div>
    </div>
  );
};

export default Login;
