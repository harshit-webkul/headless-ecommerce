import { expect, test } from "@playwright/test";
import { DBClient } from "../../../../../utils/dbClient";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";
import { getParticularCartRuleMutation } from "../../../../../mutations/cart-rules/get-particular-cart-rule-api-mutation";

test.describe("get Particular cart rule via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createCartRuleResponse= fs.readFileSync(
        "create-cart-rule-createResponse.json",
        "utf-8"
    )

    const creCartResponse = JSON.parse(createCartRuleResponse);
    console.log("Create cart rule response:", creCartResponse);
    const create_cart_rule_id = Number(creCartResponse.createCartRule.cartRule.id);

    test('get Particular cart rule via graphQL api', async () => {
        const randomSuffix = Date.now();

        const getParticularCartRuleCredentials = {
            id : create_cart_rule_id
        };

        /**
         * Execute get particular cart rule mutation
         */
        const getParticularCartRuleResponse = await apiClient.execute(getParticularCartRuleMutation, {
                id : getParticularCartRuleCredentials.id,
        }, { withAuth: true });

        console.log('Get Particular cart-rule Response:', getParticularCartRuleResponse);
        
        const filePath = path.resolve(process.cwd(), "get-particular-cart-rule-response.json");

        fs.writeFileSync(filePath, JSON.stringify(getParticularCartRuleCredentials, null, 2), "utf-8");

        expect(getParticularCartRuleResponse.cartRule.id).toEqual(create_cart_rule_id.toString());
        
      });
});
