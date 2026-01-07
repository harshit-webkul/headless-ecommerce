import { expect, test } from "@playwright/test";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";
import { getParticularAttributeFamilyMutation } from "../../../../mutations/attributes-families/get-aprticular-attribute-family-api-mutation";

test.describe("get Particular attribute family via GraphQL API", () => {
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

    test('get Particular Attribute family via graphQL api', async () => {
        const getParticularAttributeFamilyCredentials = {
            id : attribute_family_id
        };

        /**
         * Execute get particular attribute Group mutation
         */
        const getParticularAttibuteFamilyResponse = await apiClient.execute(getParticularAttributeFamilyMutation, {
                id : getParticularAttributeFamilyCredentials.id,
        }, { withAuth: true });

        console.log('Get Particular attribute family Response:', getParticularAttibuteFamilyResponse);
        
        const filePath = path.resolve(process.cwd(), "get-particular-attribute-family-response.json");

        fs.writeFileSync(filePath, JSON.stringify(getParticularAttibuteFamilyResponse, null, 2), "utf-8");

        expect(getParticularAttibuteFamilyResponse.attributeFamily.id).toEqual(cre.createAttributeFamily.attributeFamily.id);
        
      });
});
