import { expect, test } from "@playwright/test";
import { createNewCustomerMutation } from "../../../../mutations/customers/create-new-customer-api-mutation";
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
         * Execute create product mutation
         */
        const createCustomerResponse = await apiClient.execute(createNewCustomerMutation, {
                input: createCustomerCredentials
        }, { withAuth: true });

        console.log('Create Category Response:', createCustomerResponse);

        const filePath = path.resolve(process.cwd(), "create-customer-createResponse.json");

        fs.writeFileSync(filePath, JSON.stringify(createCustomerResponse, null, 2), "utf-8");

        expect(createCustomerResponse.createCustomer.success).toBe({ withAuth: true });
        expect(createCustomerResponse.createCustomer.message).toContain('Customer created successfully.');
        
        const createdCustomerId = createCustomerResponse.createCustomer.customer.id;

        console.log('Created customer ID:', createdCustomerId);
        /**
         * Verify database entry
         */
        const customerIDInDB = await DBClient.getRow(
            'SELECT * FROM customers WHERE id = ?',
            [createdCustomerId]
        );

        console.log('Product in DB:', customerIDInDB);

        expect(customerIDInDB).not.toBeNull();
        expect(customerIDInDB?.first_name).toEqual(createCustomerResponse.createCustomer.customer.firstName);

      });
});
