// middleware/validateRequest.js
const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false }); 
  // abortEarly:false -> collect all validation errors, not just the first one

  if (error) {
    const errors = error.details.map((err) => err.message);
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  next(); // if validation passed, continue to controller
};
export { validateRequest }