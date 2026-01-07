import { expect, test } from "@playwright/test";
import { updateCatalogRuleMutation } from "../../../../../mutations/catalog-rule/update-catalog-rule-api-mutation";
import { DBClient } from "../../../../../utils/dbClient";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("update customer group details via GraphQL API", () => {

    let apiClient: GraphQLClient;
        apiClient = new GraphQLClient(GraphQLClient.baseURL);
    
        const createCustomerGroupResponse = fs.readFileSync(
            "create-customer-group-createResponse.json",
            "utf-8"
        );
        const cre = JSON.parse(createCustomerGroupResponse);
        console.log("Create customer group Response Data:", cre);
        const customer_group_id = Number(cre.createCustomerGroup.customerGroup.id);
        console.log("customer group ID to update:", customer_group_id);
    
        const availableFromTo = getNowAndAfter3DaysFormatted();
        console.log("Available From:", availableFromTo.from);
        console.log("Available To:", availableFromTo.to);
    
        function formatDateTime(date: Date): string {
            const pad = (n: number) => n.toString().padStart(2, "0");
    
            return (
                `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
                    date.getDate()
                )} ` +
                `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
                    date.getSeconds()
                )}`
            );
        }
    
        function getNowAndAfter3DaysFormatted() {
            const now = new Date();
            const after3Days = new Date(now);
            after3Days.setDate(now.getDate() + 3);
    
            return {
                from: formatDateTime(now),
                to: formatDateTime(after3Days),
            };
        }

        const createCatalogRuleResponse = fs.readFileSync(
            "vendor/bagisto/graphql-api/tests/e2e-pw/create-catalog-rule-createResponse.json",
            "utf-8"
        );

        const createCatalogrResponse = JSON.parse(createCatalogRuleResponse);
        console.log("Create catalog rule Response Data:", createCatalogrResponse);
        const catalog_rule_id = Number(createCatalogrResponse.createCatalogRule.catalogRule.id);
        console.log("catalog rule ID to update:", catalog_rule_id);

    test('update customer group via graphQL api', async () => {
        const randomSuffix = Date.now();
        const availableFromTo = getNowAndAfter3DaysFormatted();


        const updateCatalogRuleCredentials = {
            name: `update-First Catalog Rule ${randomSuffix}`,
            status: { withAuth: true },
            description: `update-First Catalog Rule 10% off${randomSuffix}`,
            channels: [1],
            customerGroups: [customer_group_id],
            startsFrom: availableFromTo.from,
            endsTill: availableFromTo.to,
            conditionType: 1,
            conditions: [{
                attribute: "product|category_ids",
                operator: "{}",
                attributeType: "multiselect",
                value: ["1", "3"]
            },	{
                attribute: "product|sku",
                operator: "==",
                attributeType: "text",
                value: ["phone"]
            }],
            sortOrder: 1,
            actionType: "by_percent",
            discountAmount: 10,
            endOtherRules: { withAuth: true },
    
        };

        /**
         * Execute create product mutation
         */
        const updateCatalogRuleResponse = await apiClient.execute(updateCatalogRuleMutation, {
                id : catalog_rule_id,
                input: updateCatalogRuleCredentials,
        }, { withAuth: true });

        console.log('Update catalog rule Response:', updateCatalogRuleResponse);

        const filePath = path.resolve(process.cwd(), "update-catalog-rule-updateResponse.json");

        fs.writeFileSync(filePath, JSON.stringify(updateCatalogRuleResponse, null, 2), "utf-8");

        expect(updateCatalogRuleResponse.updateCatalogRule.success).toBe({ withAuth: true });
        expect(updateCatalogRuleResponse.updateCatalogRule.message).toContain('Catalog Rule updated successfully.');
        expect(updateCatalogRuleResponse.updateCatalogRule.catalogRule.name).not.toEqual(createCatalogrResponse.createCatalogRule.catalogRule.name);
        expect(updateCatalogRuleResponse.updateCatalogRule.catalogRule.description).not.toEqual(createCatalogrResponse.createCatalogRule.catalogRule.description);
    });
});
