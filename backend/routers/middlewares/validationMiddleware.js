const joi = require('joi');

module.exports.registrationValidation = async (req, res, next) => {
  const schema = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    tel: joi.string().required(),
    date: joi.string().required(),
    city: joi.string().required(),
    streed: joi.string().required(),
    home: joi.string().required(),
    kv: joi.string().required(),
    tarif: joi.string().required(),
  });

  await schema.validateAsync(req.body);
  next();
};

module.exports.loginValidation = async (req, res, next) => {
  console.log(req.body);
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  await schema.validateAsync(req.body);
  next();
};
