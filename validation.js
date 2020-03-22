const Joi = require("@hapi/joi");

const registerValidation = data => {
  const schema = Joi.object({
    name: Joi.string()
      .min(4)
      .required(),
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .min(8)
      .required()
  });

  return schema.validate(data);
};

const loginValidation = data => {
  const schema = Joi.object({
    name: Joi.string()
      .min(4)
      .required(),
    password: Joi.string()
      .min(8)
      .required()
  });

  return schema.validate(data);
};

const postValidation = data => {
  const schema = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().required(),
    for: Joi.string().required(),
    description: Joi.string().required(),
    author: Joi.string().required()
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.postValidation = postValidation;
