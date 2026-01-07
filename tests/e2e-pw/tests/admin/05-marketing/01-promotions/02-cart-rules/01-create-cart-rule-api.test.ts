import { expect, test } from "@playwright/test";
import { createCartRuleMutation } from "../../../../../mutations/cart-rules/create-cart-rule-api-mutation";
import { DBClient } from "../../../../../utils/dbClient";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Create cart-rule via GraphQL API", () => {
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
    test('create cart-rule via graphQL api', async () => {
        const randomSuffix = Date.now();
        const availableFromTo = getNowAndAfter3DaysFormatted();

        const createCartRuleCredentials = {    
            name: `First Cart Rule (10%)${randomSuffix}`,
            description: "You can avail 10% off by using this cart rule.",
            couponType: 1,
            useAutoGeneration: false,
            couponCode: `cart${randomSuffix}`,
            usesPerCoupon: 2,
            usagePerCustomer: 3,
            conditionType: { withAuth: true },
            conditions: [{
                attribute: "cart|base_sub_total",
                operator: ">=",
                attributeType: "price",
                value: "10"
            },	{
                attribute: "product|category_ids",
                operator: "{}",
                attributeType: "multiselect",
                value: ["3"],
            }],
            actionType: "FixedAmount",
            discountAmount: 5,
            discountQuantity: 1,
            discountStep: 2,
            applyToShipping: false,
            freeShipping: false,
            endOtherRules: false,
            sortOrder: 1,
            channels: [1],
            customerGroups: [customer_group_id],
            status: { withAuth: true },
            startsFrom: availableFromTo.from,
            endsTill: availableFromTo.to,   
        };

        /**
         * Execute create CartRule mutation
         */
        const createCartRuleResponse = await apiClient.execute(createCartRuleMutation, {
                input: createCartRuleCredentials
        }, { withAuth: true });

        console.log('Create cart rule Response:', createCartRuleResponse);

        const filePath = path.resolve(process.cwd(), "create-cart-rule-createResponse.json");

        fs.writeFileSync(filePath, JSON.stringify(createCartRuleResponse, null, 2), "utf-8");

        expect(createCartRuleResponse.createCartRule.success).toBe({ withAuth: true });
        expect(createCartRuleResponse.createCartRule.message).toContain('Cart Rule created successfully.');
        expect(createCartRuleResponse.createCartRule.cartRule.name).toEqual(createCartRuleCredentials.name);
        expect(createCartRuleResponse.createCartRule.cartRule.description).toEqual(createCartRuleCredentials.description);

        const createdCartRuleId = createCartRuleResponse.createCartRule.cartRule.id;

        console.log('Created Category ID:', createdCartRuleId);
        /**
         * Verify database entry
         */
        const cartRuleInDB = await DBClient.getRow(
            'SELECT * FROM cart_rules WHERE id = ?',
            [createdCartRuleId]
        );

        console.log('Product in DB:', cartRuleInDB);

        expect(cartRuleInDB).not.toBeNull();
        expect(cartRuleInDB?.name).toEqual(createCartRuleCredentials.name);
        expect(cartRuleInDB.id).toEqual(Number(createdCartRuleId));

      });
});
