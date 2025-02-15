const Joi = require('joi');

const verifySchema = Joi.object({
    transaction_id: Joi.string().hex().length(24).required()
});

module.exports = verifySchema;
