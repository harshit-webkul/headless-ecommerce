import { test, expect } from "@playwright/test";
import { GraphQLCustomerClient } from "../../../../../utils/customerApiClient";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import { createSimpleProductMutation } from "../../../../../mutations/simple-product-api-mutation";
import { addToWishlistMutation, removeFromWishlistMutation } from "../../../../../mutations/shop-mutation/customers/wishlists/wishlists-mutation";

test.describe("Shop: Remove from wishlist via GraphQL API", () => {
    let apiClient = new GraphQLClient();
    let customerApiClient = new GraphQLCustomerClient();

    test('remove product from wishlist via graphQL shop api', async () => {

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

        const addWishlistRes = await customerApiClient.customerExecute(addToWishlistMutation, { productId: createdProductId.toString() }, { withAuth: true });

        const client = new GraphQLCustomerClient();

        const res = await client.customerExecute(removeFromWishlistMutation, {productId: createdProductId }, { withAuth: true });

        console.log('remove from wishlist Response:', res);

        expect(res.removeFromWishlist.success).toBe(true);
    });
});