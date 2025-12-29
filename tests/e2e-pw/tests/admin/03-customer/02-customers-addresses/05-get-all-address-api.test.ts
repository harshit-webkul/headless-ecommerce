import { expect, test } from "@playwright/test";
import { getAllAddessesMutation } from "../../../../mutations/customer-addresses/get-all-addresses-api-mutation";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Get customer All addresses via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);
    test("customer all addresses via graphQL api", async () => {
        const randomSuffix = Date.now();

        const getAllAddressesCredentials = {
            first: "10",
            page: "1",
        };

        /**
         * Execute get all customers mutation
         */
        const getCustomerAllAddressesResponse = await apiClient.execute(
            getAllAddessesMutation,
            {getAllAddressesCredentials},
            true
        );

        console.log("customer all addresses Response:", getCustomerAllAddressesResponse);        

        const filePath = path.resolve(
            process.cwd(),
            "get-customers-all-addresses-createResponse.json"
        );
        
        fs.writeFileSync(
            filePath,
            JSON.stringify(getCustomerAllAddressesResponse, null, 2),
            "utf-8"
        );

        expect(getCustomerAllAddressesResponse.customerAddresses.data.length).toBeGreaterThan(
            0
        );
    });
});
