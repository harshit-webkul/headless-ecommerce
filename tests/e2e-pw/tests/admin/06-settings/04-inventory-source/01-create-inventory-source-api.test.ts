import { test, expect } from "@playwright/test";
import { createInventorySourceMutation } from "../../../../mutations/settings/inventories-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path, { extname } from "path";

test.describe("Create Inventory Source", () => {

    const apiClient = new GraphQLClient(GraphQLClient.baseURL);
    const randomSuffix = Date.now();

    test("create inventory source", async () => {

        const createInput = {
            code: `SRC${randomSuffix}`,
            name: `Warehouse ${randomSuffix}`,
            description: `"Primary warehouse"${randomSuffix}`,
            contactName: "Admin",
            contactEmail: `admin${randomSuffix}@example.com`,
            contactNumber: `${randomSuffix}`,
            // contactFax: randomSuffix,
            country: "IN",
            state: "KA",
            city: `city"${randomSuffix}`,
            street: "MG Road",
            postcode: `${randomSuffix}`,
            priority: 1,
            // latitude: "12.9716",
            // longitude: "77.5946",
            status: true
        };

        const response = await apiClient.execute(
            createInventorySourceMutation,
            { input: createInput },
            true
        );

        console.log("Create Inventory Source Response:", response);

        fs.writeFileSync(
            path.resolve(process.cwd(), "create-inventory-source-response.json"),
            JSON.stringify(response, null, 2),
            "utf-8"
        );

        expect(response.createInventorySource.success).toBe(true);
        expect(response.createInventorySource.inventorySource.code)
            .toBe(createInput.code);

        expect(response.createInventorySource.message).toContain('Inventory created successfully.');
        expect(response.createInventorySource.inventorySource.contactEmail).toEqual(createInput.contactEmail);
    });
});
