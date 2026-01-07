import { expect, test } from "@playwright/test";
import {
    ConfigurableProductMutation,
} from "../../../../mutations/config-product-api-mutation";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Create Configurable Product via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    test('create product via graphQL api', async () => {
        const randomSuffix = Date.now();

        const createProductCredentials = {
            type: "configurable",
            attributeFamilyId: 1,
            sku: `testing-config-product-number-${randomSuffix}`,
            superAttributes: [{
                attributeCode: "color",
                values: [4, 5]
            }, {
                attributeCode: "size",
                values: [6]
            }]
        };

        /**
         * Execute create product mutation
         */
        const response = await apiClient.execute(ConfigurableProductMutation, {
                input: createProductCredentials
        }, { withAuth: true });

        console.log('Create Configurable Product Response:', response);
        console.log('Create Product Response Object:', response.createProduct?.product?.variants);
        console.log('Create Product Response Object:', response.createProduct?.product?.superAttributes);

        const filePath = path.resolve(process.cwd(), "create-config-product-response.json");

        fs.writeFileSync(filePath, JSON.stringify(response, null, 2), "utf-8");

        // fs.writeFileSync("create-config-product-response.json", JSON.stringify(response, null, 2), "utf-8");
        
        expect(response.createProduct.success).toBe({ withAuth: true });
        expect(response.createProduct.message).toContain('Product created successfully.');
        expect(response.createProduct.product).toHaveProperty('id');
        expect(response.createProduct.product.sku).toBe(createProductCredentials.sku);
        expect(response.createProduct.product.type).toBe(createProductCredentials.type);
        expect(response.createProduct.product.attributeFamilyId).toBe(createProductCredentials.attributeFamilyId.toString());
        expect(response.createProduct.product.superAttributes.length).toBe(createProductCredentials.superAttributes.length);

        const createdProductId = response.createProduct.product.id;

        /**
         * Verify database entry
         */
        const productInDB = await DBClient.getRow(
            'SELECT * FROM products WHERE id = ?',
            [createdProductId]
        );

        console.log('Configurable Product in DB:', productInDB);

        expect(productInDB).not.toBeNull();
        expect(productInDB?.sku).toEqual(createProductCredentials.sku);
        expect(productInDB?.type).toEqual(createProductCredentials.type);
        expect(productInDB?.attribute_family_id).toEqual(createProductCredentials.attributeFamilyId);
    });
});