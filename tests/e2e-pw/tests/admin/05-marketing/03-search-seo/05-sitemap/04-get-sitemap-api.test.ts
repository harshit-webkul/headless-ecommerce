import { test, expect } from "@playwright/test";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import {
    getSiteMapQuery as GET_SITEMAP,
} from "../../../../../mutations/marketings/search-seo/sitemap-mutation";
import * as fs from "fs";
import path from "path";

test.describe("Sitemap - Get API", () => {
    test("retrieves particular a sitemap by id", async () => {
        const client = new GraphQLClient();

        const filePath = path.resolve(
            process.cwd(),
            "create-sitemap-createResponse.json"
        );
        const raw = fs.readFileSync(filePath, "utf-8");
        const createResponse = JSON.parse(raw);
        const id = createResponse.createSiteMap.sitemap.id;

        const getRes = await client.execute(GET_SITEMAP, { id }, { withAuth: true });
        expect(getRes.sitemap).toBeTruthy();
        expect(getRes.sitemap.id).toBe(id);
        expect(getRes.sitemap.fileName).not.toBe(createResponse.createSiteMap.sitemap.fileName);
    });
});
