import { test, expect } from "@playwright/test";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import {
    updateSearchSynonymMutation as UPDATE_SEARCH_SYNONYM,
} from "../../../../../mutations/marketings/search-seo/search-synonym-mutation";
import *as fs from "fs";
import path from "path";

test.describe("Search Synonym - Update API", () => {
    test("creates and updates a search synonym", async () => {
        const client = new GraphQLClient();
        const randomSuffix = Date.now();

        const filePath = path.resolve(
            process.cwd(),
            "create-search-synonym-createResponse.json"
        );
        const raw = fs.readFileSync(filePath, "utf-8");
        const createResponse = JSON.parse(raw);
        const id = createResponse.createSearchSynonym.searchSynonym.id;

        const updatePayload = {
            name: `update-kids-synonym${randomSuffix}`,
            terms: `boys${randomSuffix}, kids${randomSuffix},children${randomSuffix}`,
        };


        const updateRes = await client.execute(UPDATE_SEARCH_SYNONYM, { id, input: updatePayload }, { withAuth: true });
        expect(updateRes.updateSearchSynonym).toBeTruthy();
        expect(updateRes.updateSearchSynonym.success).toBeTruthy();
        const updated = updateRes.updateSearchSynonym.searchSynonym;
        expect(updated).toBeTruthy();
        expect(updated.name).toBe(updatePayload.name);
        expect(updated.terms).toBe(updatePayload.terms);

    });
});
