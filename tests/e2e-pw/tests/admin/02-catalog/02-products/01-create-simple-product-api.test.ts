import { expect, test } from "@playwright/test";
import { createSimpleProductMutation } from "../../../../mutations/simple-product-api-mutation";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Create Simple Product via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);
    test('create product via graphQL api', async () => {
        const randomSuffix = Date.now();

        const createProductCredentials = {
            type: "simple",
            attributeFamilyId: 1,
            sku: `testing-product-number-${randomSuffix}`
        };

        /**
         * Execute create product mutation
         */
        const createResponse = await apiClient.execute(createSimpleProductMutation, {
                input: createProductCredentials
        }, { withAuth: true });

        console.log('Create Product Response:', createResponse);

        const filePath = path.resolve(process.cwd(), "create-product-createResponse.json");

        fs.writeFileSync(filePath, JSON.stringify(createResponse, null, 2), "utf-8");

        expect(createResponse.createProduct.success).toBe({ withAuth: true });
        expect(createResponse.createProduct.message).toContain('Product created successfully.');
        expect(createResponse.createProduct.product).toHaveProperty('id');
        expect(createResponse.createProduct.product.sku).toBe(createProductCredentials.sku);
        expect(createResponse.createProduct.product.type).toBe(createProductCredentials.type);
        expect(createResponse.createProduct.product.attributeFamilyId).toBe(createProductCredentials.attributeFamilyId.toString());

        const createdProductId = createResponse.createProduct.product.id;

        /**
         * Verify database entry
         */
        const productInDB = await DBClient.getRow(
            'SELECT * FROM products WHERE id = ?',
            [createdProductId]
        );

        console.log('Product in DB:', productInDB);

        expect(productInDB).not.toBeNull();
        expect(productInDB?.sku).toBe(createProductCredentials.sku);
        expect(productInDB?.type).toBe(createProductCredentials.type);
        expect(productInDB?.attribute_family_id).toBe(createProductCredentials.attributeFamilyId);

      });
});
