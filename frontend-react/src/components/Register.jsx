import React from 'react';
import Button from './Button';
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState({});
    const [success, setSuccess] = useState(false);
    const handleregister = async (e) => {
        e.preventDefault();
        const userData={
            username: username,
            email: email,
            password: password
            
        }
        try{
            const response= await axios.post('http://127.0.0.1:8000/api/v1/register/',userData)
            console.log(response);
            console.log('User registered successfully==>',response.data);
            setError({});
            setSuccess(true);
            setUsername('');
            setEmail('');
            setPassword('');
            
            
        }catch(err){
            setError(err.response.data);
            console.error('Error registering user:', err.response.data);
           
        }
    }

   
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-black text-white">
      <div className="card bg-dark text-white shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Create Account</h2>

        <form onSubmit={handleregister}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control bg-dark text-white border-secondary" id="username" placeholder="Enter username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <small>{error.username && <div className='text-danger'>{error.username}</div>}</small>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control bg-dark text-white border-secondary" id="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <small>{error.email && <div className='text-danger'>{error.email}</div>}</small>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Set Password</label>
            <input type="password" className="form-control bg-dark text-white border-secondary" id="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <small>{error.password && <div className='text-danger'>{error.password}</div>}</small>
          </div>
            {success && <div className='alert alert-success'>User registered successfully</div>}
          <button type="submit" className="btn btn-primary w-100 rounded-pill">Register</button>
        </form>

        <p className="mt-3 text-center text-secondary" style={{ fontSize: '0.9rem' }}>
          Already have an account? <Button className="text-primary" label='login' url='/login'/>
        </p>
      </div>
    </div>
  );
};

export default Register;
