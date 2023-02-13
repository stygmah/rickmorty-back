const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = {
  endpoint: "login",
  method: "post",
  scope: "public",
  httpFunction: async (req, res) => {
    try {
      const { email, password } = req.body;
      if(!email || !password) return res.status(400).send("Email and password are required");
      
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).send("Email or password is incorrect");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid){
        return res.status(401).send("Email or password is incorrect");
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.status(200).send({ email: user.email,  token });
    } catch (error) {
      res.status(500).send(error);
    }
  },
};