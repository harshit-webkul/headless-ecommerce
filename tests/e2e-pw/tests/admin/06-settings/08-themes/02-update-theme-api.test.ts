import { test, expect } from "@playwright/test";
import { updateThemeMutation } from "../../../../mutations/settings/themes-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";
import { DBClient } from "../../../../utils/dbClient";

test.describe("Update Theme", () => {
    const apiClient = new GraphQLClient(GraphQLClient.baseURL);
    

    test("update theme", async () => {

        const channelRow = await DBClient.getRow("SELECT id FROM channels LIMIT 2");
        const channelId = Number(channelRow?.id || 2);
        console.log(channelId);

        const createResponse = JSON.parse(
            fs.readFileSync(path.resolve(process.cwd(), "create-theme-createResponse.json"), "utf-8")
        );

        const themeId = Number(createResponse.createTheme.theme.id);

        const updateInput = {
            name: `${createResponse.createTheme.theme.name}_updated`,
            sortOrder: 2,
            status: false,
            themeCode: "default",
            channelId: channelId,
            options: {
            title: "update theme$",
            filtersInput : [
                {
                    key: "sort",
                    value: "created_at-asc",
                },
                {
                    key: "limit",
                    value: "24",
                },
                {
                    key: "new",
                    value: "1",
                }
            ],
        }
        };

        const response = await apiClient.execute(
            updateThemeMutation,
            { id: themeId, input: updateInput },
            { withAuth: true }
        );

        console.log("Update Theme Response:", response);

        expect(response.updateTheme.success).toBe(true);
        expect(response.updateTheme.theme.name).toEqual(updateInput.name);
        expect(response.updateTheme.theme.status).toEqual(updateInput.status);
    });
});
