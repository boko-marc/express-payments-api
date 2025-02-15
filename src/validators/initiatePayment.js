const Joi = require('joi');

const paymentSchema = Joi.object({
    email: Joi.string().email().required(),
    amount: Joi.number().integer().min(1).required(),
    currency: Joi.string().valid('NGN', 'USD', 'GHS', 'ZAR', 'KES').required(),
});

module.exports = paymentSchema;
