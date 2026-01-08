import { expect, test } from "@playwright/test";
import { updateAttributesMutation } from "../../../../mutations//attributes/update-attributes-api-mutation";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("update attribute via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);
    test("update attribute via graphQL api", async () => {


        const createAttributeResponse = fs.readFileSync(
            "create-attribute-createResponse.json",
            "utf-8"
        );

        const cre = JSON.parse(createAttributeResponse);
        console.log("Create Attribute Response Data:", cre);
        const attribute_id = Number(cre.createAttribute.attribute.id);
        console.log("Attribute ID to update:", attribute_id);
        const randomSuffix = Date.now();

        const updateAttributeCredentials = {
            code: `update_new_attribute_${randomSuffix}`,
            type: "SELECT",
            adminName: `update_new_attribute_${randomSuffix}`,
            translations: [
                {
                    code: "en",
                    name: `Age Validation${randomSuffix}`,
                },
                {
                    code: "fr",
                    name: `Validation de l'âge${randomSuffix}`,
                },
                {
                    code: "nl",
                    name: `Leeftijd validatie${randomSuffix}`,
                },
                {
                    code: "tr",
                    name: `Yaş Doğrulaması${randomSuffix}`,
                },
            ],
            isRequired: true,
            isUnique: true,
            validation: "email",
            valuePerLocale: true,
            valuePerChannel: true,
            isFilterable: true,
            isConfigurable: false,
            isVisibleOnFront: true,
            isComparable: true,
            swatchType: "image",
            options: [
                {
                    adminName: "Option 1",
                    swatchValue:
                        "http://admin1.saascust.com/cache/medium/product/572/SpKvqowiHC2dkmvRweIsTXiiqmVZAv7UamsmLl6G.jpeg",
                    isNew: "true",
                    isDelete: "",
                    position: "0",
                    translations: [
                        {
                            code: "en",
                            label: `Option 1${randomSuffix}`,
                        },
                        {
                            code: "fr",
                            label: `Option 1${randomSuffix}`,
                        },
                        {
                            code: "nl",
                            label: `Optie 1${randomSuffix}`,
                        },
                        {
                            code: "tr",
                            label: `seçenek 1${randomSuffix}`,
                        },
                    ],
                },
                {
                    adminName: `Option 2${randomSuffix}`,
                    swatchValue:
                        "http://admin1.saascust.com/cache/medium/product/572/SpKvqowiHC2dkmvRweIsTXiiqmVZAv7UamsmLl6G.jpeg",
                    isNew: "true",
                    isDelete: "",
                    position: "1",
                    translations: [
                        {
                            code: "en",
                            label: `Option 1 Option 2${randomSuffix}`,
                        },
                        {
                            code: "fr",
                            label: `Option 1 Option 2${randomSuffix}`,
                        },
                        {
                            code: "nl",
                            label: `Optie 1 Option 2${randomSuffix}`,
                        },
                        {
                            code: "tr",
                            label: `seçenek 1 seçenek 2${randomSuffix}`,
                        },
                    ],
                },
            ],
        };

        /**
         * Execute create product mutation
         */
        const updateAttributeResponse = await apiClient.execute(
            updateAttributesMutation,
            {
                id: attribute_id,
                input: updateAttributeCredentials,
            },
            { withAuth: true }
        );

        console.log("Update Attribute Response:", updateAttributeResponse);

        const filePath = path.resolve(
            process.cwd(),
            "update-attribute-updateResponse.json"
        );

        fs.writeFileSync(
            filePath,
            JSON.stringify(updateAttributeResponse, null, 2),
            "utf-8"
        );

        expect(updateAttributeResponse.updateAttribute.success).toBe(true);
        expect(updateAttributeResponse.updateAttribute.message).toContain(
            "Attribute updated successfully."
        );
        expect(
            updateAttributeResponse.updateAttribute.attribute
        ).toHaveProperty("id");

        expect(updateAttributeResponse.updateAttribute.attribute.id).toEqual(
            cre.createAttribute.attribute.id
        );
        expect(
            updateAttributeResponse.updateAttribute.attribute.code
        ).not.toEqual(cre.createAttribute.attribute.code);
        expect(
            updateAttributeResponse.updateAttribute.attribute.adminName
        ).not.toEqual(cre.createAttribute.attribute.adminName);

        const updateAttributeId =
            updateAttributeResponse.updateAttribute.attribute.id;

        console.log("Updated Attribute ID:", updateAttributeId);
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
