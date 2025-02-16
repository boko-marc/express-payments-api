const axios = require("axios");

class PayStackAPIService {
    constructor(apiClient) {
        this.api = apiClient || axios.create({
            baseURL: "https://api.paystack.co",
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
        });
    }

    async initializePayment(data) {
        try {
            data.callback_url = `http://localhost:${process.env.PORT}`;
            const response = await this.api.post("/transaction/initialize", data);
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(`Paystack Error: ${error.response.data.message}`);
            } else if (error.request) {
                throw new Error("No response received from Paystack.");
            } else {
                throw new Error(`Unexpected Error: ${error.message}`);
            }
        }
    }


    async verifyPayment(reference) {
        try {
            const response = await this.api.get(`/transaction/verify/${reference}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to post data to third party API', error);
        }
    }
}

module.exports = PayStackAPIService;
