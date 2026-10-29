const { body } = require('express-validator');

exports.registerRules = [
  body('nome').trim().notEmpty().withMessage('Nome é obrigatório').escape(),
  body('email').trim().isEmail().withMessage('E-mail inválido').normalizeEmail(),
  body('telefone')
    .optional({ values: 'falsy' })
    .trim()
    .matches(/^\d{10,11}$/).withMessage('Telefone deve ter 10 ou 11 dígitos, só números (com DDD)'),
  body('senha')
    .isLength({ min: 8 }).withMessage('Senha deve ter no mínimo 8 caracteres')
    .matches(/\d/).withMessage('Senha deve conter ao menos um número'),
];

exports.loginRules = [
  body('email').trim().isEmail().withMessage('E-mail inválido').normalizeEmail(),
  body('senha').notEmpty().withMessage('Senha é obrigatória'),
];
