import { expect, test } from "@playwright/test";
import { createBundleProductMutation } from "../../../../mutations/bundle-product-api-mutation";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Create bundle Product via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);
    test('create product via graphQL api', async () => {
        const randomSuffix = Date.now();

        const createBundleProductCredentials = {
            type: "bundle",
            attributeFamilyId: 1,
            sku: `bundle-product-${randomSuffix}`
        };

        /**
         * Execute create product mutation
         */
        const createResponse = await apiClient.execute(createBundleProductMutation, {
                input: createBundleProductCredentials
        }, true);

        console.log('Create bundle Product Response:', createResponse);
        const filePath = path.resolve(process.cwd(), "create-bundle-product-createResponse.json");

        fs.writeFileSync(filePath, JSON.stringify(createResponse, null, 2), "utf-8");

        expect(createResponse.createProduct.success).toBe(true);
        expect(createResponse.createProduct.message).toContain('Product created successfully.');
        expect(createResponse.createProduct.product).toHaveProperty('id');
        expect(createResponse.createProduct.product.sku).toEqual(createBundleProductCredentials.sku);
        expect(createResponse.createProduct.product.type).toEqual(createBundleProductCredentials.type);
        expect(createResponse.createProduct.product.attributeFamilyId).toEqual(createBundleProductCredentials.attributeFamilyId.toString());

        const createdDownloadableProductId = createResponse.createProduct.product.id;

        /**
         * Verify database entry
         */
        const productInDB = await DBClient.getRow(
            'SELECT * FROM products WHERE id = ?',
            [createdDownloadableProductId]
        );

        console.log('Product in DB:', productInDB);

        expect(productInDB).not.toBeNull();
        expect(productInDB?.sku).toEqual(createBundleProductCredentials.sku);
        expect(productInDB?.type).toEqual(createBundleProductCredentials.type);
        expect(productInDB?.attribute_family_id).toEqual(createBundleProductCredentials.attributeFamilyId);

      });
});
