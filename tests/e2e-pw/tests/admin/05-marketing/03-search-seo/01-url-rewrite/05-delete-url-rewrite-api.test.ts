import { test, expect } from "@playwright/test";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import {
    createUrlRewriteMutation as CREATE_URL_REWRITE,
    deleteUrlRewriteMutation as DELETE_URL_REWRITE,
    getUrlRewriteQuery as GET_URL_REWRITE,
} from "../../../../../mutations/marketings/search-seo/url-rewrite-mutation";

test.describe("URL Rewrite - Delete API", () => {
    test("creates and deletes a url-rewrite", async () => {
        const client = new GraphQLClient();

        const payload = {
            entityType: "category",
            requestPath: "kids",
            targetPath: "women",
            redirectType: 301,
            locale: "en",
        };

        const createRes = await client.execute(
            CREATE_URL_REWRITE,
            { input: payload },
            { withAuth: true }
        );
        expect(createRes.createUrlRewrite).toBeTruthy();
        const created = createRes.createUrlRewrite.urlRewrite;
        const id = created.id;

        const delRes = await client.execute(DELETE_URL_REWRITE, { id }, { withAuth: true });
        expect(delRes.deleteUrlRewrite).toBeTruthy();
        expect(delRes.deleteUrlRewrite.success).toBeTruthy();

        const getRes = await client.execute(GET_URL_REWRITE, { id }, { withAuth: true });
        // After delete the urlRewrite should not exist (API might return null)
        expect(getRes.urlRewrite).toBeNull();
    });
});
