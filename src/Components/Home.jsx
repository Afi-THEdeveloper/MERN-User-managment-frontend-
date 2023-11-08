import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addLoggedUser } from "../Slices/LoggedUser";

const imageStyle = {
  width: "150px",
  height: "150px",
  borderRadius: "50%",
  overflow: "hidden",
  margin: "0 auto",
  boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
};

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loggedUsers);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    console.log('hy, iam inside')
    axios
      .get("http://localhost:5000/checkLogged")
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          console.log(res.data.user);
          dispatch(addLoggedUser(res.data.user));
          navigate("/home");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const logoutUser = () => {
    axios
      .get("http://localhost:5000/userLogout")
      .then((res) => {
        if (res.data.success) {
          navigate("/login");
          console.log(res.data);
        } else {
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  console.log('hy,i am outside')
  const handleEditProfile = () => {
    navigate("/editProfile", { state: { user } });
  };

  

  const cardStyle = {
    borderRadius: "15px",
    backgroundColor: "#f9f9f9",
  };

  return (
    <div>
      <Navbar bg="primary-subtle" expand="lg">
        <Navbar.Brand onClick={() => navigate("/register")}>
          Welcome {user && user.name}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="me-auto">
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item className="text-danger" onClick={logoutUser}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div class="row d-flex justify-content-center align-items-center h-100 mt-5">
        <div class="col col-md-9 col-lg-7 col-xl-5">
          <div class="card" style={cardStyle}>
            <div class="card-body p-4 text-black">
              <div>
                <h2 class="mb-4">My Profile</h2>
                <div class="d-flex align-items-center justify-content-between mb-3">
                  <p class="small mb-0">
                    <i class="me-2"></i>
                  </p>
                  <p class="fw-bold mb-0">
                    {user.isVerified ? "verified" : "Not verified"}
                  </p>
                </div>
              </div>
              <div class="d-flex align-items-center mb-4">
                <div style={imageStyle}>
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src={`http://localhost:5000/profile/${user.profile}`}
                    alt="Profile"
                  />
                </div>
                <div class="flex-grow-1 ms-3">
                  <div class="ml-5">
                    <p class="mb-0 me-2">
                      <b>Name: </b>
                      {user.name}
                    </p>
                    <p class="mb-0 me-2">
                      <b>Email: </b>
                      {user.email}
                    </p>
                    <p class="mb-0 me-2">
                      <b>Mobile Number: </b>
                      {user.mobile}
                    </p>
                  </div>
                </div>
              </div>
              {/* <hr /> */}
              <p class="my-4 pb-1"></p>
              <a
                onClick={handleEditProfile}
                class="btn bg-primary-subtle btn-rounded btn-block btn-sm mt-0"
              >
                <i class="me-2"></i>Edit Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
