import { test, expect } from "@playwright/test";
import { getInventorySourceQuery } from "../../../../mutations/settings/inventories-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";

test.describe("Get Particular Inventory Source", () => {

    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createResponse = JSON.parse(
        fs.readFileSync("create-inventory-source-response.json", "utf-8")
    );

    const inventorySourceId = Number(
        createResponse.createInventorySource.inventorySource.id
    );

    test("get Particular inventory source by id", async () => {

        const response = await apiClient.execute(
            getInventorySourceQuery,
            { id: inventorySourceId },
            { withAuth: true }
        );

        console.log("Get Inventory Source Response:", response);

        expect(response.inventorySource.id).toEqual(inventorySourceId.toString());
        expect(response.inventorySource.code).toBeDefined();
        expect(response.inventorySource.code).not.toEqual(createResponse.createInventorySource.inventorySource.code);
    });
});
