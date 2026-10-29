const express = require('express');
const AuthController = require('../controllers/authController');
const { body, validationResult } = require('express-validator');

const router = express.Router();

function validarDados(req, res, next) {
    const erros = validationResult(req);

    if (!erros.isEmpty()) {
        return res.status(400).json({
            erros: erros.array()
        });
    }

    next();
}

router.post(
    '/cadastro',
    [
        body('nome').trim().notEmpty()
            .withMessage('O nome é obrigatório.'),

        body('email').isEmail()
            .withMessage('Informe um e-mail válido.'),

        body('senha').isLength({ min: 6 })
            .withMessage('A senha deve ter pelo menos 6 caracteres.')
    ],
    validarDados,
    AuthController.cadastrar
);

router.post(
    '/login',
    [
        body('email').isEmail()
            .withMessage('Informe um e-mail válido.'),

        body('senha').notEmpty()
            .withMessage('A senha é obrigatória.')
    ],
    validarDados,
    AuthController.login
);

module.exports = router;