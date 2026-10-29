const { body, param } = require('express-validator');

const PROCEDIMENTOS = ['avaliacao', 'limpeza', 'restauracao', 'extracao', 'canal', 'clareamento'];

exports.appointmentRules = [
  body('procedimento')
    .isIn(PROCEDIMENTOS)
    .withMessage(`Procedimento inválido (use: ${PROCEDIMENTOS.join(', ')})`),
  body('dentista').trim().notEmpty().withMessage('Dentista é obrigatório').escape(),
  body('observacoes').optional({ values: 'falsy' }).trim().isLength({ max: 255 })
    .withMessage('Observações devem ter no máximo 255 caracteres').escape(),
  body('data')
    .isISO8601().withMessage('Data inválida (use AAAA-MM-DDTHH:mm)')
    .custom((v) => new Date(v) > new Date()).withMessage('A data deve ser futura')
    .custom((v) => {
      const d = new Date(v);
      const diaUtil = d.getDay() >= 1 && d.getDay() <= 5; // segunda a sexta
      const horarioOk = d.getHours() >= 8 && d.getHours() < 18; // 08h às 18h
      return diaUtil && horarioOk;
    }).withMessage('A clínica atende de segunda a sexta, das 8h às 18h'),
];

exports.idRules = [
  param('id').isInt({ min: 1 }).withMessage('ID inválido').toInt(),
];
