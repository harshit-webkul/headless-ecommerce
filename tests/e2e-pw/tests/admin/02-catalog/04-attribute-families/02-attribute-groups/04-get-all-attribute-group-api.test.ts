import { expect, test } from "@playwright/test";
import { getAllAttributeGroupMutation } from "../../../../../mutations/attributes-families/attribute-groups/get-all-attribute-group-api-mutation";
import { DBClient } from "../../../../../utils/dbClient";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Get All attributes group via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);
    test("All attributes group via graphQL api", async () => {
        const randomSuffix = Date.now();

        const getAllAttributeGroupCredentials = {
            first: "10",
            page: "1",
        };

        /**
         * Execute create product mutation
         */
        const getAllAttributeGroupResponse = await apiClient.execute(
            getAllAttributeGroupMutation,
            {getAllAttributeGroupCredentials},
            { withAuth: true }
        );

        console.log("get all products Response:", getAllAttributeGroupResponse);
        console.log(
            "get all attributes group Response Data:",
            getAllAttributeGroupResponse.attributeGroups.data[0]
        );

        const filePath = path.resolve(
            process.cwd(),
            "get-all-attribute-group-createResponse.json"
        );
        
        fs.writeFileSync(
            filePath,
            JSON.stringify(getAllAttributeGroupResponse, null, 2),
            "utf-8"
        );

        expect(getAllAttributeGroupResponse.attributeGroups.data.length).toBeGreaterThan(
            0
        );

        /**
         * get the total data from attribute_groups table
         */
        const attributeGroupCount = await DBClient.getRow(
        'SELECT COUNT(*) AS total FROM attribute_groups'
        );

        const total_attribute_group =  attributeGroupCount.total;
        expect(getAllAttributeGroupResponse.attributeGroups.paginatorInfo.total).toEqual(total_attribute_group);


    });
});
