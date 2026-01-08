import { expect, test } from "@playwright/test";
import {CreateCustomerGroupMutation} from "../../../../mutations/customer-groups/create-customer-group-api-mutation"
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Create Customer group via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);
    test('create Customer group graphQL api', async () => {
        const randomSuffix = Date.now();

        const createCustomerGroupCredentials = {
            name: `Create Group${randomSuffix}`,
            code: `vip${randomSuffix}`,
        };

        /**
         * Execute create customer mutation
         */
        const createCustomerGroupResponse = await apiClient.execute(CreateCustomerGroupMutation, {
                input: createCustomerGroupCredentials
        }, { withAuth: true });

        console.log('Create customer group Response:', createCustomerGroupResponse);

        const filePath = path.resolve(process.cwd(), "create-customer-group-createResponse.json");

        fs.writeFileSync(filePath, JSON.stringify(createCustomerGroupResponse, null, 2), "utf-8");

        expect(createCustomerGroupResponse.createCustomerGroup.success).toBe(true);
        expect(createCustomerGroupResponse.createCustomerGroup.message).toContain('Customer Group created successfully.');
        
        const create_customer_group_ID = Number(createCustomerGroupResponse.createCustomerGroup.customerGroup.id);

        console.log('Created customer group ID:', create_customer_group_ID);

        /**
         * Verify database entry
         */
        const customerGroupIDInDB = await DBClient.getRow(
            'SELECT * FROM customer_groups WHERE id = ?',
            [create_customer_group_ID]
        );

        console.log('Product in DB:', customerGroupIDInDB);

        expect(customerGroupIDInDB).not.toBeNull();
        expect(customerGroupIDInDB?.code).toEqual(createCustomerGroupResponse.createCustomerGroup.customerGroup.code);


      });
});
