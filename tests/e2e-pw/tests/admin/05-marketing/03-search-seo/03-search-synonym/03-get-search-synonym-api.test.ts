import { test, expect } from "@playwright/test";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import {
    createSearchSynonymMutation as CREATE_SEARCH_SYNONYM,
    getSearchSynonymQuery as GET_SEARCH_SYNONYM,
    deleteSearchSynonymMutation as DELETE_SEARCH_SYNONYM,
} from "../../../../../mutations/marketings/search-seo/search-synonym-mutation";
import * as fs from "fs";
import path from "path";

test.describe("Search Synonym - Get API", () => {
    test("retrieves a search synonym by id", async () => {
        const client = new GraphQLClient();
        const filePath = path.resolve(
            process.cwd(),
            "create-search-synonym-createResponse.json"
        );
        const raw = fs.readFileSync(filePath, "utf-8");
        const createResponse = JSON.parse(raw);
        const id = createResponse.createSearchSynonym.searchSynonym.id;
        
        const getRes = await client.execute(GET_SEARCH_SYNONYM, { id }, { withAuth: true });
        expect(getRes.searchSynonym).toBeTruthy();
        expect(getRes.searchSynonym.id).toBe(id);
        expect(getRes.searchSynonym.name).not.toBe(createResponse.createSearchSynonym.searchSynonym.name);
    });
});
