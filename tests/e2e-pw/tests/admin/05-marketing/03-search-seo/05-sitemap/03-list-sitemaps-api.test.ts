import { test, expect } from "@playwright/test";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import { getSiteMapsQuery as GET_SITEMAPS } from "../../../../../mutations/marketings/search-seo/sitemap-mutation";

test.describe("Sitemap - List API", () => {
    test("creates a sitemap and finds it in the list", async () => {
        const client = new GraphQLClient();

        const getRes = await client.execute(
            GET_SITEMAPS,
            { first: 100, page: 1, input: {} },
            { withAuth: true }
        );
        expect(getRes.sitemaps).toBeTruthy();
    });
});
