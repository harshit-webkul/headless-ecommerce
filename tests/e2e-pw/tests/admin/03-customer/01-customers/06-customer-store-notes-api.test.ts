import { expect, test } from "@playwright/test";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import { customerStoreNotesMutation } from "../../../../mutations/customers/store-notes-api-mutation";

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
    console.log("customer ID to update:", customer_id);
    

    test('customer store notes via graphQL api', async () => {

        const randomSuffix = Date.now();

        const customerStoreNotesCredentails = {
            note: `John Test${randomSuffix}`,
            customerNotified: { withAuth: true },
        }

        /**
         * Execute customer notes mutation
         */
        const customerNotesResponse = await apiClient.execute(
            customerStoreNotesMutation,
            {
                id: customer_id,
                input : customerStoreNotesCredentails
            },
            { withAuth: true }
        );

        console.log('create note response: ', customerNotesResponse);

        expect(customerNotesResponse.storeNotes.success).toEqual({ withAuth: true });
        expect(customerNotesResponse.storeNotes.message).toEqual('Note created successfully');
    });
});