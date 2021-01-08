import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./Login";
import Home from "./Home";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Registration from "./Registration";
import ErrorMessage from "./ErrorMessage";

function App() {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  useEffect(() => {
    const checkIsLoggedIn = () => {
      dispatch({
        type: "USER_LOADING",
      });

      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
        dispatch({
          type: "AUTH_ERROR",
        });
      }
      const config = {
        headers: {
          "Content-type": "application/json",
          "x-auth-token": token,
        },
      };
      axios
        .post("http://localhost:5000/api/auth/verify", null, config)
        .then((tokenRes) => {
          if (tokenRes.data) {
            axios
              .get("http://localhost:5000/api/auth/user", config)
              .then((user) => {
                dispatch({
                  type: "USER_LOADED",
                  payload: user.data,
                });
              });
          }
        })
        .catch((e) => e.response.data.msg && setError(e.response.data.msg));
    };
    checkIsLoggedIn();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="App">
      {error && (
        <ErrorMessage eMessage={error} clearError={() => setError(undefined)} />
      )}
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/reg" component={Registration} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
