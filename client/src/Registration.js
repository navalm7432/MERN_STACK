import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";

function Registration() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async () => {
    const data = {
      name: name,
      email: email,
      password: password,
    };
    try {
      const user = await axios.post("http://localhost:5000/api/users", data);
      console.log(user);
      localStorage.setItem("auth-token", user.data.token);
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: user.data,
      });
      history.push("/");
    } catch (e) {
      e.response && setError(e.response.data.msg);
    }
  };

  return (
    <div className="login">
      <h2>Registration Form</h2>
      {error && (
        <ErrorMessage eMessage={error} clearError={() => setError(undefined)} />
      )}
      <div class="loginForm">
        <div class="container">
          <span>Name</span>
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="Enter Name"
            required
          />
        </div>
        <div class="container">
          <span>Email</span>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            placeholder="Enter Email"
            required
          />
        </div>
        <div class="container">
          <span>Password</span>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="text"
            placeholder="Enter Password"
            required
          />
        </div>
        <button onClick={onSubmit}>Register</button>
      </div>
    </div>
  );
}

export default Registration;
