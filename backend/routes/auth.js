const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const JWT = require("jsonwebtoken");
const User = require("../models/User.js");
const bcrypt = require("bcrypt");

//Register
router.post(
  "/signup",
  [
    check("email", "Invalid email").isEmail(),
    check("password", "Password must be at least 6 chars long").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const { email, password } = req.body;

    // Validate user input
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // Validate if user already exists
    const checkuser = await User.findOne({ email });

    if (checkuser) {
      // 422 Unprocessable Entity: server understands the content type of the request entity
      // 200 Ok: Gmail, Facebook, Amazon, Twitter are returning 200 for user already exists
      return res.status(409).send("User already exists");
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      const user = await newUser.save();
      const acessToken = JWT.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({user, acessToken});
    } catch (err) {
      console.log(err);
    }
  }
);

//Login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json("user not found");
    }
    const vaildPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!vaildPassword) {
      res.status(400).json("wrong password");
    }

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
