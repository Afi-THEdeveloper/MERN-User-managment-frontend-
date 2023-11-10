import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EditProfile() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  let user;
  if (location.state) {
    const { userDetails } = location.state;
    user = userDetails;
  }

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:5000/checkLogged")
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          console.log(res.data.user);
          navigate("/editProfile");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
    if (user) {
      setName(user.name);
      setMobile(user.mobile);
      setEmail(user.email);
      setPreview(`http://localhost:5000/profile/${user.profile}`);
    }
  }, []);

  const handleForm = (e) => {
    if (name.length === 0) {
      setError("name is required");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    if (mobile.length < 10 || mobile.length > 10) {
      console.log(mobile.length);
      setError("mobile is invalid or must contaion 10 digits");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    const data = new FormData();
    const selectedImage = document.getElementById("upload");
    const image = selectedImage.files[0];

    if (image) {
      if(image.type.startsWith('image')){
        data.append("profile", image);
      }else{
        setError("only images are allowed to upload!");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
      }
    }
    data.append("name", name);
    data.append("mobile", mobile);
    data.append("email", email);
    console.log(data);

    axios
      .post("http://localhost:5000/editProfile", data)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.user);
          navigate("/home");
        } else {
          setError(res.data.error)
          navigate("/editProfile");
        }
      })
      .catch((err) => console.log(err.message));
  };

  const handlePreview = (e) => {
    console.log(e.target.files);
    if (e.target.files.length === 0) {
      return setPreview(null);
    }
    const url = URL.createObjectURL(e.target.files[0]);
    setPreview(url);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center ">
      <div className="square-div">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Edit profile</h4>
            <form className="forms-sample">
              <div className="form-group">
                <label htmlFor="exampleInputName1">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="exampleInputName1"
                  placeholder="Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputName1">Mobile</label>
                <input
                  type="number"
                  className="form-control"
                  name="phone"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  id="exampleInputName1"
                  placeholder="Phone"
                />
              </div>

              <div className="form-group">
                <label>Profile Image</label>
                <div className="input-group col-xs-12">
                  <input
                    type="file"
                    name="profile"
                    id="upload"
                    accept="image/*"
                    onChange={handlePreview}
                  />
                  <br />
                </div>
              </div>

              {preview && (
                <div className="card">
                  <div className="card-header">Preview Image</div>
                  <div className="card-body">
                    <div className="d-flex justify-content-center">
                      <img
                        src={preview}
                        className="preview"
                        style={{
                          maxWidth: "500px",
                          objectFit: "cover",
                          maxHeight: "400px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
              {error && <p className="text-danger">{error}</p>}
              <a
                type="button"
                onClick={handleForm}
                placeholder="update"
                className="btn btn-primary w-50 mt-3"
              >
                Update
              </a>
              <br />
              <a
                type="button"
                onClick={() => navigate("/home")}
                className="btn bg-warning-subtle mt-2"
              >
                Cancel
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
