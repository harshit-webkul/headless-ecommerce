import { test, expect } from "@playwright/test";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import {
    deleteSiteMapMutation as DELETE_SITEMAP,
} from "../../../../../mutations/marketings/search-seo/sitemap-mutation";
import * as fs from "fs";
import path from "path";

test.describe("Sitemap - Delete API", () => {
    test("creates and deletes sitemaps via deleteSiteMap", async () => {
        const client = new GraphQLClient();
        const filePath = path.resolve(
            process.cwd(),
            "create-sitemap-createResponse.json"
        );
        const raw = fs.readFileSync(filePath, "utf-8");
        const createResponse = JSON.parse(raw);
        const id = createResponse.createSiteMap.sitemap.id;

        const delRes = await client.execute(DELETE_SITEMAP, { id }, { withAuth: true } );
        expect(delRes.deleteSiteMap.success).toBeTruthy();
        expect(delRes.deleteSiteMap.message).toContain('Sitemap deleted successfully');
    });
});
