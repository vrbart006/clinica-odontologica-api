const User = require('./User');
const Appointment = require('./Appointment');

User.hasMany(Appointment, {
    foreignKey: 'userId'
});

Appointment.belongsTo(User, {
    foreignKey: 'userId'
});

module.exports = {
    User,
    Appointment
};