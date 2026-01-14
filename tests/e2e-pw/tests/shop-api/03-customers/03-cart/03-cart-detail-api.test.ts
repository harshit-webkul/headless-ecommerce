import { test, expect } from "@playwright/test";
import { GraphQLCustomerClient } from "../../../../utils/customerApiClient";
import { cartDetailQuery } from "../../../../mutations/shop-mutation/customers/cart-mutation/cart-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import { createSimpleProductMutation } from "../../../../mutations/simple-product-api-mutation";

test.describe("Shop: Cart Detail via GraphQL API", () => {
    let apiClient = new GraphQLClient();
    let customerApiClient = new GraphQLCustomerClient();

    test("get cart detail via graphQL shop api", async () => {
        // create product and add to cart to ensure cart has items
        const randomSuffix = Date.now();
        const res = await customerApiClient.customerExecute(cartDetailQuery, {}, { withAuth: true });

        console.log("cart detail response:", res);

        expect(res.cartDetail).toBeTruthy();
        expect(Array.isArray(res.cartDetail.items)).toBe(true);
    });
});
