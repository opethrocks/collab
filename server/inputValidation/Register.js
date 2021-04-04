const Joi = require('joi');

//Define input validation object
const inputSchema = Joi.object({
  //Email must have 'name@mail.com' format
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] }
    })
    //Custom error messages
    .messages({
      'any.required': 'Email is required',
      'string.email': 'Please enter a valid email'
    }),
  //Name must only contain letters
  username: Joi.string()
    .required()
    .pattern(new RegExp('[a-zA-Z0-9]'))
    //Custom error messages
    .messages({
      'any.required': 'Username is required'
      // 'string.pattern.base': 'Name must contain only letters'
    }),
  //Password must have at least 8 but no more than 30 chars, no special chars
  password: Joi.string()
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
    //Custom error messages
    .messages({
      'string.pattern.base':
        'Password must be at least 8 characters with only numbers',
      'any.required': 'Password is required'
    }),
  //Ensure passwords match
  confirmPassword: Joi.any().equal(Joi.ref('password')).required().messages({
    'any.ref': 'Passwords do not match',
    'any.required': 'Confirm password is required',
    'any.only': 'Passwords do not match'
  })
});

module.exports = inputSchema;
