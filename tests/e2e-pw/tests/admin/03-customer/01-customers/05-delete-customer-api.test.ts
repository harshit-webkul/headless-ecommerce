import { expect, test } from "@playwright/test";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import { deleteCustomerMutation } from "../../../../mutations/customers/delete-customer-api-mutation";

test.describe("delete customer via GraphQL API", () => {
     let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createCustomerResponse = fs.readFileSync(
                "create-customer-createResponse.json",
                "utf-8"
            );
    
    const cre = JSON.parse(createCustomerResponse)
    console.log("Create customer Response Data:", cre);
    const customer_id = Number(cre.createCustomer.customer.id);
    console.log("Category ID to update:", customer_id);

test('delete customer via graphQL api', async () => {

        const deleteCustomerCredentials = {
            id : customer_id,
        };
        
        /**
         * Execute delete category mutation
         */
        const deleteCustomerResponse = await apiClient.execute(deleteCustomerMutation, {
                id: deleteCustomerCredentials.id
        }, { withAuth: true });

        console.log('delete customer Response:', deleteCustomerResponse);

        expect(deleteCustomerResponse.deleteCustomer.success).toBe(true);        
    });
});