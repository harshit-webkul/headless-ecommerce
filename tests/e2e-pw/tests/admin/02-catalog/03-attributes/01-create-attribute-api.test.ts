import { expect, test } from "@playwright/test";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";
import { createAttributeMutation } from "../../../../mutations/attributes/create-attributes-api-mutation";

test.describe("Create attributes via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    test("Create attributes via graphQL api", async () => {
        const randomSuffix = Date.now();

        const createAttributeCredentials = {
            code: `new_attribute_${randomSuffix}`,
            type: "SELECT",
            defaultValue: "1",
            adminName: `new_attribute-${randomSuffix}`,
            translations: [
                {
                    code: "en",
                    name: `Age Validation-${randomSuffix}`,
                },
                {
                    code: "fr",
                    name: `Validation de l'âge-${randomSuffix}`,
                },
                {
                    code: "nl",
                    name: `Leeftijd validatie-${randomSuffix}`,
                },
                {
                    code: "tr",
                    name: `Yaş Doğrulaması-${randomSuffix}`,
                },
            ],
            isRequired: true,
            isUnique: false,
            validation: "",
            valuePerLocale: true,
            valuePerChannel: true,
            isConfigurable: true,
            isVisibleOnFront: true,
            isComparable: true,
        };

        /**
         * Execute create attribute mutation
         */
        const getParticularAttributeResponse = await apiClient.execute(createAttributeMutation, {
                input : createAttributeCredentials,
        }, { withAuth: true });


        console.log('Create Attribute Response:', getParticularAttributeResponse);
        
        const filePath = path.resolve(process.cwd(), "create-attribute-createResponse.json");

        fs.writeFileSync(filePath, JSON.stringify(getParticularAttributeResponse, null, 2), "utf-8");

        expect(getParticularAttributeResponse.createAttribute.success).toBe(true);
        expect(getParticularAttributeResponse.createAttribute.message).toContain('Attribute created successfully.');
        expect(getParticularAttributeResponse.createAttribute.attribute).toHaveProperty("id");
        expect(getParticularAttributeResponse.createAttribute.attribute.code).toEqual(createAttributeCredentials.code);
        expect(getParticularAttributeResponse.createAttribute.attribute.adminName).toEqual(createAttributeCredentials.adminName);

        const createdAttributeId = getParticularAttributeResponse.createAttribute.attribute.id;
        console.log('Created Attribute ID:', createdAttributeId);
        /**
         * Verify database entry
         */
        const attributeInDB = await DBClient.getRow(
            'SELECT * FROM attributes WHERE id = ?',
            [createdAttributeId]
        );

        console.log('Attribute in DB:', attributeInDB);

        expect(attributeInDB).not.toBeNull();
        expect(attributeInDB.code).toEqual(createAttributeCredentials.code);
        expect(attributeInDB.admin_name).toEqual(createAttributeCredentials.adminName);

    });
});
