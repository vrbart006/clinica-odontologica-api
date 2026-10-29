const Appointment = require('../models/Appointment');

class AppointmentController {

    static async criar(req, res) {
        try {
            const {
                procedimento,
                dentista,
                data,
                observacoes
            } = req.body;

            if (!procedimento || !dentista || !data) {
                return res.status(400).json({
                    mensagem: 'Preencha procedimento, dentista e data.'
                });
            }

            const dataConsulta = new Date(data);

            if (isNaN(dataConsulta.getTime()) ||
                dataConsulta <= new Date()) {
                return res.status(400).json({
                    mensagem: 'A data da consulta deve ser futura.'
                });
            }

            const consulta = await Appointment.create({
                procedimento,
                dentista,
                data: dataConsulta,
                observacoes,
                userId: req.userId
            });

            return res.status(201).json({
                mensagem: 'Consulta agendada com sucesso!',
                consulta
            });

        } catch (erro) {
            return res.status(500).json({
                mensagem: 'Erro ao agendar consulta.'
            });
        }
    }

    static async listar(req, res) {
        try {
            const consultas = await Appointment.findAll({
                where: {
                    userId: req.userId
                },
                order: [['data', 'ASC']]
            });

            return res.status(200).json(consultas);

        } catch (erro) {
            return res.status(500).json({
                mensagem: 'Erro ao listar consultas.'
            });
        }
    }
}

module.exports = AppointmentController;