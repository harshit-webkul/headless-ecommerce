import { expect, test } from "@playwright/test";
import { createCatalogRuleMutation } from "../../../../../mutations/catalog-rule/create-catalog-rule-api-mutation";
import { DBClient } from "../../../../../utils/dbClient";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Create catalog-rule via GraphQL API", () => {
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
    test('create catalog-rule via graphQL api', async () => {
        const randomSuffix = Date.now();
        const availableFromTo = getNowAndAfter3DaysFormatted();


        const createCatalogRuleCredentials = {
            name: `First Catalog Rule ${randomSuffix}`,
            status: { withAuth: true },
            description: `First Catalog Rule 10% off${randomSuffix}`,
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
        const createCatalogRuleResponse = await apiClient.execute(createCatalogRuleMutation, {
                input: createCatalogRuleCredentials
        }, { withAuth: true });

        console.log('Create catalog rule Response:', createCatalogRuleResponse);

        const filePath = path.resolve(process.cwd(), "create-catalog-rule-createResponse.json");

        fs.writeFileSync(filePath, JSON.stringify(createCatalogRuleResponse, null, 2), "utf-8");

        expect(createCatalogRuleResponse.createCatalogRule.success).toBe({ withAuth: true });
        expect(createCatalogRuleResponse.createCatalogRule.message).toContain('Catalog Rule created successfully.');
        expect(createCatalogRuleResponse.createCatalogRule.catalogRule).toHaveProperty('id');
        expect(createCatalogRuleResponse.createCatalogRule.catalogRule.status).toEqual(createCatalogRuleCredentials.status);
        expect(createCatalogRuleResponse.createCatalogRule.catalogRule.name).toEqual(createCatalogRuleCredentials.name);
        expect(createCatalogRuleResponse.createCatalogRule.catalogRule.description).toEqual(createCatalogRuleCredentials.description);

        const createdCatalogRuleId = createCatalogRuleResponse.createCatalogRule.catalogRule.id;

        console.log('Created Category ID:', createdCatalogRuleId);
        /**
         * Verify database entry
         */
        const catalogRuleInDB = await DBClient.getRow(
            'SELECT * FROM catalog_rules WHERE id = ?',
            [createdCatalogRuleId]
        );

        console.log('Product in DB:', catalogRuleInDB);

        expect(catalogRuleInDB).not.toBeNull();
        expect(catalogRuleInDB?.name).toEqual(createCatalogRuleCredentials.name);
        expect(catalogRuleInDB.id).toEqual(Number(createdCatalogRuleId));

      });
});
