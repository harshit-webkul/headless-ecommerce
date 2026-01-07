import { test, expect } from "@playwright/test";
import { createTaxCategoryMutation } from "../../../../../mutations/settings/taxes-mutation";
import { DBClient } from "../../../../../utils/dbClient";
import {createTaxRateMutation} from "../../../../../mutations/settings/taxes-mutation"
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Create Tax Category", () => {
    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const randomSuffix = Date.now();
    
    test.beforeEach("before create tax category", async() => {
        const createInput = {
            identifier: `rate_${randomSuffix}`,
            // isZip: false,
            // zipCode: "",
            // zipFrom: "",
            // zipTo: "",
            state: "KA",
            country: "IN",
            taxRate: 12.5,
        };
        const response = await apiClient.execute(
            createTaxRateMutation,
            { input: createInput },
            { withAuth: true }
        );
        console.log("Create Tax Rate Response:", response);
        const filePath = path.resolve(process.cwd(), "create-tax-rate-createResponse.json");
        fs.writeFileSync(filePath, JSON.stringify(response, null, 2), "utf-8");
    });


    test("create tax category", async () => {

        const createResponse = JSON.parse(
        fs.readFileSync(path.resolve(process.cwd(), "create-tax-rate-createResponse.json"), "utf-8")
        );
        const rateId = Number(createResponse.createTaxRate.taxRate.id);
        console.log("tax rate value", rateId);

        const createInput = {
            code: `txcat_${randomSuffix}`,
            name: `Tax Category ${randomSuffix}`,
            description: `Tax category for ${randomSuffix}`,
            taxrates: [rateId]
        };

        const response = await apiClient.execute(
            createTaxCategoryMutation,
            { input: createInput },
            { withAuth: true }
        );

        console.log("Create Tax Category Response:", response);

        const filePath = path.resolve(process.cwd(), "create-tax-category-createResponse.json");
        fs.writeFileSync(filePath, JSON.stringify(response, null, 2), "utf-8");

        expect(response.createTaxCategory.success).toBe({ withAuth: true });
        expect(response.createTaxCategory.taxCategory.code).toEqual(createInput.code);

        const createdId = Number(response.createTaxCategory.taxCategory.id);

        const categoryInDB = await DBClient.getRow(
            "SELECT * FROM tax_categories WHERE id = ?",
            [createdId]
        );

        expect(categoryInDB).not.toBeNull();
        expect(categoryInDB?.code).toEqual(createInput.code);
        expect(categoryInDB?.name).toEqual(createInput.name);
    });
});
