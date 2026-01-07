import { expect, test } from "@playwright/test";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";
import { getParticularcustomerGroupMutation } from "../../../../mutations/customer-groups/get-particular-customer-group-api-mutation";

test.describe("get Particular customer group via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createCustomerGroupResponse = fs.readFileSync(
        "create-customer-group-createResponse.json",
        "utf-8"
    );
   
    const cre = JSON.parse(createCustomerGroupResponse)
    console.log("Create customer group Response Data:", cre);
    const customer_group_id = Number(cre.createCustomerGroup.customerGroup.id);
    console.log("customer group ID to update:", customer_group_id);

    test('get Particular customer group via graphQL api', async () => {
        const randomSuffix = Date.now();

        const getParticularCustomerGroupCredentials = {
            id : customer_group_id
        };

        /**
         * Execute get particular customer mutation
         */
        const getParticularCustomerGroupResponse = await apiClient.execute(getParticularcustomerGroupMutation, {
                id : getParticularCustomerGroupCredentials.id,
        }, { withAuth: true });

        console.log('Get Particular customer group Response:', getParticularCustomerGroupResponse);
        
        const filePath = path.resolve(process.cwd(), "get-particular-customer-group-response.json");

        fs.writeFileSync(filePath, JSON.stringify(getParticularCustomerGroupResponse, null, 2), "utf-8");

        expect(getParticularCustomerGroupResponse.customerGroup.id).toEqual(customer_group_id.toString());
        
      });
});
