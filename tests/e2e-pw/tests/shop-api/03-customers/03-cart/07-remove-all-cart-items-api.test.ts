import { test, expect } from "@playwright/test";
import { GraphQLCustomerClient } from "../../../../utils/customerApiClient";
import { removeAllCartItemsMutation } from "../../../../mutations/shop-mutation/customers/cart-mutation/cart-mutation";

test.describe("Shop: Remove All Cart Items via GraphQL API", () => {
    test('remove all cart items via graphQL shop api', async () => {
        const client = new GraphQLCustomerClient();

        const res = await client.customerExecute(removeAllCartItemsMutation, {}, { withAuth: true });

        console.log('remove all cart items Response:', res);

        expect(res.removeAllCartItem.success).toBe(true);
    });
});
