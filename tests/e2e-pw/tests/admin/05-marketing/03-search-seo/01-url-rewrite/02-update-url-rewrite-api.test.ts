import { test, expect } from "@playwright/test";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import {
    createUrlRewriteMutation as CREATE_URL_REWRITE,
    updateUrlRewriteMutation as UPDATE_URL_REWRITE,
    deleteUrlRewriteMutation as DELETE_URL_REWRITE,
} from "../../../../../mutations/marketings/search-seo/url-rewrite-mutation";
import * as fs from "fs";
import path from "path";

test.describe("URL Rewrite - Update API", () => {
    const client = new GraphQLClient();
    const randomSuffix = Date.now();

    test("updates a url-rewrite", async () => {
        const filePath = path.resolve(
            process.cwd(),
            "create-url-rewrite-createResponse.json"
        );

        const raw = fs.readFileSync(filePath, "utf-8");
        const createResponse = JSON.parse(raw);
        const id = createResponse.createUrlRewrite.urlRewrite.id;

        const updatePayload = {
            entityType: `category`,
            requestPath: `update-request-url-${randomSuffix}`,
            targetPath: `update-target-url-${randomSuffix}`,
            redirectType: 302,
            locale: "ar",
        };

        const updateRes = await client.execute(
            UPDATE_URL_REWRITE,
            { id, input: updatePayload },
            { withAuth: true }
        );
        expect(updateRes.updateUrlRewrite).toBeTruthy();
        expect(updateRes.updateUrlRewrite.success).toBeTruthy();
        const updated = updateRes.updateUrlRewrite.urlRewrite;
        expect(updated).toBeTruthy();
        expect(updated.requestPath).not.toBe(createResponse.createUrlRewrite.urlRewrite.requestPath);
        expect(updated.targetPath).not.toBe(createResponse.createUrlRewrite.urlRewrite.targetPath);
        expect(Number(updated.redirectType)).not.toBe(
            createResponse.createUrlRewrite.urlRewrite.redirectType
        );
        expect(updated.locale).not.toBe(createResponse.createUrlRewrite.urlRewrite.locale);
        expect(updated.entityType).toBe(createResponse.createUrlRewrite.urlRewrite.entityType);
    });
});
