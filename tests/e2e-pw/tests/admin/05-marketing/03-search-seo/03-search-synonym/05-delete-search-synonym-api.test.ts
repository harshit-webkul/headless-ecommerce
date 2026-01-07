import { test, expect } from "@playwright/test";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import {
    deleteSearchSynonymMutation as DELETE_SEARCH_SYNONYM,
} from "../../../../../mutations/marketings/search-seo/search-synonym-mutation";
import * as fs from "fs";
import path from "path";

test.describe("Search Synonym - Delete API", () => {
    test("creates and deletes a search synonym", async () => {
        const client = new GraphQLClient();

        const filePath = path.resolve(
            process.cwd(),
            "create-search-synonym-createResponse.json"
        );
        const raw = fs.readFileSync(filePath, "utf-8");
        const createResponse = JSON.parse(raw);
        const id = createResponse.createSearchSynonym.searchSynonym.id;

        const delRes = await client.execute(DELETE_SEARCH_SYNONYM, { id: id }, { withAuth: true });
        expect(delRes.deleteSearchSynonym).toBeTruthy();
        expect(delRes.deleteSearchSynonym.success).toBeTruthy();
    });
});
