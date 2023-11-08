import React, { useState, useEffect } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const handleRegister = () => {
    if (name.length === 0 || email.length === 0 ||password.length === 0) {
      setError("All fields are required");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    if (mobile.length < 10 || mobile.length > 10) {
      setError("mobile number must be 10 digits");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    axios
      .post("http://localhost:5000/register", { name, email, mobile, password })
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.user);
          navigate("/login");
          setError(response.data.error);
          setTimeout(() => {
            setError("");
          }, 2000);
          return;
        } else {
          navigate("/register");
          setError(response.data.error);
          setTimeout(() => {
            setError("");
          }, 2000);
          return;
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/checkLogged")
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          navigate("/home", { state: res.data.user });
        } else {
          navigate("/register");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <h2>Register</h2>
      <form>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Mobile:</label>
          <input
            type="text"
            className="form-control"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <a className="btn btn-primary" onClick={handleRegister}>
          Register
        </a>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
