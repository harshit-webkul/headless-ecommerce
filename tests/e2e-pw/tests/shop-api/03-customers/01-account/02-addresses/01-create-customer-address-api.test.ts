import { test, expect } from "@playwright/test";
import { GraphQLCustomerClient } from "../../../../../utils/customerApiClient";
import { createCustomerAddress } from "../../../../../mutations/shop-mutation/customers/addresses/addresses-mutation";
import * as fs from "fs";
import path from "path";

test.describe("Shop: Create Customer Address via GraphQL API", () => {
    const signUpPayload = fs.readFileSync(
        "signup-customer-shop-createResponse.json",
        "utf-8"
    );
    const cre = JSON.parse(signUpPayload);
    // const customer_id = Number(cre.customerSignUp.customer.id);
    // const accessToken = cre.customerSignUp.accessToken;
    // console

    test("create customer address via graphQL shop api", async () => {
        const client = new GraphQLCustomerClient();
        // client.setCustomerToken(accessToken);

        const randomSuffix = Date.now();

        const customerAddressCredential = {
            // customerId: customer_id,
            companyName: `Stark Industries${randomSuffix}`,
            firstName: `john${randomSuffix}`,
            lastName: `Doe${randomSuffix}`,
            email: `customer${randomSuffix}@example.com`,
            address: `3180 Bluff Street${randomSuffix}`,
            city: "GLEN CAMPBELL",
            postcode: `${randomSuffix}`,
            country: "US",
            state: "PA",
            phone: `${randomSuffix}`,
            defaultAddress: true,
        };

        const res = await client.customerExecute(createCustomerAddress, { input: customerAddressCredential }, { withAuth: true });

        console.log("Create shop customer address Response:", res);

        expect(res.createAddress.success).toBe(true);
        expect(res.createAddress.message).toContain("Address created successfully.");

        const outPath = path.resolve(process.cwd(), "create-customer-address-shop-createResponse.json");
        fs.writeFileSync(outPath, JSON.stringify(res, null, 2), "utf-8");
    });
});
