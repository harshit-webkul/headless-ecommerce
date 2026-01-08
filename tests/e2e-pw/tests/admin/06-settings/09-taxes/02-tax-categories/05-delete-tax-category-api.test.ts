import { test, expect } from "@playwright/test";
import { deleteTaxCategoryMutation } from "../../../../../mutations/settings/taxes-mutation";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import { DBClient } from "../../../../../utils/dbClient";
import * as fs from "fs";
import path from "path";

test.describe("Delete Tax Category", () => {
    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    test("delete tax category", async () => {
        const createResponse = JSON.parse(
            fs.readFileSync(path.resolve(process.cwd(), "create-tax-category-createResponse.json"), "utf-8")
        );

        const categoryId = Number(createResponse.createTaxCategory.taxCategory.id);

        const response = await apiClient.execute(
            deleteTaxCategoryMutation,
            { id: categoryId },
            { withAuth: true }
        );

        console.log("Delete Tax Category Response:", response);

        expect(response.deleteTaxCategory.success).toBe(true);

        const categoryInDB = await DBClient.getRow("SELECT * FROM tax_categories WHERE id = ?", [categoryId]);
        expect(categoryInDB).toBe(null);
    });
});
