import { expect, test } from "@playwright/test";
import { updateCurrencyMutation } from "../../../../mutations/settings/currencies-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Update currency via GraphQL API", () => {

    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createResponse = JSON.parse(
        fs.readFileSync("create-currency-createResponse.json", "utf-8")
    );

    const currencyId = Number(createResponse?.createCurrency?.currency?.id);
    const randomSuffix = Date.now();
   const randomCode = Array.from({ length: 3 }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join("");

    console.log(randomCode);

    test("update currency", async () => {

        const updateCurrencyInput = {
            code: `${randomCode}`,
            name: `Updated Currency ${randomSuffix}`,
            symbol: "",
            decimal: 2,
            groupSeparator: ",",
            decimalSeparator: ".",
            currencyPosition: "LEFT",
        };
        console.log(updateCurrencyInput.code);

        const response = await apiClient.execute(
            updateCurrencyMutation,
            {
                id: currencyId,
                input: updateCurrencyInput,
            },
            true
        );

        console.log("Update Currency Response:", response);

        const filePath = path.resolve(
            process.cwd(),
            "update-currency-updateResponse.json"
        );

        fs.writeFileSync(filePath, JSON.stringify(response, null, 2), "utf-8");

        expect(response.updateCurrency.currency.id).toBe(
            createResponse.createCurrency.currency.id
        );
        expect(response.updateCurrency.message).toContain('Currency updated successfully.');
    });
});
