import { expect, test } from "@playwright/test";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";
import { CustomerCreateOrderMutation } from "../../../../mutations/customers/customer-create-order-api-mutation";

test.describe("customer create order via GraphQL API", () => {
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
    

    test('create order via graphQL api', async () => {

        const randomSuffix = Date.now();

        /**
         * Execute customer notes mutation
         */
        const customerCreateOrderResponse = await apiClient.execute(
            CustomerCreateOrderMutation,
            {
                customerId: customer_id,
            },
            true
        );

        console.log('create note response: ', customerCreateOrderResponse);

        const filePath = path.resolve(
            process.cwd(),
            "customer-create-order-createResponse.json"
        );
        
        fs.writeFileSync(
            filePath,
            JSON.stringify(customerCreateOrderResponse, null, 2),
            "utf-8"
        );

        expect(customerCreateOrderResponse.createOrder.success).toEqual(true);

        
    });
});