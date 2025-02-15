const PaymentService = require('../services/paymentService');
const paymentSchema = require('../validators/initiatePayment');
const verifySchema = require('../validators/verifyPayment');
exports.initializePayment = async (req, res) => {
    const { error } = paymentSchema.validate(req.body);
    if (error) {
        return res.status(422).json({ message: error.details[0].message });
    }

    try {
        const { amount, email, currency } = req.body;

        const response = await PaymentService.initializePayment(amount, email, currency);

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}
exports.verifyPayment = async (req, res) => {
    const { transaction_id } = req.query;
    const { error } = verifySchema.validate(req.query);
    if (error) {
        return res.status(422).json({ message: error.details[0].message });
    }

    try {
        const response = await PaymentService.verifyPayment(transaction_id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}