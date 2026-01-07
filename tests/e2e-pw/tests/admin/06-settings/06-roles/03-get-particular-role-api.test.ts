import { test, expect } from "@playwright/test";
import { getRoleQuery } from "../../../../mutations/settings/roles-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Get Particular Role", () => {
    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    test("get particular role", async () => {
        const createResponse = JSON.parse(
            fs.readFileSync(path.resolve(process.cwd(), "create-role-createResponse.json"), "utf-8")
        );

        const roleId = Number(createResponse.createRole.role.id);

        const response = await apiClient.execute(
            getRoleQuery,
            { id: roleId },
            { withAuth: true }
        );

        console.log("Get Role Response:", response);

        expect(response.role).not.toBeNull();
        expect(Number(response.role.id)).toEqual(roleId);
    });
});
