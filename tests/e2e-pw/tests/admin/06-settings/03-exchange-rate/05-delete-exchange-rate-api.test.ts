import { test, expect } from "@playwright/test";
import { deleteExchangeRateMutation } from "../../../../mutations/settings/exchange-rate-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";

test.describe("Delete Exchange Rate", () => {

    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createResponse = JSON.parse(
        fs.readFileSync("create-exchange-rate-response.json", "utf-8")
    );

    console.log(createResponse);

    const exchangeRateId = Number(createResponse.createExchangeRate?.exchangeRate?.id);
    console.log(exchangeRateId);

    test("delete exchange rate", async () => {

        const response = await apiClient.execute(
            deleteExchangeRateMutation,
            { id: exchangeRateId },
            { withAuth: true }
        );

        console.log("Delete Exchange Rate Response:", response);

        expect(response.deleteExchangeRate.success).toBe({ withAuth: true });
        expect(response.deleteExchangeRate.message).toContain('Success: Exchange rate deleted successfully.');
    });
});
