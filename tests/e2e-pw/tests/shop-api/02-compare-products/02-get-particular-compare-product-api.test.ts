import { test, expect } from "@playwright/test";
import { GraphQLCustomerClient } from "../../../utils/customerApiClient";
import { getParticularCompareProductsQuery } from "../../../mutations/shop-mutation/compare-product-mutation";
import * as fs from "fs";
import path from "path";
import { DBClient } from "../../../utils/dbClient";

test.describe("Get Particular Compare Product API", () => {
    test("returns the compare product by id", async () => {
        const filePath = path.resolve(process.cwd(), "compare-product-shop-createResponse.json");
        if (!fs.existsSync(filePath)) {
            test.skip();
            return;
        }

        const raw = fs.readFileSync(filePath, "utf-8");
        const saved = JSON.parse(raw);
        const compareId = saved.id || saved.compareProduct?.id || saved.compare_id;
        console.log(compareId);

        if (!compareId) {
            // try to read nested field
            throw new Error("Could not find compare id in create response");
        }

        const customerApiClient = new GraphQLCustomerClient();
        // ensure a customer token is present (will throw if not logged in)
        const token = customerApiClient.loadSavedCustomerToken();
        if (!token) {
            test.skip();
            return;
        }

        const res = await customerApiClient.customerExecute<any>(getParticularCompareProductsQuery, { id: compareId }, { withAuth: true });

        expect(res.compareProduct).toBeTruthy();
        expect(res.compareProduct.id).toBeDefined();
        expect(String(res.compareProduct.id)).toEqual(String(compareId));

        // DB validation
        // const row = await DBClient.getRow("SELECT * FROM compare_items WHERE id = ?", [compareId]);
        // expect(row).not.toBeNull();
    });
});
