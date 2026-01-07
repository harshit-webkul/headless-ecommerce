import { test, expect } from "@playwright/test";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import {
    createSiteMapMutation as CREATE_SITEMAP,
} from "../../../../../mutations/marketings/search-seo/sitemap-mutation";
import * as fs from "fs";
import path from "path";

test.describe("Sitemap - Create API", () => {
    test("creates a sitemap and cleans up", async () => {
        const client = new GraphQLClient();
        const randomSuffix = Date.now();

        const payload = {
            fileName: `test-sitemap${randomSuffix}.xml`,
            path: `/sitemaps${randomSuffix}/`,
        };

        const createRes = await client.execute(CREATE_SITEMAP, { input: payload }, { withAuth: true });
        expect(createRes.createSiteMap).toBeTruthy();
        expect(createRes.createSiteMap.success).toBeTruthy();

        const created = createRes.createSiteMap.sitemap;
        expect(created).toBeTruthy();
        expect(created.fileName).toBe(payload.fileName);
        expect(created.path).toBe(payload.path);

        console.log("Create sitemap Response:", createRes);
                        
        const filePath = path.resolve(process.cwd(), "create-sitemap-createResponse.json");
        fs.writeFileSync(filePath, JSON.stringify(createRes, null, 2), "utf-8");
    });
});
