import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch } from "react-redux";
import axios from "axios";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState({});

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setItem(e.target.value);
  };

  const onSubmit = () => {
    const Item = {
      name: item,
    };
    const token = localStorage.getItem("auth-token");
    const config = {
      headers: {
        "Content-type": "application/json",
        "x-auth-token": token,
      },
    };
    axios.post("http://localhost:5000/api/items", Item, config).then((res) => {
      dispatch({
        type: "IS_EMPTY",
        payload: false,
      });
      console.log(res);
      dispatch({
        type: "ADD_ITEM",
        payload: res.data,
      });
    });
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Item
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Item Name :"
            type="email"
            fullWidth
            onChange={onChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
