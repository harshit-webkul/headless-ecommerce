import { expect, test } from "@playwright/test";
import { DBClient } from "../../../../../utils/dbClient";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";
import { createAttributeFamilyMutation } from "../../../../../mutations/attributes-families/create-new-attribute-family-api-mutation";

test.describe("Create new attribute family via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    test("Create new attribute family via graphQL api", async () => {
        const randomSuffix = Date.now();

        const createAttributesFamilyCredentials = {
            code: `new_${randomSuffix}`,
            name: `new_${randomSuffix}`,
            attributeGroups: [
                {
                    code: "general",
                    name: "General",
                    column: "MAIN",
                    position: 1,
                    customAttributes: [
                        {
                            id: 1,
                            position: 1,
                        },
                        {
                            id: 2,
                            position: 2,
                        },
                        {
                            id: 3,
                            position: 3,
                        },
                        {
                            id: 4,
                            position: 1,
                        },
                        {
                            id: 5,
                            position: 4,
                        },
                        {
                            id: 28,
                            position: 5,
                        },
                    ],
                },
                {
                    code: "description",
                    name: "Description",
                    column: "RIGHT_SIDE",
                    position: 2,
                    customAttributes: [
                        {
                            id: 9,
                            position: 6,
                        },
                        {
                            id: 10,
                            position: 7,
                        },
                    ],
                },
                {
                    code: "text_group",
                    name: "Text Group",
                    column: "MAIN",
                    position: 3,
                    customAttributes: [
                        {
                            id: 19,
                            position: 8,
                        },
                        {
                            id: 20,
                            position: 9,
                        },
                    ],
                },
            ],
        };

        /**
         * Execute create attribute mutation
         */
        const createAttributeFamilyResponse = await apiClient.execute(
            createAttributeFamilyMutation,
            {
                input: createAttributesFamilyCredentials,
            },
            { withAuth: true }
        );

        console.log(
            "Create Attribute family Response:",
            createAttributeFamilyResponse
        );

        const filePath = path.resolve(
            process.cwd(),
            "create-attribute-family-createResponse.json"
        );

        fs.writeFileSync(
            filePath,
            JSON.stringify(createAttributeFamilyResponse, null, 2),
            "utf-8"
        );

        expect(createAttributeFamilyResponse.createAttributeFamily.success).toBe(true);
        expect(createAttributeFamilyResponse.createAttributeFamily.message).toContain('Attribute Family created successfully.');
        expect(createAttributeFamilyResponse.createAttributeFamily.attributeFamily).toHaveProperty("id");
        expect(createAttributeFamilyResponse.createAttributeFamily.attributeFamily.code).toEqual(createAttributesFamilyCredentials.code);
        expect(createAttributeFamilyResponse.createAttributeFamily.attributeFamily.name).toEqual(createAttributesFamilyCredentials.name);

        const createdAttributeFamilyId = createAttributeFamilyResponse.createAttributeFamily.attributeFamily.id;
        console.log('Created Attribute family ID:', createdAttributeFamilyId);
        /**
         * Verify database entry
         */
        const attributeFamilyInDB = await DBClient.getRow(
            'SELECT * FROM attribute_families WHERE id = ?',
            [createdAttributeFamilyId]
        );

        console.log('Attribute in DB:', attributeFamilyInDB);

        expect(attributeFamilyInDB).not.toBeNull();
        expect(attributeFamilyInDB.code).toEqual(createAttributesFamilyCredentials.code);
        expect(attributeFamilyInDB.name).toEqual(createAttributesFamilyCredentials.name);
    });
});
