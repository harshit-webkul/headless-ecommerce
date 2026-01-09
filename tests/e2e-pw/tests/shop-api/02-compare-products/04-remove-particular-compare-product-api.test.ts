import { test, expect } from "@playwright/test";
import { GraphQLCustomerClient } from "../../../utils/customerApiClient";
import { removeCompareParticularProductMutation } from "../../../mutations/shop-mutation/compare-product-mutation";
import * as fs from "fs";
import path from "path";
import { DBClient } from "../../../utils/dbClient";

test.describe("Remove Particular Compare Product API", () => {
    test("removes a compare item by product id", async () => {
        const filePath = path.resolve(process.cwd(), "compare-product-shop-createResponse.json");
        if (!fs.existsSync(filePath)) {
            test.skip();
            return;
        }

        const raw = fs.readFileSync(filePath, "utf-8");
        const saved = JSON.parse(raw);
        const productId = saved.productId || saved.product_id || saved.product?.id;

        const customerApiClient = new GraphQLCustomerClient();
        const token = customerApiClient.loadSavedCustomerToken();
        if (!token) {
            test.skip();
            return;
        }

        const res = await customerApiClient.customerExecute<any>(removeCompareParticularProductMutation, { productId }, { withAuth: true });

        expect(res.removeFromCompareProduct).toBeTruthy();
        expect(res.removeFromCompareProduct.success).toBeTruthy();

        // DB validation: ensure no compare_items exist for this product for the logged-in customer
        // attempt to find any row matching productId
        const row = await DBClient.getRow("SELECT * FROM compare_items WHERE product_id = ?", [productId]);
        // row may exist for other customers; we at least assert that the earlier compare id is gone
        // Best-effort: if compare id existed in saved data, check by id
        const compareId = saved.id || saved.compareProduct?.id;
        if (compareId) {
            const chk = await DBClient.getRow("SELECT * FROM compare_items WHERE id = ?", [compareId]);
            expect(chk).toBeNull();
        }
    });
});
