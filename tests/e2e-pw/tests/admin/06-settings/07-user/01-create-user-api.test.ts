import { test, expect } from "@playwright/test";
import { createUserMutation } from "../../../../mutations/settings/user-mutation";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Create User", () => {
    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    test("create user", async () => {
        const randomSuffix = Date.now();

        // Get an existing role id to attach to the user
        const roleRow = await DBClient.getRow("SELECT id FROM roles LIMIT 1");
        const roleId = roleRow?.id || 1;
        console.log(roleId);

        const createInput = {
            name: `Test User ${randomSuffix}`,
            email: `testuser_${randomSuffix}@example.com`,
            password: "admin123",
            passwordConfirmation: "admin123",
            status: { withAuth: true },
            roleId: roleId,
            image: ""
        };

        const response = await apiClient.execute(
            createUserMutation,
            { input: createInput },
            { withAuth: true }
        );

        console.log("Create User Response:", response);

        const filePath = path.resolve(process.cwd(), "create-user-createResponse.json");
        fs.writeFileSync(filePath, JSON.stringify(response, null, 2), "utf-8");

        expect(response.createUser.success).toBe({ withAuth: true });
        expect(response.createUser.user.email).toEqual(createInput.email);

        const createdUserID = Number(response.createUser.user.id);

        const userInDB = await DBClient.getRow(
            "SELECT * FROM admins WHERE id = ?",
            [createdUserID]
        );

        // expect(userInDB).not.toBeNull();
        expect(userInDB?.email).toEqual(createInput.email);
        expect(userInDB?.name).toEqual(createInput.name);
    });
});
