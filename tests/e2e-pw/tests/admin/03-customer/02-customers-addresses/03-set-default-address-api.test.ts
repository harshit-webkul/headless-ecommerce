import { expect, test } from "@playwright/test";
import { setDefaultAddressMutation } from "../../../../mutations/customer-addresses/set-default-address-api-mutation";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("set customer default address details via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createCustomerResponse = fs.readFileSync(
            "vendor/bagisto/graphql-api/tests/e2e-pw/create-customer-createResponse.json",
            "utf-8"
        );

    const customer_response = JSON.parse(createCustomerResponse);
    const customer_id = Number(customer_response.createCustomer.customer.id);
    console.log('customer_id: ', customer_id);

    const createCustomerAddressResponse = fs.readFileSync(
            "vendor/bagisto/graphql-api/tests/e2e-pw/create-customer-address-createResponse.json",
            "utf-8"
        );

    const cre = JSON.parse(createCustomerAddressResponse)
    console.log("Create customer address Response Data:", cre);
    const address_id = Number(cre.createCustomerAddress.address.id);
    console.log("address ID to update:", address_id);

    test('set default address details via graphQL api', async () => {
        const randomSuffix = Date.now();


        /**
         * Execute create product mutation
         */
        const setCustomerDefaultAddressResponse = await apiClient.execute(setDefaultAddressMutation, {
                id : address_id,
                customerId : customer_id,
        }, true);

        console.log('Update customer address Response:', setCustomerDefaultAddressResponse);

        const filePath = path.resolve(process.cwd(), "set-customer-default-address-updateResponse.json");

        fs.writeFileSync(filePath, JSON.stringify(setCustomerDefaultAddressResponse, null, 2), "utf-8");

        // expect(setCustomerDefaultAddressResponse.updateCustomerAddress.success).toBe(true);
        // expect(setCustomerDefaultAddressResponse.updateCustomerAddress.message).toContain("Customer's address updated successfully.");
        // expect(setCustomerDefaultAddressResponse.updateCustomerAddress.address.email).not.toEqual(cre.createCustomerAddress.address.email);
      });
});
