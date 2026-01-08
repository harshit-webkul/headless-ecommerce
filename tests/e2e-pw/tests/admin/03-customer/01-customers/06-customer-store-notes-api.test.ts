import { expect, test } from "@playwright/test";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import { customerStoreNotesMutation } from "../../../../mutations/customers/store-notes-api-mutation";
import { createNewCustomerMutation } from "../../../../mutations/customers/create-new-customer-api-mutation";
import * as fs from "fs";
import path from "path";

test.describe("delete customer via GraphQL API", () => {
     let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL); 

    test('customer store notes via graphQL api', async () => {

        const randomSuffix = Date.now();

        /**
         * CREATE CUSTOMER VIA API
         */

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

        const customer_id = Number(createCustomerResponse.createCustomer.customer.id);

        const filePath = path.resolve(process.cwd(), "create-customer-createResponse.json");
        
        fs.writeFileSync(filePath, JSON.stringify(createCustomerResponse, null, 2), "utf-8");

        /**
         * Execute customer notes
         */

        const customerStoreNotesCredentails = {
            note: `John Test${randomSuffix}`,
            customerNotified: true,
        }

        const customerNotesResponse = await apiClient.execute(
            customerStoreNotesMutation,
            {
                id: customer_id,
                input : customerStoreNotesCredentails
            },
            { withAuth: true }
        );

        console.log('create note response: ', customerNotesResponse);

        expect(customerNotesResponse.storeNotes.success).toEqual(true);
        expect(customerNotesResponse.storeNotes.message).toEqual('Note created successfully');
    });
});