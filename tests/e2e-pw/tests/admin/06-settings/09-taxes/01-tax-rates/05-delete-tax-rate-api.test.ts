import { test, expect } from "@playwright/test";
import { deleteTaxRateMutation } from "../../../../../mutations/settings/taxes-mutation";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import { DBClient } from "../../../../../utils/dbClient";
import * as fs from "fs";
import path from "path";

test.describe("Delete Tax Rate", () => {
    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    test("delete tax rate", async () => {
        const createResponse = JSON.parse(
            fs.readFileSync(path.resolve(process.cwd(), "create-tax-rate-createResponse.json"), "utf-8")
        );

        const rateId = Number(createResponse.createTaxRate.taxRate.id);

        const response = await apiClient.execute(
            deleteTaxRateMutation,
            { id: rateId },
            true
        );

        console.log("Delete Tax Rate Response:", response);

        expect(response.deleteTaxRate.success).toBe(true);

        const rateInDB = await DBClient.getRow("SELECT * FROM tax_rates WHERE id = ?", [rateId]);
        expect(rateInDB).toBe(null);
    });
});
