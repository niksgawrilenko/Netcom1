const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {User} = require('../models/userModel');
const {JWT_SECRET} = require('../config');

module.exports.registration = async (req, res) => {
  const {username, email, tel, date, city, streed, home, kv, tarif, password} = req.body;
  const user = await User.findOne({email});

  if (user) {
    return res.status(400).json({message: `Email ${email} already exists`});
  }
  const newUser = new User({
    username,
    email,
    tel,
    date,
    city,
    streed,
    home,
    kv,
    tarif,
    password: await bcrypt.hash(password, 10),
  });
  const addedUser = await newUser.save();
  const token = jwt.sign({email: addedUser.email, id: addedUser._id}, JWT_SECRET);

  res.json({message: 'Profile created successfully!', jwt_token: token});
};

module.exports.login = async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});
  const isCorrectPassword = user ? await bcrypt.compare(password,
      user.password) : false;

  if (!user || !isCorrectPassword) {
    return res.status(400).json({message: 'Wrong email or password'});
  }
  const token = jwt.sign({email: user.email, id: user._id}, JWT_SECRET);

  res.json({message: 'You are logged in successfully!', jwt_token: token});
};
