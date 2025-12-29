import { expect, test } from "@playwright/test";
import { getAllCustomerMutation } from "../../../../mutations/customers/get-all-cuatomer-api-mutation";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Get All customers via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);
    test("All customers via graphQL api", async () => {
        const randomSuffix = Date.now();

        const getAllCusotmerCredentials = {
            first: "10",
            page: "1",
        };

        /**
         * Execute get all customers mutation
         */
        const getAllCustomerResponse = await apiClient.execute(
            getAllCustomerMutation,
            {getAllCusotmerCredentials},
            true
        );

        console.log("get all customers Response:", getAllCustomerResponse);        

        const filePath = path.resolve(
            process.cwd(),
            "get-all-customers-createResponse.json"
        );
        
        fs.writeFileSync(
            filePath,
            JSON.stringify(getAllCustomerResponse, null, 2),
            "utf-8"
        );

        expect(getAllCustomerResponse.customers.data.length).toBeGreaterThan(
            0
        );

        /**
         * get the total data from customers table
         */
        const customerCount = await DBClient.getRow(
        'SELECT COUNT(*) AS total FROM customers'
        );

        const total_customers =  customerCount.total;
        console.log(total_customers);
        expect(getAllCustomerResponse.customers.paginatorInfo.total).toEqual(total_customers);
    });
});
