const Joi = require('joi');

const inputSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] }
    })
    .messages({
      'any.required': 'Email is required',
      'string.email': 'Please enter a valid email'
    }),
  password: Joi.string()
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
    .messages({
      'string.pattern.base':
        'Password must be at least 8 characters with only numbers',
      'any.required': 'Password is required'
    })
});

module.exports = inputSchema;
