const {User} = require('../models/userModel');

module.exports.getUserProfileInfo = async (req, res) => {
  const userProfileInfo = await User.findById(req.user.id,
      {password: 0, __v: 0});

  if (!userProfileInfo) {
    return res.status(400).json({message: 'No user found'});
  }
  res.json({user: userProfileInfo});
};

module.exports.changeUserBalans = async (req, res) => {
  const user = await User.findById(req.user.id);
  const {newBalans} = req.body;

  await user.updateOne({balans: newBalans});
  res.json({message: 'Balans changed successfully!'});
};

module.exports.updateUser = async (req, res) => {
  const {ls, username, email, tel, city, streed, home, kv, tarif, balans} = req.body;
  const user = await User.findById(ls);

  await user.updateOne({
    username,
    email,
    tel,
    city,
    streed,
    home,
    kv,
    tarif,
    balans,
  });
  res.json({message: 'User details changed successfully!'});
};

module.exports.getUser = async (req, res) => {
  const {ls} = req.body;
  const user = await User.findById(ls);

  res.json(user);
};
