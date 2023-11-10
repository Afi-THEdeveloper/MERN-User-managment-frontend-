import React, { useEffect, useState } from 'react';
import './Login.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState('')
  const navigate =useNavigate()

  axios.defaults.withCredentials = true
  useEffect(() => {
    axios
      .get("http://localhost:5000/checkLogged")
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          navigate("/home");
        } else {
          navigate('/login')
          setError(res.data.error)
          setTimeout(() => {
            setError("");
          }, 2000);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  
  const handleLogin = () => {
    axios
    .post("http://localhost:5000/login", { email,password })
    .then((res) => {
       console.log(res.data) 
       if(res.data.success){
          console.log(res.data.user)
          navigate('/home')
       }else{
          navigate('/login')
          setError(res.data.error)
          setTimeout(() => {
            setError("");
          }, 2000);
       }
    })
    .catch((err) => console.log(err));
  }; 


  

  return (
    <div className="container">
      <h2>USER LOGIN</h2>
      <form>
        <div className="form-group">
          <label>Email</label><br/>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label><br/>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error&& <p className='text-danger'>{error}</p>}
        <a className='btn btn-primary mt-2' onClick={handleLogin}>login</a>
        <a className='btn btn-sm btn-warning mt-2' onClick={()=> navigate('/adminLogin')}>login as Admin</a>
      </form>
      <p>
        Don't have an account? <Link to='/register'>Register</Link>
      </p>
      
    </div>
  );
};

export default Login;