const User = require("../models/userModel");
const validatePassword = require("../helpers/validatePassword");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const {
    firstName,
    lastName,
    phone,
    email,
    password,
    confirmPassword,
    role,
    bookingHistory,
  } = req.body;
  const image = req.file ? req.file.path : null;

  // const firstName = req.body.firstName
  // const lastName = req.body.lastName
  // const phone = req.body.phone
  // const email = req.body.email
  // const password = req.body.password
  // const confirmPassword = req.body.confirmPassword
  // const role = req.body.role
  // const image = req.file.path
  // const bookingHistory = req.body.bookingHistory

  // check if password match
  if (password !== confirmPassword) {
    return res.json("do not match");
  }

  // check if password is valid
  if (!validatePassword(password)) {
    return res.json("Invalid password");
  }

  try {
    // check if user exists
    let user = await User.findOne({ email });
    if (user) {
      res.json("exists");
    }

    user = new User({
      firstName,
      lastName,
      phone,
      email,
      password,
      role,
      image,
      bookingHistory,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header("auth-token", token).json(user);
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json("invalid email/password");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.json("invalid email/password");
    }

    const token = user.generateAuthToken();
    res.json({ token: token, user: user });
  } catch (error) {
    console.log(error);
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("bookingHistory", "bookingDate paymentStatus totalCost")
      .populate({
        path: "bookingHistory",
        populate: {
          path: "room",
          select: "roomName roomImage",
          populate: {
            path: "hotel",
            select: "name address phone",
          },
        },
      });

    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

exports.editUserProfile = async (req, res) => {
  const { firstName, lastName, phone, email } = req.body;
  try {
    const user = await User.findById(req.user.id);

    user.firstName = firstName;
    user.lastName = lastName;
    user.phone = phone;
    user.email = email;

    const updatedProfile = await user.save();
    res.json(updatedProfile);
  } catch (error) {
    console.log(error);
  }
};
