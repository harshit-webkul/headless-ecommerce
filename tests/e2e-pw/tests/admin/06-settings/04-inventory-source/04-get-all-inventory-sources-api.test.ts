import { test, expect } from "@playwright/test";
import { getInventorySourcesQuery } from "../../../../mutations/settings/inventories-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import { DBClient } from "../../../../utils/dbClient";

test.describe("Get All Inventory Sources", () => {

    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    test("get all inventory sources", async () => {

        const response = await apiClient.execute(
            getInventorySourcesQuery,
            {
                first: 10,
                page: 1,
                input: {}
            },
            true
        );

        console.log("Get All Inventory Sources Response:", response);

        expect(response.inventorySources.data.length)
            .toBeGreaterThan(0);
        expect(response.inventorySources.paginatorInfo.total)
            .toBeGreaterThan(0);

        /**
         * get the total data from customers table
         */
        const inventoriesCount = await DBClient.getRow(
        'SELECT COUNT(*) AS total FROM inventory_sources'
        );

        const total_inventory_sources =  inventoriesCount.total;
        console.log(total_inventory_sources);
        expect(response.inventorySources.paginatorInfo.total).toEqual(total_inventory_sources);
    });
});
