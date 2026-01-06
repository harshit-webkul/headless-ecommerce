import { test, expect } from "@playwright/test";
import { getTaxRateQuery } from "../../../../../mutations/settings/taxes-mutation";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Get Particular Tax Rate", () => {
    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    test("get particular tax rate", async () => {
        const createResponse = JSON.parse(
            fs.readFileSync(path.resolve(process.cwd(), "create-tax-rate-createResponse.json"), "utf-8")
        );

        const rateId = Number(createResponse.createTaxRate.taxRate.id);

        const response = await apiClient.execute(
            getTaxRateQuery,
            { id: rateId },
            true
        );

        console.log("Get Tax Rate Response:", response);

        expect(response.taxRate).not.toBeNull();
        expect(Number(response.taxRate.id)).toEqual(rateId);
    });
});
