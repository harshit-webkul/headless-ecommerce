import { expect, test } from "@playwright/test";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";
import { getParticularCustomerAddressMutation } from "../../../../mutations/customer-addresses/get-particular-customer-address-api-mutation";

test.describe("get Particular customer address via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

   const createCustomerAddressResponse = fs.readFileSync(
        "create-customer-address-createResponse.json",
        "utf-8"
    );
   
    const cre = JSON.parse(createCustomerAddressResponse)
    console.log("Create customer address Response Data:", cre);
    const customer_address_id = Number(cre.createCustomerAddress.address.id);
    console.log("customer ID to update:", customer_address_id);

    test('Particular customer address via graphQL api', async () => {
        const randomSuffix = Date.now();

        const getParticularCustomerAddressCredentials = {
            id : customer_address_id
        };

        /**
         * Execute get particular customer mutation
         */
        const getParticularCustomerAddressResponse = await apiClient.execute(getParticularCustomerAddressMutation, {
                id : getParticularCustomerAddressCredentials.id,
        }, { withAuth: true });

        console.log('Get Particular customer Response:', getParticularCustomerAddressResponse);
        
        const filePath = path.resolve(process.cwd(), "get-particular-customer-address-response.json");

        fs.writeFileSync(filePath, JSON.stringify(getParticularCustomerAddressResponse, null, 2), "utf-8");

        expect(getParticularCustomerAddressResponse.customerAddress.id).toEqual(customer_address_id.toString());
        
      });
});
