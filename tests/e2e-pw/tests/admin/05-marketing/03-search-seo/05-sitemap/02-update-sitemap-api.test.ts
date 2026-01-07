import { test, expect } from "@playwright/test";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import { updateSiteMapMutation as UPDATE_SITEMAP } from "../../../../../mutations/marketings/search-seo/sitemap-mutation";
import * as fs from "fs";
import path from "path";

test.describe("Sitemap - Update API", () => {
    test("Update sitemap", async () => {
        const client = new GraphQLClient();

        const randomSuffix = Date.now();
        
        const filePath = path.resolve(
            process.cwd(),
            "create-sitemap-createResponse.json"
        );
        const raw = fs.readFileSync(filePath, "utf-8");
        const createResponse = JSON.parse(raw);
        const id = createResponse.createSiteMap.sitemap.id;

        const updatePayload = {
            fileName: `update-test-sitemap${randomSuffix}.xml`,
            path: `/update-sitemaps${randomSuffix}/`,
        };

        const updateRes = await client.execute(UPDATE_SITEMAP, { id, input: updatePayload }, { withAuth: true } );
        expect(updateRes.updateSiteMap).toBeTruthy();
        expect(updateRes.updateSiteMap.success).toBeTruthy();
    });
});
