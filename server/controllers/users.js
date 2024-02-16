const User = require("../models/userModel");
exports.createUser = async (req, res) => {
  try {
    const { username, avatar } = req.body;
    const user = await User.create({ username, avatar });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
