import { expect, test } from "@playwright/test";
import { getAllAttributeFamilyMutation } from "../../../../mutations/attributes-families/get-all-attribute-families-api-mutation";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Get All attributes family via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);
    test("All attributes family via graphQL api", async () => {
        const randomSuffix = Date.now();

        const getAllAttributeFamilyCredentials = {
            first: "10",
            page: "1",
        };

        /**
         * Execute get all familes mutation
         */
        const getAllAttributeFamilyResponse = await apiClient.execute(
            getAllAttributeFamilyMutation,
            {getAllAttributeFamilyCredentials},
            true
        );

        console.log("get all Families Response:", getAllAttributeFamilyResponse);
        console.log(
            "get all attributes Family Response Data:",
            getAllAttributeFamilyResponse.attributeFamilies.data[0]
        );

        const filePath = path.resolve(
            process.cwd(),
            "get-all-attribute-families-createResponse.json"
        );
        
        fs.writeFileSync(
            filePath,
            JSON.stringify(getAllAttributeFamilyResponse, null, 2),
            "utf-8"
        );

        expect(getAllAttributeFamilyResponse.attributeFamilies.data.length).toBeGreaterThan(
            0
        );

        /**
         * get the total data from attribute_families table
         */
        const attributeFamiliesCount = await DBClient.getRow(
        'SELECT COUNT(*) AS total FROM attribute_families'
        );

        const total_attribute_falimies =  attributeFamiliesCount.total;
        expect(getAllAttributeFamilyResponse.attributeFamilies.paginatorInfo.total).toEqual(total_attribute_falimies);
    });
});
