import { test, expect } from "@playwright/test";
import { GraphQLCustomerClient } from "../../../../utils/customerApiClient";
import { createReviewMutation } from "../../../../mutations/shop-mutation/customers/reviews-mutation/reviews-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import { createSimpleProductMutation } from "../../../../mutations/simple-product-api-mutation";
import * as fs from "fs";
import path from "path";

test.describe("Shop: Create Review via GraphQL API", () => {
    let apiClient= new GraphQLClient();
    let customerApiClient= new GraphQLCustomerClient();

    test("create review via graphQL shop api", async () => {
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

        expect(createResponse.createProduct.success).toBe( true );
        expect(createResponse.createProduct.message).toContain('Product created successfully.');
        
        const createdProductId = createResponse.createProduct.product.id;

        const reviewInput = {
            name: `Test Review ${randomSuffix}`,
            title: `Test Review ${randomSuffix}`,
            rating: 4,
            comment: `This is an automated test review ${randomSuffix}`,
            productId: createdProductId,
        };

        const res = await customerApiClient.customerExecute(createReviewMutation, { input: reviewInput }, { withAuth: true });

        console.log("Create review response:", res);

        expect(res.createReview).toBeTruthy();
        expect(res.createReview.success).toBe(true);
        expect(res.createReview.review.productId).toBe(createdProductId.toString());

    });
});
