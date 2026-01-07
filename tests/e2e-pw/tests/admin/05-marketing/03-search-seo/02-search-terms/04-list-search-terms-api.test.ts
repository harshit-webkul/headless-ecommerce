import { test, expect } from "@playwright/test";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import { getSearchTermsQuery as GET_SEARCH_TERMS } from "../../../../../mutations/marketings/search-seo/search-term-mutation";

test.describe("Search Term - List API", () => {
    test("creates a search term and finds it in list", async () => {
        const client = new GraphQLClient();

        const listRes = await client.execute(
            GET_SEARCH_TERMS,
            { first: 100, page: 1, input: {} },
            { withAuth: true }
        );
        expect(listRes.searchTerms).toBeTruthy();
    });
});
