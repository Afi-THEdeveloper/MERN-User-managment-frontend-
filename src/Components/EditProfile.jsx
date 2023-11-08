import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EditProfile() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState(null);

  const navigate = useNavigate()
  const location = useLocation();
  const { user } = location.state;
  axios.defaults.withCredentials = true;
  useEffect(() => {
    if (user) {
      setName(user.name);
      setMobile(user.mobile);
      setImage(user.image);
      setEmail(user.email);
    }
  }, []);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    console.log(image);
  };

  const updateProfile = () => {
    console.log(image);
    const formData = new FormData();
    formData.append("profileImage", image);

    axios
      .post("http://localhost:5000/editProfile", {email, name, mobile, image })
      .then((res) => {
        if(res.data.success){
          navigate('/home', {state:res.data.user})
        }else{
          alert(res.data.error)
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="container d-flex justify-content-center align-items-center ">
      <div className="square-div">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Edit profile</h4>
            <form className="forms-sample" encType="multipart/form-data">
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
                  {/* <input
                    type="file"
                    accept="image/*"
                    name="image"
                    value={image}
                    className="form-control file-upload-info"
                    placeholder="Upload Image"
                    onChange={handleImageChange}
                  /> */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <a
                type="button"
                onClick={updateProfile}
                className="btn btn-primary mr-2"
              >
                Update
              </a>
              <a
                type="button"
                onClick={() => window.history.back()}
                className="btn btn-warning mt-2"
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
