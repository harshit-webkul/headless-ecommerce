import { test, expect } from "@playwright/test";
import { GraphQLCustomerClient } from "../../../../../utils/customerApiClient";
import { getAllWishlistsProductQuery } from "../../../../../mutations/shop-mutation/customers/wishlists/wishlists-mutation";
import * as fs from "fs";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import { createSimpleProductMutation } from "../../../../../mutations/simple-product-api-mutation";
import path from "path";

test.describe("Shop: Get all wishlists via GraphQL API", () => {
    let apiClient: GraphQLClient;
    let customerApiClient: GraphQLCustomerClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);
    customerApiClient = new GraphQLCustomerClient(GraphQLCustomerClient.baseURL);

    test("customer all wishlists via graphQL shop api", async () => {
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
   
        const res = await customerApiClient.customerExecute(getAllWishlistsProductQuery, { page: 1, first: 10, input: {} }, { withAuth: true });

        console.log("customer all wishlists Response:", res);

        expect(Array.isArray(res.wishlists.data)).toBe(true);
    });
});