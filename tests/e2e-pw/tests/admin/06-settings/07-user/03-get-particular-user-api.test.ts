import { test, expect } from "@playwright/test";
import { getUserQuery } from "../../../../mutations/settings/user-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Get Particular User", () => {
    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    test("get particular user", async () => {
        const createResponse = JSON.parse(
            fs.readFileSync(path.resolve(process.cwd(), "create-user-createResponse.json"), "utf-8")
        );

        const userId = Number(createResponse.createUser.user.id);

        const response = await apiClient.execute(
            getUserQuery,
            { id: userId },
            true
        );

        console.log("Get User Response:", response);

        expect(response.user).not.toBeNull();
        expect(Number(response.user.id)).toEqual(userId);
        expect(response.user.email).toEqual(createResponse.createUser.user.email);
    });
});
