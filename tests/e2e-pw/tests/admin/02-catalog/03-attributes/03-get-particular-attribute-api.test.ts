import { expect, test } from "@playwright/test";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";
import { getParticularAttributeMutation } from "../../../../mutations/attributes/get-particular-attribute-api-mutation";

test.describe("get Particular attribute via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);
    test("get Particular Attribute via graphQL api", async () => {
        const createAttributeResponse = fs.readFileSync(
            "create-attribute-createResponse.json",
            "utf-8"
        );

        const cre = JSON.parse(createAttributeResponse);
        console.log("Create Attribute Response Data:", cre);
        const attribute_id = Number(cre.createAttribute.attribute.id);
        console.log("Attribute ID to update:", attribute_id);

        const randomSuffix = Date.now();

        const getParticularAttributeCredentials = {
            id: attribute_id,
        };

        /**
         * Execute get particular category mutation
         */
        const getParticularAttibuteResponse = await apiClient.execute(
            getParticularAttributeMutation,
            {
                id: getParticularAttributeCredentials.id,
            },
            { withAuth: true }
        );

        console.log(
            "Get Particular attribute Response:",
            getParticularAttibuteResponse
        );

        const filePath = path.resolve(
            process.cwd(),
            "get-particular-attribute-updateResponse.json"
        );

        fs.writeFileSync(
            filePath,
            JSON.stringify(getParticularAttibuteResponse, null, 2),
            "utf-8"
        );

        expect(getParticularAttibuteResponse.attribute.id).toEqual(
            cre.createAttribute.attribute.id
        );
    });
});
