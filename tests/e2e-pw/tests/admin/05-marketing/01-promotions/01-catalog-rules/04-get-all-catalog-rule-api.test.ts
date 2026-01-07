import { expect, test } from "@playwright/test";
import { getAllCatalogRulesMutation } from "../../../../../mutations/catalog-rule/get-all-catalog-rule-api-mutation";
import { DBClient } from "../../../../../utils/dbClient";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Get All catalog rule via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);
    test("All catalog rule via graphQL api", async () => {

        const getAllCatalogRulesCredentials = {
            first: "10",
            page: "1",
        };

        /**
         * Execute get all catalog rule mutation
         */
        const getAllCatalogRuleResponse = await apiClient.execute(
            getAllCatalogRulesMutation,
            {getAllCatalogRulesCredentials},
            { withAuth: true }
        );

        console.log("get all catalog rule Response:", getAllCatalogRuleResponse);        

        const filePath = path.resolve(
            process.cwd(),
            "get-all-catalog-rule-createResponse.json"
        );
        
        fs.writeFileSync(
            filePath,
            JSON.stringify(getAllCatalogRuleResponse, null, 2),
            "utf-8"
        );

        expect(getAllCatalogRuleResponse.catalogRules.data.length).toBeGreaterThan(
            0
        );

        /**
         * get the total data from customers table
         */
        const catalogRuleCount = await DBClient.getRow(
        'SELECT COUNT(*) AS total FROM catalog_rules'
        );

        const total_catalog_rule =  catalogRuleCount.total;
        console.log(total_catalog_rule);
        expect(getAllCatalogRuleResponse.catalogRules.paginatorInfo.total).toEqual(total_catalog_rule);
    });
});
