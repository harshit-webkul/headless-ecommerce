import { test, expect } from "@playwright/test";
import { GraphQLCustomerClient } from "../../../../../utils/customerApiClient";
import { removeAllWishlistsMutation } from "../../../../../mutations/shop-mutation/customers/wishlists/wishlists-mutation";
import * as fs from "fs";

test.describe("Shop: Remove all wishlists via GraphQL API", () => {

    test('remove all wishlists via graphQL shop api', async () => {
        const client = new GraphQLCustomerClient();

        const res = await client.customerExecute(removeAllWishlistsMutation, {}, { withAuth: true });

        console.log('remove all wishlists Response:', res);

        expect(res.removeAllWishlists.success).toBe(true);

    });
});