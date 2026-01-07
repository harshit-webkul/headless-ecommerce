import { expect, test } from "@playwright/test";
import { getAllCustomerGroupsMutation } from "../../../../mutations/customer-groups/get-all-customer-groups-api-mutation";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Get All customers groups via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);
    test("All customers groups via graphQL api", async () => {

        const getAllCusotmerGroupCredentials = {
            first: "10",
            page: "1",
        };

        /**
         * Execute get all customers mutation
         */
        const getAllCustomerGroupsResponse = await apiClient.execute(
            getAllCustomerGroupsMutation,
            {getAllCusotmerGroupCredentials},
            { withAuth: true }
        );

        console.log("get all customers Response:", getAllCustomerGroupsResponse);        

        const filePath = path.resolve(
            process.cwd(),
            "get-all-customers-createResponse.json"
        );
        
        fs.writeFileSync(
            filePath,
            JSON.stringify(getAllCustomerGroupsResponse, null, 2),
            "utf-8"
        );

        expect(getAllCustomerGroupsResponse.customerGroups.data.length).toBeGreaterThan(
            0
        );

        /**
         * get the total data from customers table
         */
        const customerGroupCount = await DBClient.getRow(
        'SELECT COUNT(*) AS total FROM customer_groups'
        );

        const total_customer_groups =  customerGroupCount.total;
        console.log(total_customer_groups);
        expect(getAllCustomerGroupsResponse.customerGroups.paginatorInfo.total).toEqual(total_customer_groups);
    });
});
