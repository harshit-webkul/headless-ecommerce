import { test, expect } from "@playwright/test";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import { getCoreConfigQuery as GET_CORE_CONFIG } from "../../../../mutations/core-configuration/core-config-mutation";

test.describe("Core Config - Get API", () => {
    test("retrieves a core config by code", async () => {
        const client = new GraphQLClient();
        const appSecretKey = process.env.APP_SECRET_KEY?.replace(/^base64:/, "") ?? "";
        console.log(appSecretKey);

        const code = "sales.checkout.shopping_cart.allow_guest_checkout";
        const res = await client.execute(GET_CORE_CONFIG, { code }, { withAuth: true, appSecretKey });

        // The query returns an object (selection is empty in mutation file) - assert presence
        expect(res).toHaveProperty("coreConfig");
        expect(res.coreConfig).toContain('1');
    });
});
