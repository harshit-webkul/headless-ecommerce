import { expect, test } from "@playwright/test";
import { createVirtualProductMutation } from "../../../../mutations/virtual-product-api-mutation";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Create virtual Product via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);
    test('create product via graphQL api', async () => {
        const randomSuffix = Date.now();

        const createVirtualProductCredentials = {
            type: "virtual",
            attributeFamilyId: 1,
            sku: `testing-product-virtual-${randomSuffix}`
        };

        /**
         * Execute create product mutation
         */
        const createResponse = await apiClient.execute(createVirtualProductMutation, {
                input: createVirtualProductCredentials
        }, true);

        console.log('Create Virtual Product Response:', createResponse);

        const filePath = path.resolve(process.cwd(), "create-virtual-product-createResponse.json");

        fs.writeFileSync(filePath, JSON.stringify(createResponse, null, 2), "utf-8");

        expect(createResponse.createProduct.success).toBe(true);
        expect(createResponse.createProduct.message).toContain('Product created successfully.');
        expect(createResponse.createProduct.product).toHaveProperty('id');
        expect(createResponse.createProduct.product.sku).toEqual(createVirtualProductCredentials.sku);
        expect(createResponse.createProduct.product.type).toEqual(createVirtualProductCredentials.type);
        expect(createResponse.createProduct.product.attributeFamilyId).toEqual(createVirtualProductCredentials.attributeFamilyId.toString());

        const createdVirtualProductId = createResponse.createProduct.product.id;

        /**
         * Verify database entry
         */
        const productInDB = await DBClient.getRow(
            'SELECT * FROM products WHERE id = ?',
            [createdVirtualProductId]
        );

        console.log('Product in DB:', productInDB);

        expect(productInDB).not.toBeNull();
        expect(productInDB?.sku).toEqual(createVirtualProductCredentials.sku);
        expect(productInDB?.type).toEqual(createVirtualProductCredentials.type);
        expect(productInDB?.attribute_family_id).toEqual(createVirtualProductCredentials.attributeFamilyId);

      });
});
