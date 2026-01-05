import { expect, test } from "@playwright/test";
import { getAllCurrenciesQuery } from "../../../../mutations/settings/currencies-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";

test.describe("Get all currencies via GraphQL API", () => {

    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    test("get all currencies", async () => {

        const response = await apiClient.execute(
            getAllCurrenciesQuery,
            {
                first: 10,
                page: 1,
                input: {},
            },
            true
        );

        console.log("Get All Currencies Response:", response);

        expect(response.currencies.data.length).toBeGreaterThan(0);
        expect(response.currencies.paginatorInfo.total).toBeGreaterThan(0);
    });
});
