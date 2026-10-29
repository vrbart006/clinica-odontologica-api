const { validationResult } = require('express-validator');

// Junta os erros do express-validator e responde 400
module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ erros: errors.array() });
  }
  next();
};
