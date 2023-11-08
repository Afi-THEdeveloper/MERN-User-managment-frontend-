import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


function EditProfile() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState(null);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state;
  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (user) {
      setName(user.name);
      setMobile(user.mobile);
      setEmail(user.email);
      setPreview(`http://localhost:5000/profile/${user.profile}`)
    }
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    const data = new FormData();
    const selectedImage = document.getElementById("upload");
    const image = selectedImage.files[0];

    if (image) {
      data.append("profile", image);
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
          console.log("failed");
          navigate("/editProfile");
        }
      })
      .catch((err) => console.log(err.message));
  };

  const handlePreview = (e) => {
    console.log(e.target.files)
    if(e.target.files.length === 0){
      return setPreview(null)
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
            <form className="forms-sample" onSubmit={handleForm}>
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
                          style={{ maxWidth: "500px", objectFit: "cover",maxHeight:'400px' }}
                        />
                      </div>
                    </div>
                  </div>
              
              )}

              <input type="submit" placeholder="submit" className="btn btn-primary w-50 mt-3" /><br />
              <a
                type="button"
                onClick={() => window.history.back()}
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
