import { expect, test } from "@playwright/test";
import { createSimpleProductMutation } from "../../../mutations/simple-product-api-mutation";
import { DBClient } from "../../../utils/dbClient";
import { GraphQLClient } from "../../../utils/adminApiClient";
import { GraphQLCustomerClient } from "../../../utils/customerApiClient";
import { addToCompareMutation } from "../../../mutations/shop-mutation/compare-product-mutation";
import * as fs from "fs";
import path from "path";

test.describe("ADD PRODUCT TO COMPARE VIA GRAPHQL API", () => {
    let apiClient: GraphQLClient;
    let customerApiClient: GraphQLCustomerClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);
    customerApiClient = new GraphQLCustomerClient(GraphQLCustomerClient.baseURL);
    test('add product to compare via graphql api', async () => {
        
        /**
         * Create simple product
         */

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

        expect(createResponse.createProduct.success).toBe( true );
        expect(createResponse.createProduct.message).toContain('Product created successfully.');
        

        const createdProductId = createResponse.createProduct.product.id;
        console.log(createdProductId);

        /**
         * ADD PRODUCT TO COMPARE SECTION
         */

        /**
         * EXECUTE ADD PRODUCT TO COMPARE
         */

        const addProductResponse = await customerApiClient.customerExecute(addToCompareMutation, {
                productId: createdProductId
        }, { withAuth: true });


        expect(addProductResponse.addToCompare.success).toBeTruthy();
        expect(addProductResponse.addToCompare.message).toContain('Success: Product added to compare list successfully.');
        expect(addProductResponse.addToCompare.compareProduct.productId).toEqual(createdProductId);

        const compareProductDetails = addProductResponse.addToCompare.compareProduct

        const compareProductfilePath = path.resolve(process.cwd(), 'compare-product-shop-createResponse.json');
        fs.writeFileSync(compareProductfilePath, JSON.stringify(compareProductDetails, null, 2), 'utf-8');

      });
});
