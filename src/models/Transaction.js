const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        id: { type: String, required: true, unique: true },
        amount: { type: Number, required: true },
        email: { type: String, required: true },
        currency: {
            type: String,
            required: true,
            enum: ["NGN", "USD", "GHS", "ZAR", "KES"],
        }, status: {
            type: String,
            enum: ["abandoned", "ongoing", "processing", "queued", "reversed", "pending", "success", "failed"],
            default: "pending"
        },
        reference: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
