import { test, expect } from "@playwright/test";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import {
    createSearchTermMutation as CREATE_SEARCH_TERM,
} from "../../../../../mutations/marketings/search-seo/search-term-mutation";
import * as fs from "fs";
import path from "path";

test.describe("Search Term - Create API", () => {
    test("creates a search term and cleans up", async () => {
        const client = new GraphQLClient();
        const baseURL = GraphQLClient.baseURL;
        const randomSuffix = Date.now();

        const payload = {
            term: `kids-search${randomSuffix}`,
            redirectUrl: `${baseURL}/kids-search${randomSuffix}`,
            locale: "en",
            channelID: 1,
        };

        const createRes = await client.execute(CREATE_SEARCH_TERM, { input: payload }, { withAuth: true });
        expect(createRes.createSearchTerm).toBeTruthy();
        expect(createRes.createSearchTerm.success).toBeTruthy();

        const created = createRes.createSearchTerm.searchTerm;
        expect(created).toBeTruthy();
        expect(created.term).toBe(payload.term);
        expect(created.redirectUrl).toBe(payload.redirectUrl);
        expect(created.locale).toBe(payload.locale);

        console.log("Create url rewrite Response:", createRes);
                
        const filePath = path.resolve(process.cwd(), "create-search-term-createResponse.json");
        fs.writeFileSync(filePath, JSON.stringify(createRes, null, 2), "utf-8");
    });
});
