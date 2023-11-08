import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addUser, searchUser } from "../../Slices/UserDataSlice";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [error, setError] = useState("");
  const [searched, setSearched] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const users = useSelector((state) => state.users);
  console.log(users);

  const logoutAdmin = () => {
    axios
      .get("http://localhost:5000/logoutAdmin")
      .then((res) => {
        if (res.data.success) {
          navigate("/adminLogin");
          console.log(res.data);
        } else {
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const EditUser = (id) => {
    const user = users.filter((user) => user._id === id);
    console.log(user);
    if (user) {
      navigate("/editUser", { state: { user } });
    }
  };

  const handleSearch = () => {
    dispatch(searchUser(searched));
  };

  const clearFilter = () => {
    axios.get("http://localhost:5000/getUsers").then((res) => {
      if (res.data.success) {
        console.log("backend data", res.data.users);
        dispatch(addUser(res.data.users));
        setSearched("");
      } else {
        setError("No users");
      }
    });
  };

  const deleteUser = (id) => {
    axios.post("http://localhost:5000/deleteUser", { id: id }).then((res) => {
      if (res.data.success) {
        dispatch(addUser(res.data.users));
      } else {
        console.log(res.data);
      }
    });
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

    axios.get("http://localhost:5000/getUsers").then((res) => {
      if (res.data.success) {
        console.log("backend data", res.data.users);
        dispatch(addUser(res.data.users));
        setSearched("");
      } else {
        setError("No users");
      }
    });
    console.log("hy");
  }, []);

  return (
    <div>
      <Navbar bg="secondary" expand="lg">
        <Navbar.Brand>Admin dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="me-auto">
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item className="text-primary">
                Add user
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className="text-danger" onClick={logoutAdmin}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search User"
              className="me-2"
              aria-label="Search"
              value={searched}
              onChange={(e) => setSearched(e.target.value)}
            />
            <a
              onClick={handleSearch}
              className="btn btn-outline-dark rounded-pill"
            >
              Search
            </a>
            <a
              onClick={clearFilter}
              className="btn btn-outline-warning rounded-pill"
            >
              Clear
            </a>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <h3>users List</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Slno.</th>
            <th scope="col">name</th>
            <th scope="col">email</th>
            <th scope="col">mobile</th>
            <th scope="col">verified</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.isVerified ? "Yes" : "No"}</td>
                <td>
                  <button
                    onClick={() => EditUser(user._id)}
                    className="text-primary"
                  >
                    edit
                  </button>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="text-danger"
                  >
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
