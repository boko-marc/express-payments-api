const PayStackAPIService = require('./payStackAPIService');
const Transaction = require('../models/Transaction');
let payStackAPIService = new PayStackAPIService();


exports.initializePayment = async (amount, email, currency) => {
    try {
        const data = {
            // email,
            amount: amount * 100, // convert to kobo
            currency,
        };


        const response = await payStackAPIService.initializePayment(data);

        const { authorization_url, reference } = response.data;

        const transaction = new Transaction({
            email,
            amount,
            reference,
            currency,
        });
        await transaction.save();

        return { authorization_url, transaction_id: transaction._id };

    } catch (error) {
        throw new Error(error.message || "Error when initializing payment");
    }
};

exports.verifyPayment = async (transaction_id) => {
    try {
        const transaction = await Transaction.findById(transaction_id);
        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }
        const response = await payStackAPIService.verifyPayment(transaction.reference);

        // update the transaction status
        if (response.data.status !== transaction.status) {
            transaction.status = response.data.status;
            await transaction.save();
        }
        return { status: response.data.status, transaction_id: transaction._id };
    } catch (error) {
        throw new Error(error.message || "Error when verifying payment");
    }
}