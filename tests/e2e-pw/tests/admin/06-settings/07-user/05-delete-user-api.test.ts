import { test, expect } from "@playwright/test";
import { deleteUserMutation } from "../../../../mutations/settings/user-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import { DBClient } from "../../../../utils/dbClient";
import * as fs from "fs";
import path from "path";

test.describe("Delete User", () => {
    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    test("delete user", async () => {
        const createResponse = JSON.parse(
            fs.readFileSync(path.resolve(process.cwd(), "create-user-createResponse.json"), "utf-8")
        );

        const userId = Number(createResponse.createUser.user.id);

        const response = await apiClient.execute(
            deleteUserMutation,
            { id: userId },
            { withAuth: true }
        );

        console.log("Delete User Response:", response);

        expect(response.deleteUser.success).toBe({ withAuth: true });

        const userInDB = await DBClient.getRow("SELECT * FROM admins WHERE id = ?", [userId]);

        expect(userInDB).toBe(null);
    });
});
