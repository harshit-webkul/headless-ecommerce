import { expect, test } from "@playwright/test";
import { DBClient } from "../../../../../utils/dbClient";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import { deleteCartRuleMutation } from "../../../../../mutations/cart-rules/delete-cart-rule-api-mutation";

test.describe("delete cart rule via GraphQL API", () => {
     let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createCartRuleResponse= fs.readFileSync(
        "create-cart-rule-createResponse.json",
        "utf-8"
    )

    const creCartResponse = JSON.parse(createCartRuleResponse);
    console.log("Create cart rule response:", creCartResponse);
    const create_cart_rule_id = Number(creCartResponse.createCartRule.cartRule.id);

test('delete catalog rule via graphQL api', async () => {

        const deleteCartRuleCredentials = {
            id : create_cart_rule_id,
        };
        
        /**
         * Execute delete catalog rule execution
         */
        const deleteCartRuleResponse = await apiClient.execute(deleteCartRuleMutation, {
                id: deleteCartRuleCredentials.id
        }, true);

        console.log('delete cart rule Response:', deleteCartRuleResponse);

        expect(deleteCartRuleResponse.deleteCartRule.success).toBe(true); 
        expect(deleteCartRuleResponse.deleteCartRule.message).toContain('Cart Rule deleted successfully'); 
    });
});