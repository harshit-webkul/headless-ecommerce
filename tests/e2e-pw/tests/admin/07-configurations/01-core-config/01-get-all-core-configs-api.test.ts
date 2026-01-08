import { test, expect } from "@playwright/test";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import { getCoreConfigsQuery as GET_CORE_CONFIGS } from "../../../../mutations/core-configuration/core-config-mutation";

test.describe("Core Config - List API", () => {
    test("retrieves a list of core configs and includes known code", async () => {
        const client = new GraphQLClient();
        // extract secret key from env (strip optional base64: prefix)
        const appSecretKey = process.env.APP_SECRET_KEY?.replace(/^base64:/, "") ?? "";
        console.log(appSecretKey);

        const res = await client.execute(GET_CORE_CONFIGS, { first: 100, page: 1, input: {}  }, { withAuth: true, appSecretKey });

        expect(res.coreConfigs).toBeTruthy();
        const data = res.coreConfigs.data ?? [];
        expect(Array.isArray(data)).toBe(true);

        // Check that a seeded config exists
        const found = data.find((c: any) => c.code === "sales.checkout.shopping_cart.allow_guest_checkout");
        expect(found).toBeTruthy();
    });
});
