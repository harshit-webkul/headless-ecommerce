import { expect, test } from "@playwright/test";
import { getAllAttributeOptionsMutation } from "../../../../../mutations/attributes-families/attribute-options/attribute-options-api-mutation";
import { DBClient } from "../../../../../utils/dbClient";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Get All attributes options via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);
    test("All attributes options via graphQL api", async () => {
        const randomSuffix = Date.now();

        /**
         * Execute create product mutation
         */
        const getAllAttributeOptionsResponse = await apiClient.execute(
            getAllAttributeOptionsMutation,
            {},
            true
        );

        const filePath = path.resolve(
            process.cwd(),
            "get-all-attribute-options-createResponse.json"
        );
        
        fs.writeFileSync(
            filePath,
            JSON.stringify(getAllAttributeOptionsResponse, null, 2),
            "utf-8"
        );

        console.log("get all attribute options Response:", getAllAttributeOptionsResponse);
        console.log(
            "get all attribute options Response Data:",
            getAllAttributeOptionsResponse.attributeOptions.data[0]
        );

        

        expect(getAllAttributeOptionsResponse.attributeOptions.data.length).toBeGreaterThan(
            0
        );
    });
});
