import { test, expect } from "@playwright/test";
import { createThemeMutation } from "../../../../mutations/settings/themes-mutation";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Create Theme", () => {
    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    test("create theme", async () => {
        const randomSuffix = Date.now();

        // pick an existing channel id
        const channelRow = await DBClient.getRow("SELECT id FROM channels LIMIT 1");
        const channelId = Number(channelRow?.id || 1);
        console.log(channelId);

        const createInput = {
            themeCode: "default",
            type: "ProductCarousel",
            name: `Theme ${randomSuffix}`,
            sortOrder: 1,
            channelId: channelId
        };

        const response = await apiClient.execute(
            createThemeMutation,
            { input: createInput },
            { withAuth: true }
        );

        console.log("Create Theme Response:", response);

        const filePath = path.resolve(process.cwd(), "create-theme-createResponse.json");
        fs.writeFileSync(filePath, JSON.stringify(response, null, 2), "utf-8");

        expect(response.createTheme.success).toBe(true);
        expect(response.createTheme.theme.themeCode).toEqual(createInput.themeCode);

        const createdThemeID = Number(response.createTheme.theme.id);

        const themeInDB = await DBClient.getRow(
            "SELECT * FROM theme_customizations WHERE id = ?",
            [createdThemeID]
        );

        expect(themeInDB).not.toBeNull();
        expect(themeInDB?.theme_code).toEqual(createInput.themeCode);
        expect(Number(themeInDB?.channel_id)).toEqual(channelId);
    });
});
