import { expect, test } from "@playwright/test";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";
import { getParticularCustomerMutation } from "../../../../mutations/customers/get-particular-customer-api-mutation";

test.describe("get Particular customer via GraphQL API", () => {
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

    test('get Particular customer via graphQL api', async () => {
        const randomSuffix = Date.now();

        const getParticularCustomerCredentials = {
            id : customer_id
        };

        /**
         * Execute get particular customer mutation
         */
        const getParticularCustomerResponse = await apiClient.execute(getParticularCustomerMutation, {
                id : getParticularCustomerCredentials.id,
        }, true);

        console.log('Get Particular customer Response:', getParticularCustomerResponse);
        
        const filePath = path.resolve(process.cwd(), "get-particular-customer-response.json");

        fs.writeFileSync(filePath, JSON.stringify(getParticularCustomerResponse, null, 2), "utf-8");

        expect(getParticularCustomerResponse.customer.id).toEqual(customer_id.toString());
        
      });
});
