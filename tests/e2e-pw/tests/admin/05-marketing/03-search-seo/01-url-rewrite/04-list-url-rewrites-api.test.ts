import { test, expect } from "@playwright/test";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import {
    createUrlRewriteMutation as CREATE_URL_REWRITE,
    getUrlRewritesQuery as GET_URL_REWRITES,
} from "../../../../../mutations/marketings/search-seo/url-rewrite-mutation";

test.describe("URL Rewrite - List API", () => {
    test("creates a url-rewrite and finds it in list", async () => {
        const client = new GraphQLClient();

        const payload = {
            entityType: "category",
            requestPath: "kids",
            targetPath: "women",
            redirectType: 301,
            locale: "en",
        };

        const createRes = await client.execute(CREATE_URL_REWRITE, { input: payload }, { withAuth: true });
        expect(createRes.createUrlRewrite).toBeTruthy();
        const created = createRes.createUrlRewrite.urlRewrite;
        const id = created.id;

        const listRes = await client.execute(GET_URL_REWRITES, { first: 100 }, { withAuth: true });
        expect(listRes.urlRewrites).toBeTruthy();
        const data = listRes.urlRewrites.data ?? [];
        const found = data.find((i: any) => i.id === id || (i.requestPath === payload.requestPath && i.entityType === payload.entityType));
        expect(found).toBeTruthy();
    });
});
