const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthController {

    static async cadastrar(req, res) {
        try {
            const { nome, email, senha } = req.body;

            const usuarioExistente = await User.findOne({
                where: { email }
            });

            if (usuarioExistente) {
                return res.status(409).json({
                    mensagem: 'E-mail já cadastrado.'
                });
            }

            const senhaCriptografada = await bcrypt.hash(senha, 10);

            const usuario = await User.create({
                nome,
                email,
                senha: senhaCriptografada
            });

            return res.status(201).json({
                mensagem: 'Usuário cadastrado com sucesso!',
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            });

        } catch (erro) {
            return res.status(500).json({
                mensagem: 'Erro ao cadastrar usuário.'
            });
        }
    }

    static async login(req, res) {
        try {
            const { email, senha } = req.body;

            const usuario = await User.findOne({
                where: { email }
            });

            if (!usuario) {
                return res.status(401).json({
                    mensagem: 'E-mail ou senha inválidos.'
                });
            }

            const senhaCorreta = await bcrypt.compare(
                senha,
                usuario.senha
            );

            if (!senhaCorreta) {
                return res.status(401).json({
                    mensagem: 'E-mail ou senha inválidos.'
                });
            }

            const token = jwt.sign(
                { id: usuario.id },
                process.env.JWT_SECRET,
                { expiresIn: '2h' }
            );

            return res.status(200).json({
                mensagem: 'Login realizado com sucesso!',
                token
            });

        } catch (erro) {
            return res.status(500).json({
                mensagem: 'Erro ao realizar login.'
            });
        }
    }
}

module.exports = AuthController;