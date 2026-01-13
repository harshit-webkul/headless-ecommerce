import { test, expect } from "@playwright/test";
import { GraphQLCustomerClient } from "../../../../../utils/customerApiClient";
import { addToWishlistMutation } from "../../../../../mutations/shop-mutation/customers/wishlists/wishlists-mutation";
import * as fs from "fs";
import { createSimpleProductMutation } from "../../../../../mutations/simple-product-api-mutation";
import { GraphQLClient } from "../../../../../utils/adminApiClient";

test.describe("Shop: Add to Wishlist via GraphQL API", () => {
    let apiClient: GraphQLClient;
    let customerApiClient: GraphQLCustomerClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);
    customerApiClient = new GraphQLCustomerClient(GraphQLCustomerClient.baseURL);
    
    test("add product to wishlist via graphQL shop api", async () => {
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

        // /**
        //  * pick an active product from DB
        //  */
        // const productRow: any = await DBClient.getRow("SELECT id FROM products WHERE status = 1 LIMIT 1");
        // if (!productRow || !productRow.id) throw new Error("No active product found in DB to add to wishlist.");
        // const productId = productRow.id;

        const res = await customerApiClient.customerExecute(addToWishlistMutation, { productId: createdProductId.toString() }, { withAuth: true });

        console.log("Add to wishlist Response:", res);

        expect(res.addToWishlist).toBeTruthy();
        expect(res.addToWishlist.success).toBe(true);
        // expect(res.addToWishlist.wishlist.id).toBe(createdProductId.toString());
    });
});
