const axios = require("axios");
const PayStackAPIService = require("../src/services/payStackAPIService");

jest.mock("axios");

describe("PayStackAPIService", () => {
    let paystackService;
    let mockAxios;

    beforeEach(() => {
        mockAxios = {
            post: jest.fn(),
            get: jest.fn(),
        };

        paystackService = new PayStackAPIService(mockAxios);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should_initialize_payment_successfully", async () => {
        const mockData = { email: "test@example.com", amount: 1000, currency: "NGN" };
        const mockResponse = { data: { status: true, message: "Authorization URL created", data: { authorization_url: "https://checkout.paystack.com/3ni8kdavz62431l", reference: "re4lyvq3s9", access_code: "3ni8kdavz62431l" } } };

        mockAxios.post.mockResolvedValue(mockResponse);

        const response = await paystackService.initializePayment(mockData);

        expect(response).toEqual(mockResponse.data);

        expect(mockAxios.post).toHaveBeenCalledWith("/transaction/initialize", mockData);
    });

    test("should_handle_paystack_error_globally", async () => {
        const mockData = { email: "test@example.com", amount: 1000, currency: "NGN" };
    
        // Simulez une erreur générique de Paystack
        const mockError = {
            response: {
                status: 400, // Code HTTP pour une mauvaise requête
                data: {
                    status: false,
                    message: "Some validation error",
                    meta: { nextStep: "Provide all required params" },
                    type: "validation_error",
                    code: "missing_params",
                },
            },
        };
    
        mockAxios.post.mockRejectedValue(mockError);
    
        await expect(paystackService.initializePayment(mockData)).rejects.toThrow(
            `Paystack Error: ${mockError.response.data.message}`
        );
    
        expect(mockAxios.post).toHaveBeenCalledWith("/transaction/initialize", mockData);
    });









});