import { expect, test } from "@playwright/test";
import { updateCustomerMutation } from "../../../../mutations/customers/update-customer-details-api-mutation";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("update customer details via GraphQL API", () => {
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

    test('update customer details via graphQL api', async () => {
        const randomSuffix = Date.now();

        const updateCustomerCredentials = {
            firstName: `update-John${randomSuffix}`,
            lastName: `update-Doe${randomSuffix}`,
            email: `johndoe${randomSuffix}@example.com`,
            gender: "FEMALE",
            dateOfBirth: "05-10-1996",
            customerGroupId: 2,
            phone: `${randomSuffix}`,
            status: { withAuth: true },
            isSuspended: false,
        };

        /**
         * Execute create product mutation
         */
        const updateCustomerResponse = await apiClient.execute(updateCustomerMutation, {
                id : customer_id,
                input: updateCustomerCredentials,
        }, { withAuth: true });

        console.log('Update customer Response:', updateCustomerResponse);

        const filePath = path.resolve(process.cwd(), "update-customer-updateResponse.json");

        fs.writeFileSync(filePath, JSON.stringify(updateCustomerResponse, null, 2), "utf-8");

        expect(updateCustomerResponse.updateCustomer.success).toBe({ withAuth: true });
        expect(updateCustomerResponse.updateCustomer.message).toContain('Customer updated successfully.');
        expect(updateCustomerResponse.updateCustomer.customer.id).toEqual(cre.createCustomer.customer.id);
        expect(updateCustomerResponse.updateCustomer.customer.firstName).not.toEqual(cre.createCustomer.customer.firstName);
        expect(updateCustomerResponse.updateCustomer.customer.lastName).not.toEqual(cre.createCustomer.customer.lastname);
        expect(updateCustomerResponse.updateCustomer.customer.email).not.toEqual(cre.createCustomer.customer.email);

      });
});
