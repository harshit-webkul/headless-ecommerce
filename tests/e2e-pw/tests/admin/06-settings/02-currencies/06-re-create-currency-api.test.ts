import { expect, test } from "@playwright/test";
import { createCurrencyMutation } from "../../../../mutations/settings/currencies-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("re-Create currency via GraphQL API", () => {

    const apiClient = new GraphQLClient(GraphQLClient.baseURL);
    const randomCode = Array.from({ length: 3 }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join("");    
    const randomSuffix = Date.now();

    console.log(randomCode);

    test("re-Create currency", async () => {

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

        const response = await apiClient.execute(
            createCurrencyMutation,
            { input: createCurrencyInput },
            { withAuth: true }
        );

        console.log("re-Createc Currency Response:", response);

        const filePath = path.resolve(
            process.cwd(),
            "create-currency-createResponse.json"
        );

        fs.writeFileSync(filePath, JSON.stringify(response, null, 2), "utf-8");

        expect(response.createCurrency.success).toBe({ withAuth: true });
        expect(response.createCurrency.currency.code).toBe(createCurrencyInput.code);
        expect(response.createCurrency.message).toContain('Currency created successfully.');

    });
});
