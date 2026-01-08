import { expect, test } from "@playwright/test";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import { deleteCustomerGroupMutation } from "../../../../mutations/customer-groups/delete-customer-group-api-mutation";

test.describe("delete customer group via GraphQL API", () => {
     let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createCustomerGroupResponse = fs.readFileSync(
        "create-customer-group-createResponse.json",
        "utf-8"
    );
    
    const cre = JSON.parse(createCustomerGroupResponse)
    console.log("Create customer group Response Data:", cre);
    const customer_group_id = Number(cre.createCustomerGroup.customerGroup.id);
    console.log("customer group ID to update:", customer_group_id);

test('delete customer group via graphQL api', async () => {

        const deleteCustomerGroupCredentials = {
            id : customer_group_id,
        };
        
        /**
         * Execute delete customer group execution
         */
        const deleteCustomerGroupResponse = await apiClient.execute(deleteCustomerGroupMutation, {
                id: deleteCustomerGroupCredentials.id
        }, { withAuth: true });

        console.log('delete customer group Response:', deleteCustomerGroupResponse);

        expect(deleteCustomerGroupResponse.deleteCustomerGroup.success).toBe(true); 
        expect(deleteCustomerGroupResponse.deleteCustomerGroup.message).toContain('Customer Group deleted successfully'); 
    });
});