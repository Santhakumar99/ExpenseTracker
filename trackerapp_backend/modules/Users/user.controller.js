const User = require("../Users/user.model")
exports.GetAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};
exports.CreateAllUsers = async (req, res) => {
  try {
    const { name, age, email, mobile } = req.body;
    let user = new User({
      name,
      age,
      email,
      mobile,
      password : "User@123"
    });
    const CreateUsers = await user.save();
    res.json(CreateUsers);
  } catch (err) {
    console.log("error" + err);
  }
};
exports.FindUser = async (req, res) => {
  try {
    const getusers = await User.findOne({ _id: req.params.id });
    res.json(getusers);
  } catch (err) {
    console.log("error" + err);
  }
};
exports.UpdateUser = async (req, res) => {
  const { id } = req.params;
  const { name, age, email, mobile } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, age, email, mobile, password: "user@123" },
      { new: true }
    );
    res.send(user);
  } catch (err) {
    console.log("error" + err);
    res.status(500).send(err);
  }
};
exports.DeleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
exports.login = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name, password });
    if (!user) {
      res.status(404).json({ success: false, message: "Invalid Credentials !!" });
    } else {
      res.status(200).json({ success: true, message: "User Found" , user });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error,
    });
  }
};
