import { test, expect } from "@playwright/test";
import { getTaxCategoryQuery } from "../../../../../mutations/settings/taxes-mutation";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Get Particular Tax Category", () => {
    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    test("get particular tax category", async () => {
        const createResponse = JSON.parse(
            fs.readFileSync(path.resolve(process.cwd(), "create-tax-category-createResponse.json"), "utf-8")
        );

        const categoryId = Number(createResponse.createTaxCategory.taxCategory.id);

        const response = await apiClient.execute(
            getTaxCategoryQuery,
            { id: categoryId },
            { withAuth: true }
        );

        console.log("Get Tax Category Response:", response);

        expect(response.taxCategory).not.toBeNull();
        expect(Number(response.taxCategory.id)).toEqual(categoryId);
    });
});
