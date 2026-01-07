import { expect, test } from "@playwright/test";
import { getAllAttributesMutation } from "../../../../mutations/attributes/get-all-attributes-api-mutation";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Get All attributes via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);
    test("All attributes via graphQL api", async () => {
        const randomSuffix = Date.now();

        const getAllAttributesCredentials = {
            // code: "size",
            // adminName: null,
            // type: null,
            // isRequired: null,
            // isUnique: null,
            // valuePerLocale: null,
            // valuePerChannel: null,
            // id:3,
        };

        /**
         * Execute create product mutation
         */
        const getAllAttributesResponse = await apiClient.execute(
            getAllAttributesMutation,
            {},
            { withAuth: true }
        );

        console.log("get all products Response:", getAllAttributesResponse);
        console.log(
            "get all attributes Response Data:",
            getAllAttributesResponse.attributes.data[0]
        );

        const filePath = path.resolve(
            process.cwd(),
            "get-all-attributes-createResponse.json"
        );
        
        fs.writeFileSync(
            filePath,
            JSON.stringify(getAllAttributesResponse, null, 2),
            "utf-8"
        );

        expect(getAllAttributesResponse.attributes.data.length).toBeGreaterThan(
            0
        );
    });
});
