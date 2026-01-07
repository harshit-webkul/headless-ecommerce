import { expect, test } from "@playwright/test";
import { deleteCurrencyMutation } from "../../../../mutations/settings/currencies-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Delete currency via GraphQL API", () => {

    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createResponse = JSON.parse(
        fs.readFileSync("create-currency-createResponse.json", "utf-8")
    );

    const currencyId = Number(createResponse.createCurrency.currency.id);

    test("delete currency", async () => {

        const response = await apiClient.execute(
            deleteCurrencyMutation,
            { id: currencyId },
            { withAuth: true }
        );

        console.log("Delete Currency Response:", response);
        expect(response.deleteCurrency.success).toBe({ withAuth: true });
    });
});
