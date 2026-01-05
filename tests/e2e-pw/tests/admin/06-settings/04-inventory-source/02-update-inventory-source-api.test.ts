import { test, expect } from "@playwright/test";
import { updateInventorySourceMutation } from "../../../../mutations/settings/inventories-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Update Inventory Source", () => {

    const apiClient = new GraphQLClient(GraphQLClient.baseURL);
    const randomSuffix = Date.now();

    const createResponse = JSON.parse(
        fs.readFileSync("create-inventory-source-response.json", "utf-8")
    );

    const inventorySourceId = Number(
        createResponse.createInventorySource.inventorySource.id
    );

    test("update inventory source", async () => {

        const updateInput = {
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
            updateInventorySourceMutation,
            {
                id: inventorySourceId,
                input: updateInput
            },
            true
        );

        console.log("Update Inventory Source Response:", response);

        fs.writeFileSync(
            path.resolve(process.cwd(), "update-inventory-source-response.json"),
            JSON.stringify(response, null, 2),
            "utf-8"
        );

        expect(response.updateInventorySource.success).toBe(true);
        expect(response.updateInventorySource.inventorySource.id)
            .toBe(inventorySourceId.toString());
        expect(response.updateInventorySource.message).toContain('Inventory updated successfully.')
    });
});
