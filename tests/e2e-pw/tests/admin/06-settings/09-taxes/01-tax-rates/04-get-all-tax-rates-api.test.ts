import { test, expect } from "@playwright/test";
import { getTaxRatesQuery } from "../../../../../mutations/settings/taxes-mutation";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import { DBClient } from "../../../../../utils/dbClient";

test.describe("Get All Tax Rates", () => {
    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    test("get all tax rates", async () => {
        const response = await apiClient.execute(
            getTaxRatesQuery,
            { first: 10, page: 1, input: {} },
            { withAuth: true }
        );

        console.log("Get All Tax Rates Response:", response);

        expect(response.taxRates.data.length).toBeGreaterThan(0);
        expect(response.taxRates.paginatorInfo.total).toBeGreaterThan(0);

        const countRow = await DBClient.getRow("SELECT COUNT(*) AS total FROM tax_rates");
        expect(response.taxRates.paginatorInfo.total).toEqual(countRow.total);
    });
});
