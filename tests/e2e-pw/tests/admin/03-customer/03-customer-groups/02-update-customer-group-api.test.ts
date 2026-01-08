import { expect, test } from "@playwright/test";
import { updateCustomerGroupMutation } from "../../../../mutations/customer-groups/update-customer-group-api-mutation";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("update customer group details via GraphQL API", () => {
    test('update customer group via graphQL api', async () => {
        const apiClient = new GraphQLClient(GraphQLClient.baseURL);

        const createCustomerGroupResponse = fs.readFileSync(
                "create-customer-group-createResponse.json",
                "utf-8"
            );

        const cre = JSON.parse(createCustomerGroupResponse);
        console.log("Create customer group Response Data:", cre);
        const customer_group_id = Number(cre.createCustomerGroup.customerGroup.id);
        console.log("customer group ID to update:", customer_group_id);
        const randomSuffix = Date.now();

        const updateCustomerGroupCredentials = {
            name: `update-VIP Customers${randomSuffix}`,
            code: `update_vip${randomSuffix}`
        };

        /**
         * Execute create product mutation
         */
        const updateCustomerGroupResponse = await apiClient.execute(updateCustomerGroupMutation, {
                id : customer_group_id,
                input: updateCustomerGroupCredentials,
        }, { withAuth: true });

        console.log('Update customer Response:', updateCustomerGroupResponse);

        const filePath = path.resolve(process.cwd(), "update-customer-updateResponse.json");

        fs.writeFileSync(filePath, JSON.stringify(updateCustomerGroupResponse, null, 2), "utf-8");

        expect(updateCustomerGroupResponse.updateCustomerGroup.success).toBe(true);
        expect(updateCustomerGroupResponse.updateCustomerGroup.message).toContain('Customer Group updated successfully.');
        expect(updateCustomerGroupResponse.updateCustomerGroup.customerGroup.id).toEqual(cre.createCustomerGroup.customerGroup.id);
        expect(updateCustomerGroupResponse.updateCustomerGroup.customerGroup.name).not.toEqual(cre.createCustomerGroup.customerGroup.name);
        expect(updateCustomerGroupResponse.updateCustomerGroup.customerGroup.code).not.toEqual(cre.createCustomerGroup.customerGroup.code);
    });
});
