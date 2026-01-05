import { expect, test } from "@playwright/test";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import { deleteLocaleMutation } from "../../../../mutations/settings/locales-mutation";

test.describe("delete locale via GraphQL API", () => {
    const apiClient = new GraphQLClient(GraphQLClient.baseURL);
    
        const createLocalesResponse = fs.readFileSync(
            "create-locale-createResponse.json",
            "utf-8"
        );
        const cre = JSON.parse(createLocalesResponse);
        console.log("create-locale Response Data:", cre);
        const locale_id = Number(cre.createLocale.locale.id);
        console.log("create-locale ID: ", locale_id);
        const randomSuffix = Date.now();

test('delete locale via graphQL api', async () => {

        const deleteCatalogRuleCredentials = {
            id : locale_id,
        };
        
        /**
         * Execute delete locale execution
         */
        const deleteLocaleResponse = await apiClient.execute(deleteLocaleMutation, {
                id: deleteCatalogRuleCredentials.id
        }, true);

        console.log('delete catalog rule Response:', deleteLocaleResponse);

        expect(deleteLocaleResponse.deleteLocale.success).toBe(true); 
        expect(deleteLocaleResponse.deleteLocale.message).toContain('Locale deleted successfully'); 
    });
});