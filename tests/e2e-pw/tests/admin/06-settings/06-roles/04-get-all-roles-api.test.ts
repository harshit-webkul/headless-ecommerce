import { test, expect } from "@playwright/test";
import { getRolesQuery } from "../../../../mutations/settings/roles-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import { DBClient } from "../../../../utils/dbClient";

test.describe("Get All Roles", () => {
    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    test("get all roles", async () => {
        const response = await apiClient.execute(
            getRolesQuery,
            { first: 10, page: 1, input: {} },
            true
        );

        console.log("Get All Roles Response:", response);

        expect(response.roles.data.length).toBeGreaterThan(0);
        expect(response.roles.paginatorInfo.total).toBeGreaterThan(0);

        const rolesCountRow = await DBClient.getRow("SELECT COUNT(*) AS total FROM roles");

        expect(response.roles.paginatorInfo.total).toEqual(rolesCountRow.total);
    });
});
