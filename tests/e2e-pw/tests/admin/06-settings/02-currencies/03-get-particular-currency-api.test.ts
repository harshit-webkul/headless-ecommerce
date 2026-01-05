import { expect, test } from "@playwright/test";
import { getParticularCurrencyQuery } from "../../../../mutations/settings/currencies-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";

test.describe("Get particular currency via GraphQL API", () => {

    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createResponse = JSON.parse(
        fs.readFileSync("create-currency-createResponse.json", "utf-8")
    );

    const currencyId = Number(createResponse.createCurrency.currency.id);

    test("get particular currency by id", async () => {

        const response = await apiClient.execute(
            getParticularCurrencyQuery,
            { id: currencyId },
            true
        );

        console.log("Get Currency Response:", response);

        expect(response.currency.id).toBe(currencyId.toString());
        expect(response.currency.code).toBeDefined();
    });
});
