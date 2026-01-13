import { test, expect } from "@playwright/test";
import { GraphQLCustomerClient } from "../../../../utils/customerApiClient";
import { getParticularReviewDetailMutation, createReviewMutation } from "../../../../mutations/shop-mutation/customers/reviews-mutation/reviews-mutation";
import * as fs from "fs";
import { createSimpleProductMutation } from "../../../../mutations/simple-product-api-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";

import path from "path";

test.describe("Shop: Get Particular Review via GraphQL API", () => {
    let apiClient= new GraphQLClient();
    let customerApiClient= new GraphQLCustomerClient();

    test("get particular review via graphQL shop api", async () => {


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

        const createReviewRes = await customerApiClient.customerExecute(createReviewMutation, { input: reviewInput }, { withAuth: true });

        console.log("Create review response:", createReviewRes);

        expect(createReviewRes.createReview).toBeTruthy();
        expect(createReviewRes.createReview.success).toBe(true);
        const review_id = createReviewRes.createReview.review.id;
        console.log(review_id);

        /**
         * Get Particular review via api
         */
        const res = await customerApiClient.customerExecute(getParticularReviewDetailMutation, { id: review_id }, { withAuth: true });

        console.log('Get particular review Response:', res);

        expect(res.reviewDetail.id).toEqual(review_id.toString());
    });
});
