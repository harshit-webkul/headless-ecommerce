import { test, expect } from "@playwright/test";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import {
    createUrlRewriteMutation as CREATE_URL_REWRITE,
    getUrlRewriteQuery as GET_URL_REWRITE,
    deleteUrlRewriteMutation as DELETE_URL_REWRITE,
} from "../../../../../mutations/marketings/search-seo/url-rewrite-mutation";

test.describe("URL Rewrite - Get API", () => {
    test("creates and retrieves a url-rewrite by id", async () => {
        const client = new GraphQLClient();

        const createPayload = {
            entityType: "category",
            requestPath: "kids",
            targetPath: "women",
            redirectType: 301,
            locale: "en",
        };

        const createRes = await client.execute(CREATE_URL_REWRITE, { input: createPayload }, { withAuth: true });
        expect(createRes.createUrlRewrite).toBeTruthy();
        const created = createRes.createUrlRewrite.urlRewrite;
        const id = created.id;

        const getRes = await client.execute(GET_URL_REWRITE, { id }, { withAuth: true });
        expect(getRes.urlRewrite).toBeTruthy();
        expect(getRes.urlRewrite.id).toBe(id);
        expect(getRes.urlRewrite.requestPath).toBe(createPayload.requestPath);

        // cleanup
        const delRes = await client.execute(DELETE_URL_REWRITE, { id }, { withAuth: true });
        expect(delRes.deleteUrlRewrite).toBeTruthy();
        expect(delRes.deleteUrlRewrite.success).toBeTruthy();
    });
});
