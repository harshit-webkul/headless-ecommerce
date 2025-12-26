import { expect, test } from "@playwright/test";
import { updateAttributeFamilyMutation } from "../../../../mutations/attributes-families/update-attribute-family-api.mutation";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("update attribute family via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createAttributeFamilyResponse = fs.readFileSync(
        "vendor/bagisto/graphql-api/tests/e2e-pw/create-attribute-family-createResponse.json",
        "utf-8"
    );

    const cre = JSON.parse(createAttributeFamilyResponse);
    console.log("create attribute group Response Data:", cre);

    const attribute_family_id = Number(cre.createAttributeFamily.attributeFamily.id);
    console.log("Attribute group ID to update:", attribute_family_id);

    const attribute_group_id1 = Number(cre.createAttributeFamily.attributeFamily.attributeGroups[0].id)
    const attribute_group_id2 = Number(cre.createAttributeFamily.attributeFamily.attributeGroups[1].id)

    test("update attribute family via graphQL api", async () => {
        const randomSuffix = Date.now();

        const updateAttributeFamilyCredentials = {
            code: `update_family_${randomSuffix}`,
            name: `update_family_${randomSuffix}`,
          	attributeGroups: [{
                id: attribute_group_id1,
                code: "general",
              	name: "General",
                column: "MAIN",
              	position: 1,
              	customAttributes: [{
                  	id: 1,
                    position: 1,
                }, 	{
                  	id: 2,
                    position: 2,
                }, 	{
                  	id: 3,
                    position: 3,
                }, 	{
                  	id: 4,
                    position: 1,
                }, 	{
                  	id: 5,
                    position: 4,
                }, 	{
                  	id: 28,
                    position: 5,
                }],
            }, {
                id: attribute_group_id2,
                code: "description",
              	name: "Description",
                column: "RIGHT_SIDE",
              	position: 2,
              	customAttributes: [{
                  	id: 9,
                    position: 6,
                }, 	{
                  	id: 10,
                    position: 7,
                }],
            // },	{
            //     id: 10,
            //     code: "meta_description",
            //   	name: "Meta Description",
            //     column: "MAIN",
            //   	position: 3,
            //   	customAttributes: [{
            //       	id: 19,
            //         position: 8,
            //     }, 	{
            //       	id: 20,
            //         position: 9,
            //     }],
            // },	{
            //     code: "extra_description",
            //   	name: "Extra Description",
            //     column: "RIGHT_SIDE",
            //   	position: 3,
            //   	customAttributes: [{
            //       	id: 19,
            //         position: 8,
            //     }, 	{
            //       	id: 20,
            //         position: 9,
            //     }],
            }],
        
        };

        /**
         * Execute create product mutation
         */
        const updateAttributeFamilyResponse = await apiClient.execute(
            updateAttributeFamilyMutation,
            {
                id: attribute_family_id,
                input: updateAttributeFamilyCredentials,
            },
            true
        );

        console.log("Update Attribute family Response:", updateAttributeFamilyResponse);

        const filePath = path.resolve(
            process.cwd(),
            "update-attribute-family-updateResponse.json"
        );

        fs.writeFileSync(
            filePath,
            JSON.stringify(updateAttributeFamilyResponse, null, 2),
            "utf-8"
        );

        expect(updateAttributeFamilyResponse.updateAttributeFamily.success).toBe(true);
        expect(updateAttributeFamilyResponse.updateAttributeFamily.message).toContain(
            "Attribute Family updated successfully."
        );

        expect (
            cre.createAttributeFamily.attributeFamily.id
        ).toEqual(updateAttributeFamilyResponse.updateAttributeFamily.attributeFamily.id);
       
        // expect(
        //     updateAttributeFamilyResponse.updateAttributeGroup.attributeGroup.name
        // ).not.toEqual(cre.createAttributeGroup.attributeGroup.name);
       
        // const updateAttributeGroupId =
        //     updateAttributeFamilyResponse.updateAttributeGroup.attributeGroup.id;

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
