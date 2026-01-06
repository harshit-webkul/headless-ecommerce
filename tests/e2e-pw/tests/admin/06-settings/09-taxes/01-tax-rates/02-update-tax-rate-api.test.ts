import { test, expect } from "@playwright/test";
import { updateTaxRateMutation } from "../../../../../mutations/settings/taxes-mutation";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Update Tax Rate", () => {
    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    test("update tax rate", async () => {
        const createResponse = JSON.parse(
            fs.readFileSync(path.resolve(process.cwd(), "create-tax-rate-createResponse.json"), "utf-8")
        );

        const randomSuffix = Date.now();

        const rateId = Number(createResponse.createTaxRate.taxRate.id);

        const updateInput = {
            identifier: `update new ${randomSuffix}`,
            isZip: "1",
            zipFrom: "201031",
            zipTo: "300000",
            zipCode:"201305",
            state: "UP",
            country: "IN",
            taxRate: 5.22,
        };

        const response = await apiClient.execute(
            updateTaxRateMutation,
            { id: rateId, input: updateInput },
            true
        );

        console.log("Update Tax Rate Response:", response);

        expect(response.updateTaxRate.success).toBe(true);
        expect(Number(response.updateTaxRate.taxRate.taxRate)).toEqual(updateInput.taxRate);
    });
});
