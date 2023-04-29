/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { SideBar } from "./SideBar";

export const Dashboard = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [users, setUsers] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getUsers();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
      if (decoded.permission_level < 1) {
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:5000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUsers = async () => {
    const response = await axiosJWT.get("http://localhost:5000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(response.data);
  };

  const roleDecider = (e) => {
    if (e === 0) {
      return "User";
    }
    if (e === 1) {
      return "Admin";
    }
    if (e === 2) {
      return "Super Admin";
    }
  };

  return (
    <>
      <div className="content">
        <Grid container spacing={1}>
          <Grid item xs={2} className="gridR">
            <div className="sidebardiv">
              <SideBar />
            </div>
          </Grid>
          <Grid item xs={10} className="gridL">
            <div className="decidediv">
              <div className="container mt-5">
                <h1 style={{ color: "#EEE" }}>Welcome Back: {name}</h1>
                <table className="table is-striped is-fullwidth">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Go-to button</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{roleDecider(user.permission_level)}</td>
                        <td>
                          <button
                            onClick={() => navigate(`/profile/${user.id}`)}
                            className="btn btn-success"
                          >
                            View user
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
