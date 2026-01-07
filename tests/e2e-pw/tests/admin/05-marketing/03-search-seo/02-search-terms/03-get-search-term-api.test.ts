import { test, expect } from "@playwright/test";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import {
    getSearchTermQuery as GET_SEARCH_TERM,
} from "../../../../../mutations/marketings/search-seo/search-term-mutation";
import * as fs from "fs";
import path from "path";

test.describe("Search Term - Get API", () => {
    test("creates and retrieves a search term by id", async () => {
        const client = new GraphQLClient();
        const filePath = path.resolve(
            process.cwd(),
            "create-search-term-createResponse.json"
        );
        const raw = fs.readFileSync(filePath, "utf-8");
        const createResponse = JSON.parse(raw);
        const id = createResponse.createSearchTerm.searchTerm.id;

        const getRes = await client.execute(GET_SEARCH_TERM, { id }, { withAuth: true });
        expect(getRes.searchTerm).toBeTruthy();
        expect(getRes.searchTerm.id).toBe(id);
    });
});
