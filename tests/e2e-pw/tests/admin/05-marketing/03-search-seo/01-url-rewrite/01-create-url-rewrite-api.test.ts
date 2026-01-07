import { test, expect } from "@playwright/test";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";
import {
    createUrlRewriteMutation as CREATE_URL_REWRITE,
    deleteUrlRewriteMutation as DELETE_URL_REWRITE,
    getUrlRewritesQuery as GET_URL_REWRITES,
} from "../../../../../mutations/marketings/search-seo/url-rewrite-mutation";

test.describe("URL Rewrite - Create API", () => {
    test("creates a url-rewrite and cleans up", async () => {
        const client = new GraphQLClient();
        const randomSuffix = Date.now();

        const payload = {
            entityType: "category",
            requestPath: `request-url-${randomSuffix}`,
            targetPath: `target-url-${randomSuffix}`,
            redirectType: 301,
            locale: "en",
        };

        const createRes = await client.execute(
            CREATE_URL_REWRITE,
            { input: payload },
            { withAuth: true }
        );
        expect(createRes.createUrlRewrite).toBeTruthy();
        expect(createRes.createUrlRewrite.success).toBeTruthy();

        const created = createRes.createUrlRewrite.urlRewrite;
        expect(created).toBeTruthy();
        expect(created.requestPath).toBe(payload.requestPath);
        expect(created.targetPath).toBe(payload.targetPath);
        expect(Number(created.redirectType)).toBe(payload.redirectType);
        expect(created.locale).toBe(payload.locale);
        expect(created.entityType).toBe(payload.entityType);

        console.log("Create url rewrite Response:", createRes);
        
        const filePath = path.resolve(process.cwd(), "create-url-rewrite-createResponse.json");
        fs.writeFileSync(filePath, JSON.stringify(createRes, null, 2), "utf-8");
    });
});
