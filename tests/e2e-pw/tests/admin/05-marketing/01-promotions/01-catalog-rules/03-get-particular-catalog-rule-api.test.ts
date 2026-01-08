import { expect, test } from "@playwright/test";
import { DBClient } from "../../../../../utils/dbClient";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";
import { getParticularCatalogRuleMutation } from "../../../../../mutations/catalog-rule/get-particular-catalog-rule-api-mutation";

test.describe("get Particular catalog rule via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    test('get Particular catalog rule via graphQL api', async () => {
        
        const createCatalogRuleResponse = fs.readFileSync(
            "create-catalog-rule-createResponse.json",
            "utf-8"
        );
    
        const cre = JSON.parse(createCatalogRuleResponse)
        console.log("Create catalog rule Response Data:", cre);
        const catalog_rule_id = Number(cre.createCatalogRule.catalogRule.id);
        console.log("catalog rule ID to update:", catalog_rule_id);
        const randomSuffix = Date.now();

        const getParticularCatalogRuleCredentials = {
            id : catalog_rule_id
        };

        /**
         * Execute get particular customer mutation
         */
        const getParticularCatalogRuleResponse = await apiClient.execute(getParticularCatalogRuleMutation, {
                id : getParticularCatalogRuleCredentials.id,
        }, { withAuth: true });

        console.log('Get Particular catalog-rule Response:', getParticularCatalogRuleResponse);
        
        const filePath = path.resolve(process.cwd(), "get-particular-catalog-rule-response.json");

        fs.writeFileSync(filePath, JSON.stringify(getParticularCatalogRuleResponse, null, 2), "utf-8");

        expect(getParticularCatalogRuleResponse.catalogRule.id).toEqual(catalog_rule_id.toString());
        
      });
});
