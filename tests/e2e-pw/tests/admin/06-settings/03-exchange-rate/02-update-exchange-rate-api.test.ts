import { test, expect } from "@playwright/test";
import { updateExchangeRateMutation } from "../../../../mutations/settings/exchange-rate-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Update Exchange Rate", () => {

    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createResponse = JSON.parse(
        fs.readFileSync("create-exchange-rate-response.json", "utf-8")
    );

    const exchangeRateId = Number(
        createResponse.createExchangeRate.exchangeRate.id
    );

    console.log('exchange rate id: ', exchangeRateId);

    const createCurrencyResponse = JSON.parse(
        fs.readFileSync("create-currency-createResponse.json", "utf-8")
    );

    const currencyId = Number(createCurrencyResponse?.createCurrency?.currency?.id);

    console.log('currency id: ', currencyId);

    test("update exchange rate with parameter", async () => {

        const updateInput = {
            targetCurrency: currencyId,
            rate: 2.15,
        };

        const response = await apiClient.execute(
            updateExchangeRateMutation,
            {
                id: exchangeRateId,
                input: updateInput
            },
            { withAuth: true }
        );

        console.log("Update Exchange Rate Response:", response);

        fs.writeFileSync(
            path.resolve(process.cwd(), "update-exchange-rate-response.json"),
            JSON.stringify(response, null, 2),
            "utf-8"
        );

        expect(response.updateExchangeRate.success).toBe(true);
        expect(response.updateExchangeRate.exchangeRate.id).toBe(exchangeRateId.toString());
        expect(response.updateExchangeRate.message).toContain('Exchange rate updated successfully.');
        expect(response.updateExchangeRate.exchangeRate.rate).not.toEqual(createResponse.createExchangeRate.exchangeRate.rate);
    });
});
