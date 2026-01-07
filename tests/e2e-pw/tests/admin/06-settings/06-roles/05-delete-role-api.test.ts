import { test, expect } from "@playwright/test";
import { deleteRoleMutation } from "../../../../mutations/settings/roles-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import { DBClient } from "../../../../utils/dbClient";
import * as fs from "fs";
import path from "path";

test.describe("Delete Role", () => {
    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    test("delete role", async () => {
        const createResponse = JSON.parse(
            fs.readFileSync(path.resolve(process.cwd(), "create-role-createResponse.json"), "utf-8")
        );

        const roleId = Number(createResponse.createRole.role.id);

        const response = await apiClient.execute(
            deleteRoleMutation,
            { id: roleId },
            { withAuth: true }
        );

        console.log("Delete Role Response:", response);

        expect(response.deleteRole.success).toBe({ withAuth: true });

        const roleInDB = await DBClient.getRow("SELECT * FROM roles WHERE id = ?", [roleId]);
        expect(roleInDB).toBe(null);
    });
});
