import { expect, test } from "@playwright/test";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import { deleteAttributeFamilyMutation } from "../../../../mutations/attributes-families/remove-attribute-family-api-mutation";

test.describe("Remove attribute group via GraphQL API", () => {
     let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createAttributeFamilyResponse = fs.readFileSync(
        "vendor/bagisto/graphql-api/tests/e2e-pw/create-attribute-family-createResponse.json",
        "utf-8"
    );

    const cre = JSON.parse(createAttributeFamilyResponse);
    console.log("create attribute family Response Data:", cre);

    const attribute_family_id = Number(cre.createAttributeFamily.attributeFamily.id);
    console.log("Attribute family ID to update:", attribute_family_id);

test('Remove attribute group via graphQL api', async () => {

        const deleteParticularAttributeFamilyCredentials = {
            id : attribute_family_id,
        };
        
        /**
         * Execute delete category mutation
         */
        const deleteAttributeFamilyResponse = await apiClient.execute(deleteAttributeFamilyMutation, {
                id: deleteParticularAttributeFamilyCredentials.id
        }, true);

        console.log('delete Response:', deleteAttributeFamilyResponse);

        expect(deleteAttributeFamilyResponse.deleteAttributeFamily.success).toBe(true);
        expect(deleteAttributeFamilyResponse.deleteAttributeFamily.message).toContain('Attribute Family deleted successfully');
        
    });
});