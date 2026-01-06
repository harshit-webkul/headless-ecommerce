import { test, expect } from "@playwright/test";
import { updateTaxCategoryMutation } from "../../../../../mutations/settings/taxes-mutation";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Update Tax Category", () => {
    const apiClient = new GraphQLClient(GraphQLClient.baseURL);
    const createResponse = JSON.parse(
            fs.readFileSync(path.resolve(process.cwd(), "create-tax-category-createResponse.json"), "utf-8")
        );  

    const taxRateCreateResponse = JSON.parse(
            fs.readFileSync(path.resolve(process.cwd(), "create-tax-rate-createResponse.json"), "utf-8")
        );  
    
    const tax_rate_id = Number(taxRateCreateResponse.createTaxRate.taxRate.id)

    const randomSuffix = Date.now();

    test("update tax category", async () => {
        
        const categoryId = Number(createResponse.createTaxCategory.taxCategory.id);

        const updateInput = {
            code: `update_code_${randomSuffix}`,
            name: `${createResponse.createTaxCategory.taxCategory.name}_updated`,
            description: `Updated description ${randomSuffix}`,
            taxrates: [tax_rate_id]
        };

        const response = await apiClient.execute(
            updateTaxCategoryMutation,
            { id: categoryId, input: updateInput },
            true
        );

        console.log("Update Tax Category Response:", response);

        expect(response.updateTaxCategory.success).toBe(true);
        expect(response.updateTaxCategory.taxCategory.name).toEqual(updateInput.name);
    });
});
