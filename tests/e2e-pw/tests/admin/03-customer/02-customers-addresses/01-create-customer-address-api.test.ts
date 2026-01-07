import { expect, test } from "@playwright/test";
import { createNewCustomerMutation } from "../../../../mutations/customers/create-new-customer-api-mutation";
import {CreateCustomerAddressMutation} from "../../../../mutations/customer-addresses/create-customer-address-api-mutation"
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Create Customer via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);
    test('create customer via graphQL api', async () => {
        const randomSuffix = Date.now();

        const createCustomerCredentials = {
            firstName: `John${randomSuffix}`,
            lastName: `Doe${randomSuffix}`,
            email: `johndoe${randomSuffix}@example.com`,
            gender: "MALE",
            dateOfBirth: "11/07/1993",
            customerGroupId: 1,
            phone: `${randomSuffix}`,
        };

        /**
         * Execute create customer mutation
         */
        const createCustomerResponse = await apiClient.execute(createNewCustomerMutation, {
                input: createCustomerCredentials
        }, { withAuth: true });

        console.log('Create Category Response:', createCustomerResponse);

        const filePath = path.resolve(process.cwd(), "create-customer-createResponse.json");

        fs.writeFileSync(filePath, JSON.stringify(createCustomerResponse, null, 2), "utf-8");

        expect(createCustomerResponse.createCustomer.success).toBe({ withAuth: true });
        expect(createCustomerResponse.createCustomer.message).toContain('Customer created successfully.');
        
        const create_customer_ID = Number(createCustomerResponse.createCustomer.customer.id);

        console.log('Created customer ID:', create_customer_ID);

        const customerAddressCredential = {
            customerId: create_customer_ID,
            companyName: `Stark Industries${randomSuffix}`,
            firstName: `john${randomSuffix}`,
            lastName: `Doe${randomSuffix}`,
            address: `3180 Bluff Street${randomSuffix}`,
            city: "GLEN CAMPBELL",
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
        const createCustomerAddressResponse = await apiClient.execute(CreateCustomerAddressMutation, {
                input: customerAddressCredential
        }, { withAuth: true });

        console.log(createCustomerAddressResponse);

        expect(createCustomerAddressResponse.createCustomerAddress.success).toBe(
            { withAuth: true }
        );
        expect(createCustomerAddressResponse.createCustomerAddress.message).toContain("Customer's address created successfully.");

        const filePathCustomer = path.resolve(process.cwd(), "create-customer-address-createResponse.json");

        fs.writeFileSync(filePathCustomer, JSON.stringify(createCustomerAddressResponse, null, 2), "utf-8");
      });
});
