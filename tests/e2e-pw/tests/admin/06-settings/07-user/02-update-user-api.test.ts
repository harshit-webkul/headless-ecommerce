import { test, expect } from "@playwright/test";
import { updateUserMutation } from "../../../../mutations/settings/user-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Update User", () => {
    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    test("update user", async () => {
        const createResponse = JSON.parse(
            fs.readFileSync(path.resolve(process.cwd(), "create-user-createResponse.json"), "utf-8")
        );

        const userId = Number(createResponse.createUser.user.id);

        const updateInput = {
            name: `${createResponse.createUser.user.name}_updated`,
            email: createResponse.createUser.user.email,
            status: false,
            roleId: Number(createResponse.createUser.user.role?.id || createResponse.createUser.user.roleId),
        };

        const response = await apiClient.execute(
            updateUserMutation,
            { id: userId, input: updateInput },
            { withAuth: true }
        );

        console.log("Update User Response:", response);

        expect(response.updateUser.success).toBe({ withAuth: true });
        expect(response.updateUser.user.name).toEqual(updateInput.name);
        expect(response.updateUser.user.status).toEqual(updateInput.status);
    });
});
