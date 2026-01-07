import { test, expect } from "@playwright/test";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import {
    createSearchSynonymMutation as CREATE_SEARCH_SYNONYM,
} from "../../../../../mutations/marketings/search-seo/search-synonym-mutation";
import * as fs from "fs";
import path from "path";

test.describe("Search Synonym - Create API", () => {
    test("creates a search synonym", async () => {
        const client = new GraphQLClient();
        const randomSuffix = Date.now();

        const payload = {
            name: `kids-synonym${randomSuffix}`,
            terms: `kids${randomSuffix},children${randomSuffix}`,
        };

        // // remove any pre-existing entries with same name to avoid conflicts
        // const listResBefore = await client.execute(GET_SEARCH_SYNONYMS, { first: 100 }, { withAuth: true });
        // const listBefore = listResBefore.searchSynonyms?.data ?? [];
        // for (const item of listBefore) {
        //     if (item.name === payload.name) {
        //         await client.execute(DELETE_SEARCH_SYNONYM, { id: item.id }, { withAuth: true });
        //     }
        // }

        const createRes = await client.execute(CREATE_SEARCH_SYNONYM, { input: payload }, { withAuth: true });
        expect(createRes.createSearchSynonym).toBeTruthy();
        expect(createRes.createSearchSynonym.success).toBeTruthy();

        const created = createRes.createSearchSynonym.searchSynonym;
        expect(created).toBeTruthy();
        expect(created.name).toBe(payload.name);
        expect(created.terms).toBe(payload.terms);

        console.log("Create url rewrite Response:", createRes);
                
        const filePath = path.resolve(process.cwd(), "create-search-synonym-createResponse.json");
        fs.writeFileSync(filePath, JSON.stringify(createRes, null, 2), "utf-8");
    });
});
