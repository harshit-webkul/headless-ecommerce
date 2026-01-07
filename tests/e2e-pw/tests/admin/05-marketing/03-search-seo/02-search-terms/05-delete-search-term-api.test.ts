import { test, expect } from "@playwright/test";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import {
    deleteSearchTermMutation as DELETE_SEARCH_TERM,
    getSearchTermQuery as GET_SEARCH_TERM,
} from "../../../../../mutations/marketings/search-seo/search-term-mutation";
import * as fs from "fs";
import path from "path";

test.describe("Search Term - Delete API", () => {
    test("deletes a search term", async () => {
        const client = new GraphQLClient();

        const filePath = path.resolve(
            process.cwd(),
            "create-search-term-createResponse.json"
        );
        const raw = fs.readFileSync(filePath, "utf-8");
        const createResponse = JSON.parse(raw);
        const id = createResponse.createSearchTerm.searchTerm.id;

        const delRes = await client.execute(DELETE_SEARCH_TERM, { id }, { withAuth: true });
        expect(delRes.deleteSearchTerm).toBeTruthy();
        expect(delRes.deleteSearchTerm.success).toBeTruthy();

        const getRes = await client.execute(GET_SEARCH_TERM, { id }, { withAuth: true });
        // After delete the searchTerm should not exist (API may return null)
        expect(getRes.searchTerm).toBeNull();
    });
});
