import { test, expect } from "@playwright/test";
import { createTaxRateMutation } from "../../../../../mutations/settings/taxes-mutation";
import { DBClient } from "../../../../../utils/dbClient";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Create Tax Rate", () => {
    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    test("create tax rate", async () => {
        const randomSuffix = Date.now();

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
            true
        );

        console.log("Create Tax Rate Response:", response);

        const filePath = path.resolve(process.cwd(), "create-tax-rate-createResponse.json");
        fs.writeFileSync(filePath, JSON.stringify(response, null, 2), "utf-8");

        expect(response.createTaxRate.success).toBe(true);
        expect(response.createTaxRate.taxRate.identifier).toEqual(createInput.identifier);
        expect(response.createTaxRate.message).toContain('Tax Rate created successfully.');

        const createdId = Number(response.createTaxRate.taxRate.id);

        const rateInDB = await DBClient.getRow(
            "SELECT * FROM tax_rates WHERE id = ?",
            [createdId]
        );

        expect(rateInDB).not.toBeNull();
        // tax_rate column name in DB is `tax_rate`
        expect(Number(rateInDB?.tax_rate)).toEqual(createInput.taxRate);
    });
});
