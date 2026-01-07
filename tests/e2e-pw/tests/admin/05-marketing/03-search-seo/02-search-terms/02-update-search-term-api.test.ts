import { test, expect } from "@playwright/test";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import {
    updateSearchTermMutation as UPDATE_SEARCH_TERM,
} from "../../../../../mutations/marketings/search-seo/search-term-mutation";
import * as fs from "fs";
import path from "path";

test.describe("Search Term - Update API", () => {
    const client = new GraphQLClient();
    const baseURL = GraphQLClient.baseURL;

    test("updates a search term", async () => {
        
        const randomSuffix = Date.now();
        const filePath = path.resolve(
            process.cwd(),
            "create-search-term-createResponse.json"
        );
        const raw = fs.readFileSync(filePath, "utf-8");
        const createResponse = JSON.parse(raw);
        const id = createResponse.createSearchTerm.searchTerm.id;

        const updatePayload = {
            term: `update-kids-search${randomSuffix}`,
            results: 10,
            uses: 1,
            redirectUrl: `${baseURL}/update-kids-search${randomSuffix}`,
            locale: "en",
            channelID: 1,
        };

        const updateRes = await client.execute(UPDATE_SEARCH_TERM, { id, input: updatePayload }, { withAuth: true });
        expect(updateRes.updateSearchTerm).toBeTruthy();
        expect(updateRes.updateSearchTerm.success).toBeTruthy();
        const updated = updateRes.updateSearchTerm.searchTerm;
        expect(updated).toBeTruthy();
        expect(updated.term).toBe(updatePayload.term);
        expect(Number(updated.results)).toBe(updatePayload.results);
        expect(Number(updated.uses)).toBe(updatePayload.uses);
        expect(updated.redirectUrl).toBe(updatePayload.redirectUrl);
        expect(updated.locale).toBe(updatePayload.locale);
    });
});
