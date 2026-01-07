import { expect, test } from "@playwright/test";
import { DBClient } from "../../../../../utils/dbClient";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import { deleteCatalogRuleMutation } from "../../../../../mutations/catalog-rule/delete-catalog-rule-api-mutation";

test.describe("delete catalog rule via GraphQL API", () => {
     let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createCatalogRuleResponse = fs.readFileSync(
        "vendor/bagisto/graphql-api/tests/e2e-pw/create-catalog-rule-createResponse.json",
        "utf-8"
    );
    const createCatalogrResponse = JSON.parse(createCatalogRuleResponse);
    console.log("Create catalog rule Response Data:", createCatalogrResponse);
    const catalog_rule_id = Number(createCatalogrResponse.createCatalogRule.catalogRule.id);
    console.log("catalog rule ID to update:", catalog_rule_id);

test('delete catalog rule via graphQL api', async () => {

        const deleteCatalogRuleCredentials = {
            id : catalog_rule_id,
        };
        
        /**
         * Execute delete catalog rule execution
         */
        const deleteCatalogRuleResponse = await apiClient.execute(deleteCatalogRuleMutation, {
                id: deleteCatalogRuleCredentials.id
        }, { withAuth: true });

        console.log('delete catalog rule Response:', deleteCatalogRuleResponse);

        expect(deleteCatalogRuleResponse.deleteCatalogRule.success).toBe({ withAuth: true }); 
        expect(deleteCatalogRuleResponse.deleteCatalogRule.message).toContain('Catalog Rule deleted successfully'); 
    });
});