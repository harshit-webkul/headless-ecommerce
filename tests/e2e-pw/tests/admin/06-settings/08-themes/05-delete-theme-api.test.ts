import { test, expect } from "@playwright/test";
import { deleteThemeMutation } from "../../../../mutations/settings/themes-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import { DBClient } from "../../../../utils/dbClient";
import * as fs from "fs";
import path from "path";

test.describe("Delete Theme", () => {
    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    test("delete theme", async () => {
        const createResponse = JSON.parse(
            fs.readFileSync(path.resolve(process.cwd(), "create-theme-createResponse.json"), "utf-8")
        );

        const themeId = Number(createResponse.createTheme.theme.id);

        const response = await apiClient.execute(
            deleteThemeMutation,
            { id: themeId },
            { withAuth: true }
        );

        console.log("Delete Theme Response:", response);

        expect(response.deleteTheme.success).toBe({ withAuth: true });

        const themeInDB = await DBClient.getRow("SELECT * FROM theme_customizations WHERE id = ?", [themeId]);
        expect(themeInDB).toBe(null);
    });
});
