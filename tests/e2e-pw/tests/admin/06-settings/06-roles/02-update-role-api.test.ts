import { test, expect } from "@playwright/test";
import { updateRoleMutation } from "../../../../mutations/settings/roles-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Update Role", () => {
    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    test("update role", async () => {
        const createResponse = JSON.parse(
            fs.readFileSync(path.resolve(process.cwd(), "create-role-createResponse.json"), "utf-8")
        );

        const roleId = Number(createResponse.createRole.role.id);

        const updateInput = {
            name: `${createResponse.createRole.role.name}_updated`,
            description: `Updated description ${Date.now()}`,
            permissionType: "ALL",
            permissions: []
        };

        const response = await apiClient.execute(
            updateRoleMutation,
            { id: roleId, input: updateInput },
            true
        );

        console.log("Update Role Response:", response);

        expect(response.updateRole.success).toBe(true);
        expect(response.updateRole.role.name).toEqual(updateInput.name);
    });
});
