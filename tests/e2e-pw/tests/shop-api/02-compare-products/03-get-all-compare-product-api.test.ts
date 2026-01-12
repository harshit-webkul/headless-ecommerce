import { test, expect } from "@playwright/test";
import { GraphQLCustomerClient } from "../../../utils/customerApiClient";
import { getAllCompareProductsQuery } from "../../../mutations/shop-mutation/compare-product-mutation";
import * as fs from "fs";
import path from "path";

test.describe("Get All Compare Products API", () => {
    test("returns a list of compare products including the created one", async () => {
        const filePath = path.resolve(process.cwd(), "compare-product-shop-createResponse.json");

        const raw = fs.readFileSync(filePath, "utf-8");
        const saved = JSON.parse(raw);
        const createdProductId = saved.productId || saved.product_id || saved.product?.id;

        const customerApiClient = new GraphQLCustomerClient();
        const res = await customerApiClient.customerExecute<any>(getAllCompareProductsQuery, { first: 10, page: 1, input: {} }, { withAuth: true });

        expect(res.compareProducts).toBeTruthy();
        expect(res.compareProducts.data).toBeInstanceOf(Array);

        const found = res.compareProducts.data.find((s: any) => String(s.productId) === String(createdProductId));
        expect(found).toBeTruthy();
    });
});
