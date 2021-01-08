import express from "express";
import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";
import auth from "../../middleware/auth.js";

const router = express.Router();

//@routes  Post api/auth
//@desc  Authenticate user
//@access  public

router.post("/", (req, res) => {
  const { email, password } = req.body;

  //simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please Enter all fields" });
  }

  //check if user already exist
  User.findOne({ email }).then((user) => {
    if (!user) res.status(400).json({ msg: "User does not exists" });
    else {
      // validating user
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch)
          return res.status(400).json({ msg: "Invalid credentials" });
        else {
          jwt.sign({ id: user.id }, config.get("jwtSecret"), (error, token) => {
            if (error) throw err;
            else {
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          });
        }
      });
    }
  });
});

//@routes  GET api/auth/user
//@desc  delete user from data
//@access  private

router.get("/user", auth, (req, res) => {
  User.findById(req.user).then((user) =>
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
    })
  );
});

//@routes  Post api/auth/verify
//@desc  verify token
//@access  private
router.post("/verify", (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, config.get("jwtSecret"));
    if (!verified) return res.json(false);

    User.findById(verified.id).then((user) => {
      if (!user) return res.json(false);
    });

    return res.json(true);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//@routes  GET api/auth/delete
//@desc  delete user from data
//@access  private
router.delete("/delete", auth, (req, res) => {
  try {
    User.findByIdAndDelete(req.user).then((deletedUser) =>
      res.status(200).json(deletedUser)
    );
  } catch (e) {
    res.status(500).json({ mssg: e.message });
  }
});

export default router;
