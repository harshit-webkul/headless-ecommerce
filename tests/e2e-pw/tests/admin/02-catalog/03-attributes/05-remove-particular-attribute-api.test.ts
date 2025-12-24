import { expect, test } from "@playwright/test";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import { deleteParticularAttributeMutation } from "../../../../mutations/attributes/delete-attribute-api-mutation";

test.describe("Remove attribute via GraphQL API", () => {
     let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);
test('Remove Particular attribute via graphQL api', async () => {
        const createAttributeResponse = fs.readFileSync(
            "vendor/bagisto/graphql-api/tests/e2e-pw/create-attribute-createResponse.json",
            "utf-8"
        );

        console.log("get all atttribute response", createAttributeResponse);

        const attribute_id =  JSON.parse(createAttributeResponse).createAttribute.attribute.id;
        console.log("attribute ID for Particular Category Test:", attribute_id);

        const deleteParticularAttributeCredentials = {
            id: attribute_id,
        };

        /**
         * Execute delete category mutation
         */
        const deleteAttributeResponse = await apiClient.execute(deleteParticularAttributeMutation, {
                id: deleteParticularAttributeCredentials.id
        }, true);

        console.log('delete Response:', deleteAttributeResponse);

        expect(deleteAttributeResponse.deleteAttribute.success).toBe(true);
        expect(deleteAttributeResponse.deleteAttribute.message).toContain('Attribute deleted successfully');
        
    });
});