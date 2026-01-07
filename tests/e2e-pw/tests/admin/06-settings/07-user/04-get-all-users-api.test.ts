import { test, expect } from "@playwright/test";
import { getUsersQuery } from "../../../../mutations/settings/user-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import { DBClient } from "../../../../utils/dbClient";

test.describe("Get All Users", () => {
    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    test("get all users", async () => {
        const response = await apiClient.execute(
            getUsersQuery,
            { first: 10, page: 1, input: {} },
            { withAuth: true }
        );

        console.log("Get All Users Response:", response);

        expect(response.users.data.length).toBeGreaterThan(0);
        expect(response.users.paginatorInfo.total).toBeGreaterThan(0);

        const usersCountRow = await DBClient.getRow("SELECT COUNT(*) AS total FROM admins");

        expect(response.users.paginatorInfo.total).toEqual(usersCountRow.total);
    });
});
