import React, { useState, useEffect } from "react";
import "../Login/Login";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleLogin = () => {
    if (email.length === 0 || password.length === 0) {
      setError('All fields are required');
      setTimeout(() => {
        setError("");
      }, 2000);
      return
    }
    axios
      .post("http://localhost:5000/Adminlogin", { email, password })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          navigate("/dashboard");
        } else {
          navigate("/adminLogin");
          setError(res.data.error);
          setTimeout(() => {
            setError("");
          }, 2000);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/checkAdminLogged")
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          navigate("/dashboard");
        } else {
          navigate("/adminlogin");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <h2>ADMIN LOGIN</h2>
      <form>
        <div className="form-group">
          <label>Email</label>
          <br />
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <br />
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <a className="btn btn-primary mt-2" onClick={handleLogin}>
          login
        </a>
        <a className="btn btn-warning mt-2" onClick={() => navigate("/login")}>
          Back to user login
        </a>
      </form>
    </div>
  );
};

export default AdminLogin;
