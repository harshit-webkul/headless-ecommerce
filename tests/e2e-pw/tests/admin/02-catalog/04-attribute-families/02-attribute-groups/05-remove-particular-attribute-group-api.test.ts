import { expect, test } from "@playwright/test";
import { DBClient } from "../../../../../utils/dbClient";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import { deleteAttributeGroupMutation } from "../../../../../mutations/attributes-families/attribute-groups/remove-particular-group-api-mutation";

test.describe("Remove attribute group via GraphQL API", () => {
     let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createAttributeGroupResponse = fs.readFileSync(
        "create-attribute-group-createResponse.json",
        "utf-8"
    );

    const cre = JSON.parse(createAttributeGroupResponse);
    console.log("update attribute group Response Data:", cre);

    const attribute_group_id = Number(cre.createAttributeGroup.attributeGroup.id);
    console.log("Attribute ID to update:", attribute_group_id);

test('Remove attribute group via graphQL api', async () => {

        const deleteParticularAttributeGroupCredentials = {
            id : attribute_group_id,
        };
        
        /**
         * Execute delete category mutation
         */
        const deleteAttributeGroupResponse = await apiClient.execute(deleteAttributeGroupMutation, {
                id: deleteParticularAttributeGroupCredentials.id
        }, { withAuth: true });

        console.log('delete Response:', deleteAttributeGroupResponse);

        // expect(deleteAttributeGroupResponse.deleteAttributeGroup.success).toBe({ withAuth: true });
        // expect(deleteAttributeGroupResponse.deleteAttributeGroup.message).toContain('Attribute deleted successfully');
        
    });
});