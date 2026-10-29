const User = require('./User');
const Appointment = require('./Appointment');

// Um paciente tem várias consultas
User.hasMany(Appointment, { foreignKey: 'userId' });
Appointment.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Appointment };
