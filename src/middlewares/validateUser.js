const validateUser = (req, res, next) => {
  const { firstname, lastname, email, city, language } = req.body;
  const errors = [];

  if (!firstname) {
    errors.push({ field: "firstname", message: "This field is required" });
  }

  if (!lastname) {
    errors.push({ field: "lastname", message: "This field is required" });
  }

  if (!email) {
    errors.push({ field: "email", message: "This field is required" });
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.push({ field: "email", message: "Invalid email format" });
  }

  if (!city) {
    errors.push({ field: "city", message: "This field is required" });
  }

  if (!language) {
    errors.push({ field: "language", message: "This field is required" });
  }

  if (errors.length) {
    return res.status(422).json({ validationErrors: errors });
  }

  next();
};
