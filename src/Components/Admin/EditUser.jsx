import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function EditUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state;
  axios.defaults.withCredentials = true;

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [verify, setVerify] = useState();
  const [email,setEmail] =useState('')
  const [error, setError] = useState("");

  console.log(user);
  useEffect(() => {
    if (user) {
      setName(user[0].name);
      setEmail(user[0].email)
      setMobile(user[0].mobile);
      setVerify(user[0].isVerified);
    }
  }, []);

  const handleUpdate = () => {
    if(name.length===0){
        setError('name is required')
        setTimeout(() => {
            setError("");
          }, 2000);
        return  
    }
    if(mobile.length < 10 || mobile.length >10){
        console.log(mobile.length)
        setError('mobile is invalid or must contaion 10 digits')
        setTimeout(() => {
            setError("");
          }, 2000);
        return  
    }

    axios
      .post("http://localhost:5000/UpdateUser", { name, mobile, verify,email })
      .then((res) => {
        if (res.data.success) {
          navigate('/dashboard')
        } else {
            setError(res.data.error);
            setTimeout(() => {
              setError("");
            }, 2000);
        }
      })
      .catch((err) => setError(err.message));
  };
  return (
    <div className="container">
      <h2>Edit user</h2>
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
          <label>Mobile:</label>
          <input
            type="number"
            className="form-control"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        <div class="mb-3">
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="is_varified"
              id="verify"
              checked={verify}
              onChange={() => setVerify(true)}
            />
            <label class="form-check-label" for="verify">
              Verify
            </label>
          </div>
        </div>
        <div class="mb-3">
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="is_varified"
              id="verify"
              checked={!verify}
              onChange={() => setVerify(false)}
            />
            <label class="form-check-label" for="verify">
              Not Verify
            </label>
          </div>
        </div>

        {error && <p className="text-danger">{error}</p>}
        <a className="btn btn-primary" onClick={handleUpdate}>
          Update
        </a>
        <br />
        <br />
        <a
          className="btn btn-secondary"
          onClick={() => navigate("/dashboard")}
        >
          Back
        </a>
      </form>
    </div>
  );
}

export default EditUser;
