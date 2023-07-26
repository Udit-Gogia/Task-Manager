const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/user");

const router = new express.Router();

router.get("/users/me", auth, (req, res) => {
  res.send(req.user);
});

router.post("/user/login", async (req, res) => {
  console.log("entered /user/login", req.body);
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (err) {
    if (err.message === "Passwords do not match") {
      return res.status(400).send({
        err: "Unable to login",
        msg: "Passwords do not match",
        code: "invPwd",
      });
    }
    res.status(404).send({
      err: "Invalid login credentials",
      msg: "No User found",
      code: "noUser",
    });
  }
});

router.post("/user/logout", auth, async (req, res) => {
  try {
    const user = req.user;
    user.tokens = user.tokens.filter((tokens) => tokens.token !== req.token);

    await user.save();
    res.send({
      msg: "Logout Successful",
      code: "removed-token",
    });
  } catch (err) {
    res.status(500).send();
  }
});

router.post("/user/logoutAll", auth, async (req, res) => {
  try {
    const user = req.user;
    user.tokens = [];

    await user.save();
    res.send({
      msg: "Successfully logged out of all sessions",
      code: "notokens",
    });
    res.send();
  } catch (err) {
    res.status(500).send({
      err: "Error logging out of all sessions",
      msg: "Failed to logout of all sessions",
      msg: "cntLA",
    });
  }
});

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    const token = await user.generateAuthToken();
    await user.save();
    res.status(201).send({ user, token });
  } catch (err) {
    // 409 status code represents conflit
    if (err.toString().includes("duplicate key error")) {
      return res
        .status(409)
        .send({ err, msg: "User already exists", code: "dupUser" });
    } else if (
      err.toString().includes("Password cannot contain the word password")
    ) {
      res.setHeader("code", "pwdRep");
      return res.status(400).send({
        err,
        msg: 'Password cannot contain the word "password".',
        code: "pwdRep",
      });
      c;
    }
    res.status(500).send(err);
  }
});

router.patch("/user/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const user = req.user;

    updates.forEach((update) => (user[update] = req.body[update]));

    await user.save();

    res.send({
      user,
      msg: "User data updated successfully",
      code: "successUpdt",
    });
  } catch (err) {
    res
      .status(400)
      .send({ err, msg: "Unable to update data", code: "noUpdate" });
  }
});

router.delete("/user/me", auth, async (req, res) => {
  try {
    await User.deleteOne({ _id: req.user._id });

    res.send(req.user);
  } catch (err) {
    res.status(500).send({ err, msg: "Unable to delete user", code: "cntDlt" });
  }
});

module.exports = router;
