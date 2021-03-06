//Middleware for validating user input

const userValidator = (schema) => {
  return (req, res, next) => {
    //Configure Joi options
    const options = { abortEarly: false, escapeHtml: true };

    //Validate req.body with options and define errors or pass value
    const { error, value } = schema.validate(req.body, options);

    //If there are errors map over them and format how we want
    if (error) {
      let errors = error.details.map((err) => {
        let [param] = err.path;
        let msg = err.message.replace(/\"/g, '');
        return {
          msg,
          param,
        };
      });
      //Send error response
      res.status(400).json({ errors: errors });
    } else {
      //If no errors assign values to req.body and run next middleware
      req.body = value;
      next();
    }
  };
};

module.exports = userValidator;
