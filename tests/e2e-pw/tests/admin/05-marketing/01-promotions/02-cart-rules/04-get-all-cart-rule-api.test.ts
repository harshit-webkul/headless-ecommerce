import { expect, test } from "@playwright/test";
import { getAllCartRuleMutation } from "../../../../../mutations/cart-rules/get-all-cart-rule-api-mutation";
import { DBClient } from "../../../../../utils/dbClient";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Get All cart rule via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);
    test("All cart rule via graphQL api", async () => {

        const getAllCartRulesCredentials = {
            first: "10",
            page: "1",
        };

        // const getParticularDetails = {
        //      id: 1,
        //      name: "test",
        //      couponCode: "abcde",
        //      start: "2024-03-19 12:00:00",
        //      end: "2024-03-29 12:00:00",
        //      status: { withAuth: true },
        //      priority: 1,
        // }

        /**
         * Execute get all cart rule mutation
         */
        const getAllCartRuleResponse = await apiClient.execute(
            getAllCartRuleMutation,
            {getAllCartRulesCredentials},
            { withAuth: true }
        );

        console.log("get all cart rule Response:", getAllCartRuleResponse);        

        const filePath = path.resolve(
            process.cwd(),
            "get-all-cart-rule-createResponse.json"
        );
        
        fs.writeFileSync(
            filePath,
            JSON.stringify(getAllCartRuleResponse, null, 2),
            "utf-8"
        );

        expect(getAllCartRuleResponse.cartRules.data.length).toBeGreaterThan(
            0
        );

        /**
         * get the total data from cart_rules table
         */
        const cartRuleCount = await DBClient.getRow(
        'SELECT COUNT(*) AS total FROM cart_rules'
        );

        const total_cart_rule =  cartRuleCount.total;
        console.log(total_cart_rule);
        expect(getAllCartRuleResponse.cartRules.paginatorInfo.total).toEqual(total_cart_rule);
    });
});
