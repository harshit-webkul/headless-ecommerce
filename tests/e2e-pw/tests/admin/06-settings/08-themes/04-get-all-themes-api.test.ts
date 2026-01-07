import { test, expect } from "@playwright/test";
import { getThemesQuery } from "../../../../mutations/settings/themes-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import { DBClient } from "../../../../utils/dbClient";

test.describe("Get All Themes", () => {
    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    test("get all themes", async () => {
        const response = await apiClient.execute(
            getThemesQuery,
            { first: 10, page: 1, input: {} },
            { withAuth: true }
        );

        console.log("Get All Themes Response:", response);

        expect(response.themes.data.length).toBeGreaterThan(0);
        expect(response.themes.paginatorInfo.total).toBeGreaterThan(0);

        const themesCountRow = await DBClient.getRow("SELECT COUNT(*) AS total FROM theme_customizations");

        expect(response.themes.paginatorInfo.total).toEqual(themesCountRow.total);
    });
});
