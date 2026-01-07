import { expect, test } from "@playwright/test";
import { updateAttributeGroupMutation } from "../../../../../mutations/attributes-families/attribute-groups/update-attribute-group-api-mutation";
import { DBClient } from "../../../../../utils/dbClient";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("update attribute group via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createAttributeGroupResponse = fs.readFileSync(
        "create-attribute-group-createResponse.json",
        "utf-8"
    );

    const cre = JSON.parse(createAttributeGroupResponse);
    console.log("create attribute group Response Data:", cre);

    const attribute_group_id = Number(cre.createAttributeGroup.attributeGroup.id);
    console.log("Attribute group ID to update:", attribute_group_id);

    const attribute_family_id = Number(cre.createAttributeGroup.attributeGroup.attributeFamilyId);
    console.log("Attribute family ID to update:", attribute_family_id);

    test("update attribute group via graphQL api", async () => {
        const randomSuffix = Date.now();

        const updateAttributeGroupCredentials = {
            code: `update_${randomSuffix}`,
            name: `update-${randomSuffix}`,
            column: "RIGHT_SIDE",
            position: 8,
            attributeFamilyId: attribute_family_id
        };

        /**
         * Execute create product mutation
         */
        const updateAttributeGroupResponse = await apiClient.execute(
            updateAttributeGroupMutation,
            {
                id: attribute_group_id,
                input: updateAttributeGroupCredentials,
            },
            { withAuth: true }
        );

        console.log("Update Attribute Response:", updateAttributeGroupResponse);

        const filePath = path.resolve(
            process.cwd(),
            "update-attribute-group-updateResponse.json"
        );

        fs.writeFileSync(
            filePath,
            JSON.stringify(updateAttributeGroupResponse, null, 2),
            "utf-8"
        );

        expect(updateAttributeGroupResponse.updateAttributeGroup.success).toBe({ withAuth: true });
        expect(updateAttributeGroupResponse.updateAttributeGroup.message).toContain(
            "Attribute Group updated successfully."
        );
        expect(
            updateAttributeGroupResponse.updateAttributeGroup.attributeGroup
        ).toHaveProperty("id");

        expect (
            updateAttributeGroupResponse.updateAttributeGroup.attributeGroup.id
        ).toEqual(cre.createAttributeGroup.attributeGroup.id);
       
        expect(
            updateAttributeGroupResponse.updateAttributeGroup.attributeGroup.name
        ).not.toEqual(cre.createAttributeGroup.attributeGroup.name);
       
        // const updateAttributeGroupId =
        //     updateAttributeGroupResponse.updateAttributeGroup.attributeGroup.id;

        // console.log("Updated Attribute ID:", updateAttributeGroupId);
        /**
         * Verify database entry
         */
        // const productInDB = await DBClient.getRow(
        //     'SELECT * FROM categories WHERE id = ?',
        //     [createdCategoryId]
        // );

        // console.log('Product in DB:', productInDB);

        // expect(productInDB).not.toBeNull();
        // expect(productInDB?.display_mode).toEqual(updateCategoryCredentials.displayMode);
    });
});
