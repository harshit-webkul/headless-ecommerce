import { test, expect } from "@playwright/test";
import { getParticularExchangeRateQuery } from "../../../../mutations/settings/exchange-rate-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";

test.describe("Get Particular Exchange Rate", () => {

    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createResponse = JSON.parse(
        fs.readFileSync("create-exchange-rate-response.json", "utf-8")
    );

    const exchangeRateId = Number(
        createResponse.createExchangeRate.exchangeRate.id
    );

    const targetCurrencyId = Number(
        createResponse.createExchangeRate.exchangeRate.targetCurrency
    );

    test("get Particular exchange rate by id", async () => {

        const response = await apiClient.execute(
            getParticularExchangeRateQuery,
            { id: exchangeRateId },
            true
        );

        console.log("Get Particular Exchange Rate Response:", response);

        expect(response.exchangeRate.id).toBe(exchangeRateId.toString());
        expect(response.exchangeRate.rate).toBeDefined();
        expect(response.exchangeRate.targetCurrency).not.toEqual(targetCurrencyId.toString());
    });
});
