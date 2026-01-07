import { test, expect } from "@playwright/test";
import { createExchangeRateMutation } from "../../../../mutations/settings/exchange-rate-mutation";
import { createCurrencyMutation } from "../../../../mutations/settings/currencies-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Create Exchange Rate", () => {

    const apiClient = new GraphQLClient(GraphQLClient.baseURL);
    const randomSuffix = Date.now();
   const randomCode = Array.from({ length: 3 }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join("");


    test("create exchange rate", async () => {

        const createCurrencyInput = {
            code: `${randomCode}`,
            name: `currencies_${randomSuffix}`,
            symbol: "",
            decimal: 2,
            groupSeparator: ",",
            decimalSeparator: ".",
            currencyPosition: "LEFT",
        };
        console.log(createCurrencyInput.code)

        const createCurrencyResponse = await apiClient.execute(
            createCurrencyMutation,
            { input: createCurrencyInput },
            { withAuth: true }
        );

        fs.writeFileSync(
            path.resolve(process.cwd(), "create-currency-createResponse.json"),
            JSON.stringify(createCurrencyResponse, null, 2),
            "utf-8"
        );

        const currencyId =  Number(createCurrencyResponse?.createCurrency?.currency?.id);
        console.log(currencyId);

        const createInput = {
            targetCurrency: currencyId,
            rate: 1.25,
        };

        const response = await apiClient.execute(
            createExchangeRateMutation,
            { input: createInput },
            { withAuth: true }
        );

        console.log("Create Exchange Rate Response:", response);

        fs.writeFileSync(
            path.resolve(process.cwd(), "create-exchange-rate-response.json"),
            JSON.stringify(response, null, 2),
            "utf-8"
        );

        expect(response.createExchangeRate.success).toBe({ withAuth: true });
        expect(response.createExchangeRate.exchangeRate.rate).toBe(createInput.rate);
        expect(response.createExchangeRate.message).toContain('Exchange rate created successfully.');
    });
});
