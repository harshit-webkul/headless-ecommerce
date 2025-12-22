import { expect, test } from "@playwright/test";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";
import { createGroupProductMutation } from "../../../../mutations/group-product-api-mutation";

test.describe("Create Group Product via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);
    test('create product via graphQL api', async () => {
        const randomSuffix = Date.now();

        const createGroupProductCredentials = {
            type: "grouped",
            attributeFamilyId: 1,
            sku: `testing-product-grouped-${randomSuffix}`
        };

        /**
         * Execute create product mutation
         */
        const createResponse = await apiClient.execute(createGroupProductMutation, {
                input: createGroupProductCredentials
        }, true);

        console.log('Create Group Product Response:', createResponse);

        const filePath = path.resolve(process.cwd(), "create-group-product-createResponse.json");

        fs.writeFileSync(filePath, JSON.stringify(createResponse, null, 2), "utf-8");

        expect(createResponse.createProduct.success).toBe(true);
        expect(createResponse.createProduct.message).toContain('Product created successfully.');
        expect(createResponse.createProduct.product).toHaveProperty('id');
        expect(createResponse.createProduct.product.sku).toEqual(createGroupProductCredentials.sku);
        expect(createResponse.createProduct.product.type).toEqual(createGroupProductCredentials.type);
        expect(createResponse.createProduct.product.attributeFamilyId).toEqual(createGroupProductCredentials.attributeFamilyId.toString());

        const createdGroupProductId = createResponse.createProduct.product.id;

        /**
         * Verify database entry
         */
        const productInDB = await DBClient.getRow(
            'SELECT * FROM products WHERE id = ?',
            [createdGroupProductId]
        );

        console.log('Product in DB:', productInDB);

        expect(productInDB).not.toBeNull();
        expect(productInDB?.sku).toEqual(createGroupProductCredentials.sku);
        expect(productInDB?.type).toEqual(createGroupProductCredentials.type);
        expect(productInDB?.attribute_family_id).toEqual(createGroupProductCredentials.attributeFamilyId);

      });
});
