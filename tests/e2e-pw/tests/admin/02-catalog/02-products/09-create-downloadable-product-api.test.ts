import { expect, test } from "@playwright/test";
import { downloadableProductMutation } from "../../../../mutations/downloadable-product-api-mutation";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Create downloadable Product via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);
    test('create product via graphQL api', async () => {
        const randomSuffix = Date.now();

        const createDownloadableProductCredentials = {
            type: "downloadable",
            attributeFamilyId: 1,
            sku: `testing-product-downloadable-${randomSuffix}`
        };

        /**
         * Execute create product mutation
         */
        const createResponse = await apiClient.execute(downloadableProductMutation, {
                input: createDownloadableProductCredentials
        }, { withAuth: true });

        console.log('Create download Product Response:', createResponse);

        const filePath = path.resolve(process.cwd(), "create-downloadable-product-createResponse.json");

        fs.writeFileSync(filePath, JSON.stringify(createResponse, null, 2), "utf-8");

        expect(createResponse.createProduct.success).toBe(true);
        expect(createResponse.createProduct.message).toContain('Product created successfully.');
        expect(createResponse.createProduct.product).toHaveProperty('id');
        expect(createResponse.createProduct.product.sku).toEqual(createDownloadableProductCredentials.sku);
        expect(createResponse.createProduct.product.type).toEqual(createDownloadableProductCredentials.type);
        expect(createResponse.createProduct.product.attributeFamilyId).toEqual(createDownloadableProductCredentials.attributeFamilyId.toString());

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
        expect(productInDB?.sku).toEqual(createDownloadableProductCredentials.sku);
        expect(productInDB?.type).toEqual(createDownloadableProductCredentials.type);
        expect(productInDB?.attribute_family_id).toEqual(createDownloadableProductCredentials.attributeFamilyId);

      });
});
