import { expect, test } from "@playwright/test";
import { DBClient } from "../../../../../utils/dbClient";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";
import { createAttributeGroupsMutation } from "../../../../../mutations/attributes-families/attribute-groups/create-attribute-groups-api-mutation";

test.describe("Create new attribute Group via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    test("Create new attributes group via graphQL api", async () => {
        const randomSuffix = Date.now();

        const createAttributesGroupCredentials = {
            code: `create_test_group${randomSuffix}`,
            name: `create_test_group${randomSuffix}`,
            column: "RIGHT_SIDE",
            position: 8,
            attributeFamilyId: 1
        };

        /**
         * Execute create attribute mutation
         */
        const getParticularAttributeResponse = await apiClient.execute(createAttributeGroupsMutation, {
                input : createAttributesGroupCredentials,
        }, { withAuth: true });


        console.log('Create Attribute group Response:', getParticularAttributeResponse);
        
        const filePath = path.resolve(process.cwd(), "create-attribute-group-createResponse.json");

        fs.writeFileSync(filePath, JSON.stringify(getParticularAttributeResponse, null, 2), "utf-8");

        expect(getParticularAttributeResponse.createAttributeGroup.success).toBe({ withAuth: true });
        expect(getParticularAttributeResponse.createAttributeGroup.message).toContain('Attribute Group created successfully.');
        expect(getParticularAttributeResponse.createAttributeGroup.attributeGroup).toHaveProperty("id");
        // expect(getParticularAttributeResponse.createAttribute.attribute.code).toEqual(createAttributesGroupCredentials.code);
        expect(getParticularAttributeResponse.createAttributeGroup.attributeGroup.name).toEqual(createAttributesGroupCredentials.name);

        const createdAttributeGroupId = getParticularAttributeResponse.createAttributeGroup.attributeGroup.id;
        console.log('Created Attribute group ID:', createdAttributeGroupId);
        /**
        //  * Verify database entry
        //  */
        // const attributeInDB = await DBClient.getRow(
        //     'SELECT * FROM attributes WHERE id = ?',
        //     [createdAttributeId]
        // );

        // console.log('Attribute in DB:', attributeInDB);

        // expect(attributeInDB).not.toBeNull();
        // expect(attributeInDB.code).toEqual(createAttributesGroupCredentials.code);
        // expect(attributeInDB.admin_name).toEqual(createAttributesGroupCredentials.name);

    });
});
