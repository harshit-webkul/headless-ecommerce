import { expect, test } from "@playwright/test";
import { DBClient } from "../../../../../utils/dbClient";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";
import { getParticularAttibuteGroupMutation } from "../../../../../mutations/attributes-families/attribute-groups/get-aprticular-attribute-group-api-mutation";

test.describe("get Particular attribute group via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createAttributeGroupResponse = fs.readFileSync(
            "create-attribute-group-createResponse.json",
            "utf-8"
        );
    
    const cre = JSON.parse(createAttributeGroupResponse);
    console.log("get particular attribute group Response Data:", cre);

    const attribute_group_id = Number(cre.createAttributeGroup.attributeGroup.id);
    console.log("Attribute group ID to update:", attribute_group_id);

    test('get Particular Attribute group via graphQL api', async () => {
        const getParticularAttributeGroupCredentials = {
            id : attribute_group_id
        };

        /**
         * Execute get particular attribute Group mutation
         */
        const getParticularAttibuteGroupResponse = await apiClient.execute(getParticularAttibuteGroupMutation, {
                id : getParticularAttributeGroupCredentials.id,
        }, { withAuth: true });

        console.log('Get Particular attribute Response:', getParticularAttibuteGroupResponse);
        
        const filePath = path.resolve(process.cwd(), "get-particular-attribute-group-response.json");

        fs.writeFileSync(filePath, JSON.stringify(getParticularAttibuteGroupResponse, null, 2), "utf-8");

        expect(getParticularAttibuteGroupResponse.attributeGroup.id).toEqual(cre.createAttributeGroup.attributeGroup.id);
        
      });
});
