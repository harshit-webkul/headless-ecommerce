import { expect, test } from "@playwright/test";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import { deleteCustomerAddressMutation } from "../../../../mutations/customer-addresses/delete-customer-address-api-mutation";

test.describe("delete customer address via GraphQL API", () => {
     let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

     const createCustomerAddressResponse = fs.readFileSync(
        "create-customer-address-createResponse.json",
        "utf-8"
    );
   
    const cre = JSON.parse(createCustomerAddressResponse)
    console.log("Create customer address Response Data:", cre);
    const customer_address_id = Number(cre.createCustomerAddress.address.id);
    console.log("customer address ID to update:", customer_address_id)

test('delete customer address via graphQL api', async () => {

        const deleteCustomerAddressCredentials = {
            id : customer_address_id,
        };
        
        /**
         * Execute delete address mutation
         */
        const deleteCustomerAddressResponse = await apiClient.execute(deleteCustomerAddressMutation, {
                id: deleteCustomerAddressCredentials.id
        }, { withAuth: true });

        console.log('delete customer address Response:', deleteCustomerAddressResponse);

        expect(deleteCustomerAddressResponse.deleteCustomerAddress.success).toBe(true);        
    });
});