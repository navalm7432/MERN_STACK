import React, { useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { ShoppingBasket } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./Modal";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const result = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(result);
  const logOut = () => {
    dispatch({
      type: "LOGOUT_SUCCESS",
    });
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/items").then((res) => {
      if (res.data.status === "empty") {
        dispatch({
          type: "IS_EMPTY",
          payload: true,
        });
      } else {
        dispatch({
          type: "LOADING_ITEMS",
        });
        dispatch({
          type: "GET_ITEMS",
          payload: res.data,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      {result.auth.token ? (
        <div class="loggedIn">
          <h3>Welcome {result.auth.user && result.auth.user.name}</h3>
          <Button variant="outlined" color="primary" onClick={logOut}>
            Logout
          </Button>
        </div>
      ) : (
        <div class="authButtons">
          <Link to="/login">
            <Button variant="outlined" color="primary">
              Login
            </Button>
          </Link>
          <Link to="/reg">
            <Button variant="outlined" color="primary">
              Register
            </Button>
          </Link>
        </div>
      )}
      <h1>Shopping List</h1>
      <Modal />
      {result.item.data.length !== 0 ? (
        result.item.data.map((items) => (
          <List component="nav" aria-label="main mailbox folders">
            <ListItem claaName="listItem" button>
              <ListItemIcon>
                <ShoppingBasket />
              </ListItemIcon>
              <ListItemText primary={items.name} />
              <IconButton
                aria-label="delete"
                onClick={() => {
                  const token = localStorage.getItem("auth-token");
                  const config = {
                    headers: {
                      "Content-type": "application/json",
                      "x-auth-token": token,
                    },
                  };
                  axios
                    .delete(
                      `http://localhost:5000/api/items/${items._id}`,
                      config
                    )
                    .then((res) => {
                      dispatch({
                        type: "REMOVE_ITEM",
                        payload: res.data._id,
                      });
                    });
                }}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          </List>
        ))
      ) : (
        <h1>Empty Basket</h1>
      )}
    </div>
  );
}

export default Home;
