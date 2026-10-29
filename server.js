require('dotenv').config();

const express = require('express');
const sequelize = require('./config/database');

require('./models/associations');

const AuthRoutes = require('./routes/AuthRoutes');
const AppointmentRoutes = require('./routes/AppointmentRoutes');

const app = express();

app.use(express.json());

app.use('/auth', AuthRoutes);
app.use('/consultas', AppointmentRoutes);

app.get('/', (req, res) => {
    res.json({
        mensagem: 'API da Clínica Odontológica funcionando!'
    });
});

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
    try {
        await sequelize.authenticate();

        await sequelize.sync();

        console.log('Conectado ao MySQL com sucesso!');

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });

    } catch (erro) {
        console.error('Erro ao iniciar a API:', erro.message);
    }
}

iniciarServidor();