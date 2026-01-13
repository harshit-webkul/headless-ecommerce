import { test, expect } from "@playwright/test";
import { GraphQLCustomerClient } from "../../../../../utils/customerApiClient";
import { addToWishlistMutation, getParticularWishlistMutation } from "../../../../../mutations/shop-mutation/customers/wishlists/wishlists-mutation";
import * as fs from "fs";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import { createSimpleProductMutation } from "../../../../../mutations/simple-product-api-mutation";

import path from "path";

test.describe("Shop: Get particular wishlist via GraphQL API", () => {

    let apiClient = new GraphQLClient();
    let customerApiClient = new GraphQLCustomerClient();

    test("get particular wishlist via graphQL shop api", async () => {

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
        
        console.log(res.addToWishlist.wishlist);
        
        const wish_list_id = res.addToWishlist?.wishlist[0]?.id;
        console.log("wishlistID:", wish_list_id);
        
        const wishListRes = await customerApiClient.customerExecute(getParticularWishlistMutation, { id: wish_list_id }, { withAuth: true });

        console.log('Get particular wishlist Response:', wishListRes);

        expect(wishListRes.wishlist.id).toEqual(wish_list_id.toString());
    });
});
