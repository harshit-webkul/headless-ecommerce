import { test, expect } from "@playwright/test";
import { GraphQLCustomerClient } from "../../../../utils/customerApiClient";
import { getReviewListQuery } from "../../../../mutations/shop-mutation/customers/reviews-mutation/reviews-mutation";
import * as fs from "fs";

test.describe("Shop: Get Reviews List via GraphQL API", () => {

    test("get review list via graphQL shop api", async () => {
        const client = new GraphQLCustomerClient();

        const res = await client.customerExecute(getReviewListQuery, { input: {} }, { withAuth: true });

        console.log("reviews list response:", res);

        expect(res.reviewsList).toBeTruthy();
        expect(Array.isArray(res.reviewsList.data)).toBe(true);
    });
});
