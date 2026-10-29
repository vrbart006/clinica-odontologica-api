const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Appointment = sequelize.define('Appointment', {
    procedimento: {
        type: DataTypes.STRING,
        allowNull: false
    },

    dentista: {
        type: DataTypes.STRING,
        allowNull: false
    },

    data: {
        type: DataTypes.DATE,
        allowNull: false
    },

    observacoes: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    status: {
        type: DataTypes.STRING,
        defaultValue: 'agendada'
    }
});

module.exports = Appointment;