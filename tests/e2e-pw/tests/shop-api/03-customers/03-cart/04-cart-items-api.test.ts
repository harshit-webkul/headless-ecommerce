import { test, expect } from "@playwright/test";
import { GraphQLCustomerClient } from "../../../../utils/customerApiClient";
import { cartItemsQuery, addItemToCartMutation } from "../../../../mutations/shop-mutation/customers/cart-mutation/cart-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import { createSimpleProductMutation } from "../../../../mutations/simple-product-api-mutation";

test.describe("Shop: Cart Items via GraphQL API", () => {
    let apiClient = new GraphQLClient();
    let customerApiClient = new GraphQLCustomerClient();

    test("get cart items via graphQL shop api", async () => {
        // ensure there is at least one cart item
        const randomSuffix = Date.now();
        const res = await customerApiClient.customerExecute(cartItemsQuery, {}, { withAuth: true });

        console.log("cart items response:", res);

        expect(Array.isArray(res.cartItems)).toBe(true);
    });
});
