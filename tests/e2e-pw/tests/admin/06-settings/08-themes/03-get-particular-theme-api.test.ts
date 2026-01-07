import { test, expect } from "@playwright/test";
import { getThemeQuery } from "../../../../mutations/settings/themes-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Get Particular Theme", () => {
    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    test("get particular theme", async () => {
        const createResponse = JSON.parse(
            fs.readFileSync(path.resolve(process.cwd(), "create-theme-createResponse.json"), "utf-8")
        );

        const themeId = Number(createResponse.createTheme.theme.id);

        const response = await apiClient.execute(
            getThemeQuery,
            { id: themeId },
            { withAuth: true }
        );

        console.log("Get Theme Response:", response);

        expect(response.theme).not.toBeNull();
        expect(Number(response.theme.id)).toEqual(themeId);
        expect(response.theme.themeCode).toEqual(createResponse.createTheme.theme.themeCode);
    });
});
