import { test, expect } from "@playwright/test";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import {
    getSearchSynonymsQuery as GET_SEARCH_SYNONYMS,
} from "../../../../../mutations/marketings/search-seo/search-synonym-mutation";

test.describe("Search Synonym - List API", () => {
    test("finds it in list", async () => {
        const client = new GraphQLClient();

        const listRes = await client.execute(
            GET_SEARCH_SYNONYMS,
            { first: 100, page: 1, input: {} },
            { withAuth: true }
        );
        expect(listRes.searchSynonyms).toBeTruthy();
    });
});
