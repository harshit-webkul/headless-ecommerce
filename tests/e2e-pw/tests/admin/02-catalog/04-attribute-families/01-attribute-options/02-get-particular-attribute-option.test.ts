import { expect, test } from "@playwright/test";
import { getParticularAttributeOptionsMutation } from "../../../../../mutations/attributes-families/attribute-options/attribute-options-api-mutation";
import { DBClient } from "../../../../../utils/dbClient";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("get particular attribute options via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const getAllAttributeOptionResponse = fs.readFileSync(
        "vendor/bagisto/graphql-api/tests/e2e-pw/get-all-attribute-options-createResponse.json",
        "utf-8"
    );

    const cre = JSON.parse(getAllAttributeOptionResponse);
    console.log("Create Attribute Response Data:", cre);
    const attribute_option_id = Number(cre.attributeOptions.data[0].id);
    console.log("Attribute ID to update:", attribute_option_id);

    test("particular attribute options via graphQL api", async () => {
        const randomSuffix = Date.now();

        /**
         * Execute create product mutation
         */
        const getParticularAttributeOptionsResponse = await apiClient.execute(
            getParticularAttributeOptionsMutation,
            {
                id: attribute_option_id,
            },
            { withAuth: true }
        );

        const filePath = path.resolve(
            process.cwd(),
            "get-particular-attribute-options-createResponse.json"
        );

        fs.writeFileSync(
            filePath,
            JSON.stringify(getParticularAttributeOptionsResponse, null, 2),
            "utf-8"
        );

        console.log(
            "get particular attribute options Response:",
            getParticularAttributeOptionsResponse
        );
        expect(
            getParticularAttributeOptionsResponse.attributeOption.id
        ).toEqual(cre.attributeOptions.data[0].id);
    });
});
