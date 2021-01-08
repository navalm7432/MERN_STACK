import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const history = useHistory();

  const onSubmit = () => {
    const data = {
      email: email,
      password: password,
    };
    dispatch({
      type: "USER_LOADING",
    });

    axios
      .post("http://localhost:5000/api/auth", data)
      .then((user) => {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: user.data,
        });
        localStorage.setItem("auth-token", user.data.token);
        history.push("/");
      })
      .catch((e) => {
        e.response.data.msg && setError(e.response.data.msg);
      });
  };
  return (
    <div className="login">
      <h2>Login Form</h2>
      {error && (
        <ErrorMessage eMessage={error} clearError={() => setError(undefined)} />
      )}
      <div class="loginForm">
        <div class="container">
          <span>Email</span>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Enter Email"
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
          />
        </div>
        <button onClick={onSubmit}>Login</button>
      </div>
    </div>
  );
}

export default Login;
