import { test, expect } from "@playwright/test";
import { deleteInventorySourceMutation } from "../../../../mutations/settings/inventories-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";

test.describe("Delete Inventory Source", () => {

    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createResponse = JSON.parse(
        fs.readFileSync("create-inventory-source-response.json", "utf-8")
    );

    const inventorySourceId = Number(
        createResponse.createInventorySource.inventorySource.id
    );

    test("delete inventory source", async () => {

        const response = await apiClient.execute(
            deleteInventorySourceMutation,
            { id: inventorySourceId },
            true
        );

        console.log("Delete Inventory Source Response:", response);

        expect(response.deleteInventorySource.success).toBe(true);

        expect(response.deleteInventorySource.message).toContain('Inventory deleted successfully.');
    });
});
