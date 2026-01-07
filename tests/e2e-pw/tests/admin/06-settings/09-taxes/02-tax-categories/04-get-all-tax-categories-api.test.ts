import { test, expect } from "@playwright/test";
import { getTaxCategoriesQuery } from "../../../../../mutations/settings/taxes-mutation";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import { DBClient } from "../../../../../utils/dbClient";

test.describe("Get All Tax Categories", () => {
    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    test("get all tax categories", async () => {
        const response = await apiClient.execute(
            getTaxCategoriesQuery,
            { first: 10, page: 1, input: {} },
            { withAuth: true }
        );

        console.log("Get All Tax Categories Response:", response);

        expect(response.taxCategories.data.length).toBeGreaterThan(0);
        expect(response.taxCategories.paginatorInfo.total).toBeGreaterThan(0);

        const countRow = await DBClient.getRow("SELECT COUNT(*) AS total FROM tax_categories");
        expect(response.taxCategories.paginatorInfo.total).toEqual(countRow.total);
    });
});
