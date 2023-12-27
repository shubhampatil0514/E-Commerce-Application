const { body, validationResult } = require('express-validator');

const productValidation = [
  body('name')
    .notEmpty()
    .withMessage('A name is required.')
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters.'),
  body('description')
    .notEmpty()
    .withMessage('A description is required.'),
  body('price')
    .isNumeric()
    .withMessage('Price must be a number.'),
  body('stockQuantity')
    .isNumeric()
    .withMessage('Stock quantity must be a number.'),
  body('categories')
    .notEmpty()
    .withMessage('Categories are required.')
    .isLength({ min: 50 })
    .withMessage('Categories must be at least 50 characters long.'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};

module.exports = { productValidation, validate };
