import { test, expect } from "@playwright/test";
import { GraphQLCustomerClient } from "../../../../utils/customerApiClient";
import {
    moveToWishlistMutation,
    addItemToCartMutation,
} from "../../../../mutations/shop-mutation/customers/cart-mutation/cart-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import {
    createSimpleProductMutation,
    updateCustomizableProductMutation,
} from "../../../../mutations/simple-product-api-mutation";

test.describe("Shop: Move Cart Item to Wishlist via GraphQL API", () => {
    let apiClient = new GraphQLClient();
    let customerApiClient = new GraphQLCustomerClient();

    test("move cart item to wishlist via graphQL shop api", async () => {
        const randomSuffix = Date.now();
        const createProductCredentials = {
            type: "simple",
            attributeFamilyId: 1,
            sku: `testing-product-number-${randomSuffix}`,
        };

        const createResponse = await apiClient.execute(
            createSimpleProductMutation,
            {
                input: createProductCredentials,
            },
            { withAuth: true }
        );

        console.log("Create Product Response:", createResponse);

        expect(createResponse.createProduct.success).toBe(true);
        expect(createResponse.createProduct.message).toContain(
            "Product created successfully."
        );

        const createdProductId = createResponse.createProduct.product.id;

        const updateProductDetails = {
            channel: "default",
            locale: "en",
            sku: `product-updated-number-${randomSuffix}`,
            name: `product-updated-number-${randomSuffix}`,
            urlKey: `product-updated-number-${randomSuffix}`,
            productNumber: "",
            taxCategoryId: "",
            new: true,
            featured: true,
            visibleIndividually: true,
            status: true,
            guestCheckout: false,
            color: 3,
            size: 9,
            shortDescription: "<p>Home Decor Short Description</p>",
            description: "<p>Home Decor Description</p>",
            metaTitle: "Home Decor Meta Title",
            metaKeywords: "Home Decor Meta Keywords",
            metaDescription: "Home Decor Meta Description",
            price: 12.55,
            cost: 11.5,
            specialPrice: 11.3,
            specialPriceFrom: "2021-02-08",
            specialPriceTo: "2023-02-28",
            width: 30,
            height: 24,
            weight: 5.2,
            customerGroupPrices: [
                {
                    customerGroupId: 2,
                    qty: 2,
                    valueType: "fixed",
                    value: 10,
                },
                {
                    customerGroupId: 3,
                    qty: 3,
                    valueType: "discount",
                    value: 2,
                },
            ],
            inventories: [
                {
                    inventorySourceId: 1,
                    qty: 50,
                },
            ],
            manageStock: true,
            categories: [1],
            channels: [1],
            upSells: [],
            crossSells: [],
            relatedProducts: [],
            images: [],
            videos: [],
        };

        /**
         * Execute create product mutation
         */
        const updateResponse = await apiClient.execute(
            updateCustomizableProductMutation,
            {
                id: createdProductId,
                input: updateProductDetails,
            },
            { withAuth: true }
        );
        console.log("Product ID:", createdProductId);

        console.log("Update Product Response:", updateResponse);

        const addItemInput = {
            productId: createdProductId,
            quantity: 1,
        };

        const addItemToCartRes = await customerApiClient.customerExecute(
            addItemToCartMutation,
            { input: addItemInput },
            { withAuth: true }
        );

        const cartItemId = addItemToCartRes.addItemToCart.cart.items[0].id;

        const res = await customerApiClient.customerExecute(
            moveToWishlistMutation,
            { id: cartItemId },
            { withAuth: true }
        );

        console.log("Move to wishlist response:", res);

        expect(res.moveToWishlist).toBeTruthy();
        expect(res.moveToWishlist.success).toBe(true);
    });
});
