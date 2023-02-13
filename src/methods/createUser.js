const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

module.exports = {
  endpoint: "createUser",
  method: "post",
  scope: "public",
  httpFunction: async (req, res) => {
    try {
      const { email, password } = req.body;
      if(!email || !password) return res.status(400).send("Email and password are required");

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("The email is already in use.");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = new User({
        email,
        password: hashedPassword,
      });
      await user.save();

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.send({ message: "User created successfully", email, token });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};
