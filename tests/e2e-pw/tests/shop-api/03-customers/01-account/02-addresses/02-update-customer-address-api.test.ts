import { test, expect } from "@playwright/test";
import { GraphQLCustomerClient } from "../../../../../utils/customerApiClient";
import { updateCustomerAddress } from "../../../../../mutations/shop-mutation/customers/addresses/addresses-mutation";
import * as fs from "fs";
import path from "path";

test.describe("Shop: Update Customer Address via GraphQL API", () => {
    // const signUpPayload = fs.readFileSync(
    //     "signup-customer-shop-createResponse.json",
    //     "utf-8"
    // );
    // const cre = JSON.parse(signUpPayload);
    // const accessToken = cre.customerSignUp.accessToken;

    

    test("update customer address via graphQL shop api", async () => {
        const createCustomerAddressResponse = fs.readFileSync(
        "create-customer-address-shop-createResponse.json",
        "utf-8"
        );
        const created = JSON.parse(createCustomerAddressResponse);
        const address_id = Number(created.createAddress.address.id);
        const client = new GraphQLCustomerClient();
        // client.setCustomerToken(accessToken);

        const randomSuffix = Date.now();

        const updateCustomerAddressCredentials = {
            companyName: `update-Stark Industries${randomSuffix}`,
            firstName: `update-john${randomSuffix}`,
            lastName: `update-Doe${randomSuffix}`,
            email: `johndoe${randomSuffix}@example.com`,
            address: `update-3180 Bluff Street${randomSuffix}`,
            city: `Bluff Street${randomSuffix}`,
            postcode: `${randomSuffix}`,
            country: "US",
            state: "PA",
            phone: `${randomSuffix}`,
            defaultAddress: true,
        };

        const res = await client.customerExecute(updateCustomerAddress, { id: address_id, input: updateCustomerAddressCredentials }, { withAuth: true });

        console.log('Update customer address Response:', res);

        const outPath = path.resolve(process.cwd(), "update-customer-address-shop-updateResponse.json");
        fs.writeFileSync(outPath, JSON.stringify(res, null, 2), "utf-8");

        expect(res.updateAddress.success).toBe(true);
        expect(res.updateAddress.message).toContain("Address updated successfully.");
        expect(res.updateAddress.address.email).not.toEqual(created.createAddress.address.email);
    });
});
