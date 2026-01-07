import { expect, test } from "@playwright/test";
import { updateCustomerAddressMutation } from "../../../../mutations/customer-addresses/update-customer-address-api-mutation";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("update customer address details via GraphQL API", () => {
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

    test('update customer address details via graphQL api', async () => {
        const randomSuffix = Date.now();

        const updateCustomerAddressCredentials = {
            customerId: customer_id,
            companyName: `update-Stark Industries${randomSuffix}`,
            // vatId: "INV12345678902",
            firstName: `update-john${randomSuffix}`,
            lastName: `update-Doe${randomSuffix}`,
            address: `update-3180 Bluff Street${randomSuffix}`,
            city: `Bluff Street${randomSuffix}`,
            postcode: `${randomSuffix}`,
            country: "US",
            state: "PA",
            phone: `${randomSuffix}`,
            email: `johndoe${randomSuffix}@example.com`,
            defaultAddress: { withAuth: true },
        };

        /**
         * Execute create product mutation
         */
        const updateCustomerAddressResponse = await apiClient.execute(updateCustomerAddressMutation, {
                id : address_id,
                input: updateCustomerAddressCredentials,
        }, { withAuth: true });

        console.log('Update customer address Response:', updateCustomerAddressResponse);

        const filePath = path.resolve(process.cwd(), "update-customer-address-updateResponse.json");

        fs.writeFileSync(filePath, JSON.stringify(updateCustomerAddressResponse, null, 2), "utf-8");

        expect(updateCustomerAddressResponse.updateCustomerAddress.success).toBe({ withAuth: true });
        expect(updateCustomerAddressResponse.updateCustomerAddress.message).toContain("Customer's address updated successfully.");
        expect(updateCustomerAddressResponse.updateCustomerAddress.address.email).not.toEqual(cre.createCustomerAddress.address.email);
      });
});
