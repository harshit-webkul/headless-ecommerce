import { test, expect } from "@playwright/test";
import { createRoleMutation } from "../../../../mutations/settings/roles-mutation";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Create Role", () => {
    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    test("create role", async () => {
        const randomSuffix = Date.now();

        const createInput = {
            name: `Test Role ${randomSuffix}`,
            description: `Role description ${randomSuffix}`,
            permissionType: "CUSTOM",
            permissions: ["catalog.categories.create", "catalog.products.create"]
        };

        const response = await apiClient.execute(
            createRoleMutation,
            { input: createInput },
            { withAuth: true }
        );

        console.log("Create Role Response:", response);

        const filePath = path.resolve(process.cwd(), "create-role-createResponse.json");
        fs.writeFileSync(filePath, JSON.stringify(response, null, 2), "utf-8");

        expect(response.createRole.success).toBe({ withAuth: true });
        expect(response.createRole.role.name).toEqual(createInput.name);

        const createdRoleID = Number(response.createRole.role.id);

        const roleInDB = await DBClient.getRow(
            "SELECT * FROM roles WHERE id = ?",
            [createdRoleID]
        );

        expect(roleInDB).not.toBeNull();
        expect(roleInDB?.name).toEqual(createInput.name);
    });
});
